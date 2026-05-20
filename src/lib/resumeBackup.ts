import { ResumeData } from '@/types/resume';

export const BACKUP_VERSION = 1;

export interface ResumeBackupFile {
  version: number;
  exportedAt: string;
  data: ResumeData;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function normalizeResumeData(raw: unknown): ResumeData {
  if (!isObject(raw)) {
    throw new Error('Geçersiz yedek formatı.');
  }

  if (!isObject(raw.contact)) {
    throw new Error('İletişim bilgileri eksik veya hatalı.');
  }

  const contact = raw.contact;
  const requiredContactFields = ['fullName', 'title', 'email', 'phone', 'location'] as const;
  for (const field of requiredContactFields) {
    if (!isString(contact[field])) {
      throw new Error(`İletişim alanı eksik: ${field}`);
    }
  }

  return {
    contact: {
      fullName: contact.fullName,
      title: contact.title,
      email: contact.email,
      phone: contact.phone,
      location: contact.location,
      linkedin: isString(contact.linkedin) ? contact.linkedin : undefined,
      github: isString(contact.github) ? contact.github : undefined,
      website: isString(contact.website) ? contact.website : undefined,
    },
    summary: isString(raw.summary) ? raw.summary : '',
    experience: Array.isArray(raw.experience) ? raw.experience : [],
    education: Array.isArray(raw.education) ? raw.education : [],
    projects: Array.isArray(raw.projects) ? raw.projects : [],
    skills: Array.isArray(raw.skills) ? raw.skills : [],
    certificate: Array.isArray(raw.certificate) ? raw.certificate : [],
  };
}

export function parseResumeBackup(json: string): ResumeData {
  let parsed: unknown;

  try {
    parsed = JSON.parse(json);
  } catch {
    throw new Error('Geçersiz JSON dosyası.');
  }

  if (isObject(parsed) && isObject(parsed.data)) {
    return normalizeResumeData(parsed.data);
  }

  return normalizeResumeData(parsed);
}

export function createBackupFile(data: ResumeData): ResumeBackupFile {
  return {
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    data,
  };
}

export function downloadResumeBackup(data: ResumeData): void {
  const backup = createBackupFile(data);
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const slug = data.contact.fullName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'resume';

  const date = new Date().toISOString().slice(0, 10);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${slug}-backup-${date}.json`;
  anchor.click();

  URL.revokeObjectURL(url);
}
