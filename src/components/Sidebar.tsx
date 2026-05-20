'use client';

import { useEffect, useRef, useState } from 'react';
import { ResumeData, Experience, Education, Skill, Project, Certificate } from '@/types/resume';
import { downloadResumeBackup, parseResumeBackup } from '@/lib/resumeBackup';
import { 
  Eye, 
  EyeOff, 
  User, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  FolderKanban, 
  Code,
  Award,
  ChevronRight,
  Plus,
  Trash2,
  Upload,
  Download,
} from 'lucide-react';

type VisibleSections = {
  summary: boolean;
  experience: boolean;
  education: boolean;
  projects: boolean;
  skills: boolean;
  certificates: boolean;
};

interface SidebarProps {
  resumeData: ResumeData;
  visibleSections: VisibleSections;
  onToggleSection: (section: keyof VisibleSections) => void;
  onUpdateData: (data: ResumeData) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  resumeData,
  visibleSections,
  onToggleSection,
  onUpdateData,
  isOpen,
  onClose
}: SidebarProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [localData, setLocalData] = useState<ResumeData>(resumeData);
  const [backupMessage, setBackupMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalData(resumeData);
  }, [resumeData]);

  const sections: Array<{ id: keyof VisibleSections | 'contact'; label: string; icon: any; toggleable: boolean }> = [
    { id: 'contact', label: 'Contact Information', icon: User, toggleable: false },
    { id: 'summary', label: 'Professional Summary', icon: FileText, toggleable: true },
    { id: 'experience', label: 'Work Experience', icon: Briefcase, toggleable: true },
    { id: 'education', label: 'Education', icon: GraduationCap, toggleable: true },
    { id: 'projects', label: 'Projects', icon: FolderKanban, toggleable: true },
    { id: 'skills', label: 'Skills', icon: Code, toggleable: true },
    { id: 'certificates', label: 'Certificates', icon: Award, toggleable: true },
  ];

  const handleSave = () => {
    onUpdateData(localData);
    setBackupMessage({ type: 'success', text: 'Değişiklikler kaydedildi.' });
  };

  const handleExportBackup = () => {
    downloadResumeBackup(localData);
    setBackupMessage({ type: 'success', text: 'JSON yedeği indirildi.' });
  };

  const handleImportBackup = async (file: File) => {
    try {
      const text = await file.text();
      const imported = parseResumeBackup(text);

      const confirmed = window.confirm(
        'Mevcut özgeçmiş verileri yedek dosyasıyla değiştirilecek. Devam etmek istiyor musunuz?'
      );
      if (!confirmed) return;

      setLocalData(imported);
      onUpdateData(imported);
      setBackupMessage({ type: 'success', text: 'JSON yedeği yüklendi.' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Yedek yüklenemedi.';
      setBackupMessage({ type: 'error', text: message });
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const updateContact = (field: string, value: string) => {
    setLocalData({
      ...localData,
      contact: { ...localData.contact, [field]: value }
    });
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ['']
    };
    setLocalData({ ...localData, experience: [...localData.experience, newExp] });
  };

  const updateExperience = (id: string, field: string, value: any) => {
    setLocalData({
      ...localData,
      experience: localData.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const removeExperience = (id: string) => {
    setLocalData({
      ...localData,
      experience: localData.experience.filter(exp => exp.id !== id)
    });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
    };
    setLocalData({ ...localData, education: [...localData.education, newEdu] });
  };

  const updateEducation = (id: string, field: string, value: any) => {
    setLocalData({
      ...localData,
      education: localData.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const removeEducation = (id: string) => {
    setLocalData({
      ...localData,
      education: localData.education.filter(edu => edu.id !== id)
    });
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
    };
    setLocalData({ ...localData, projects: [...localData.projects, newProject] });
  };

  const updateProject = (id: string, field: string, value: any) => {
    setLocalData({
      ...localData,
      projects: localData.projects.map(proj =>
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    });
  };

  const removeProject = (id: string) => {
    setLocalData({
      ...localData,
      projects: localData.projects.filter(proj => proj.id !== id)
    });
  };

  const updateSkillCategory = (index: number, field: string, value: any) => {
    setLocalData({
      ...localData,
      skills: localData.skills.map((skill, i) =>
        i === index ? { ...skill, [field]: value } : skill
      )
    });
  };

  const addSkillCategory = () => {
    const newSkill: Skill = {
      category: '',
      items: []
    };
    setLocalData({ ...localData, skills: [...localData.skills, newSkill] });
  };

  const removeSkillCategory = (index: number) => {
    setLocalData({
      ...localData,
      skills: localData.skills.filter((_, i) => i !== index)
    });
  };

  const addCertificate = () => {
    const newCert: Certificate = {
      id: Date.now().toString(),
      certificaten: '',
      issueDate: '',
      certificationID: '',
    };
    setLocalData({ ...localData, certificate: [...localData.certificate, newCert] });
  };

  const updateCertificate = (id: string, field: string, value: any) => {
    setLocalData({
      ...localData,
      certificate: localData.certificate.map(cert =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    });
  };

  const removeCertificate = (id: string) => {
    setLocalData({
      ...localData,
      certificate: localData.certificate.filter(cert => cert.id !== id)
    });
  };

  return (
    <div className="w-96 h-screen bg-white shadow-2xl flex flex-col print:hidden sticky top-0">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white">
        <h2 className="text-lg font-bold">Control Panel</h2>
      </div>

      {/* Sections List */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-none p-4 border-b">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Sections</h3>
          <div className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              const isVisible = section.toggleable 
                ? visibleSections[section.id as keyof VisibleSections]
                : true;
              
              return (
                <div
                  key={section.id}
                  className={`flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${
                    activeSection === section.id ? 'bg-blue-50 border border-blue-300' : ''
                  }`}
                >
                  <div
                    className="flex items-center gap-2 flex-1"
                    onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                  >
                    <Icon className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">{section.label}</span>
                    <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${
                      activeSection === section.id ? 'rotate-90' : ''
                    }`} />
                  </div>
                  {section.toggleable && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSection(section.id as keyof VisibleSections);
                      }}
                      className="ml-2 p-1 hover:bg-gray-200 rounded"
                      title={isVisible ? 'Hide' : 'Show'}
                    >
                      {isVisible ? (
                        <Eye className="w-4 h-4 text-blue-600" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Edit Panel */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeSection === 'contact' && (
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={localData.contact.fullName}
                    onChange={(e) => updateContact('fullName', e.target.value)}
                    className="w-full px-2 py-1.5 text-sm text-gray-900 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={localData.contact.title}
                    onChange={(e) => updateContact('title', e.target.value)}
                    className="w-full px-2 py-1.5 text-sm text-gray-900 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={localData.contact.email}
                    onChange={(e) => updateContact('email', e.target.value)}
                    className="w-full px-2 py-1.5 text-sm text-gray-900 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={localData.contact.phone}
                    onChange={(e) => updateContact('phone', e.target.value)}
                    className="w-full px-2 py-1.5 text-sm text-gray-900 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={localData.contact.location}
                    onChange={(e) => updateContact('location', e.target.value)}
                    className="w-full px-2 py-1.5 text-sm text-gray-900 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">LinkedIn</label>
                  <input
                    type="url"
                    value={localData.contact.linkedin || ''}
                    onChange={(e) => updateContact('linkedin', e.target.value)}
                    className="w-full px-2 py-1.5 text-sm text-gray-900 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">GitHub</label>
                  <input
                    type="url"
                    value={localData.contact.github || ''}
                    onChange={(e) => updateContact('github', e.target.value)}
                    className="w-full px-2 py-1.5 text-sm text-gray-900 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                    placeholder="https://github.com/..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Website</label>
                  <input
                    type="url"
                    value={localData.contact.website || ''}
                    onChange={(e) => updateContact('website', e.target.value)}
                    className="w-full px-2 py-1.5 text-sm text-gray-900 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                    placeholder="https://..."
                  />
              </div>
            </div>
          )}

          {activeSection === 'summary' && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Professional Summary</h4>
              <textarea
                  value={localData.summary}
                  onChange={(e) => setLocalData({ ...localData, summary: e.target.value })}
                  rows={8}
                  className="w-full px-2 py-1.5 text-sm text-gray-900 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                placeholder="Briefly describe yourself and your experience..."
              />
            </div>
          )}

          {activeSection === 'experience' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">Work Experience</h4>
                  <button
                    onClick={addExperience}
                    className="flex items-center gap-1 text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    <Plus className="w-3 h-3" />
                    Add
                </button>
              </div>
              {localData.experience.map((exp, index) => (
                  <div key={exp.id} className="border border-gray-200 rounded p-3 relative space-y-2">
                    <button
                      onClick={() => removeExperience(exp.id)}
                      className="absolute top-1 right-1 text-red-600 hover:bg-red-50 p-1 rounded"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                      placeholder="Pozisyon"
                      className="w-full px-2 py-1 text-sm text-gray-900 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                    />
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      placeholder="Şirket"
                      className="w-full px-2 py-1 text-sm text-gray-900 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                    />
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                      placeholder="Konum"
                      className="w-full px-2 py-1 text-sm text-gray-900 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                        placeholder="Başlangıç"
                        className="flex-1 px-2 py-1 text-xs text-gray-900 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                      />
                      <input
                        type="text"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                        placeholder="Bitiş"
                        disabled={exp.current}
                        className="flex-1 px-2 py-1 text-xs text-gray-900 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 placeholder:text-gray-400"
                      />
                    </div>
                    <label className="flex items-center gap-2 text-xs">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                      />
                      Halen çalışıyorum
                    </label>
                    <textarea
                      value={exp.description.join('\n')}
                      onChange={(e) => updateExperience(exp.id, 'description', e.target.value.split('\n'))}
                      placeholder="Başarılarınız (her satır bir madde)"
                      rows={3}
                      className="w-full px-2 py-1 text-xs text-gray-900 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                    />
                </div>
              ))}
            </div>
          )}

          {activeSection === 'education' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">Eğitim</h4>
                  <button
                    onClick={addEducation}
                    className="flex items-center gap-1 text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    <Plus className="w-3 h-3" />
                    Add
                </button>
              </div>
              {localData.education.map((edu) => (
                  <div key={edu.id} className="border border-gray-200 rounded p-3 relative space-y-2">
                    <button
                      onClick={() => removeEducation(edu.id)}
                      className="absolute top-1 right-1 text-red-600 hover:bg-red-50 p-1 rounded"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <input
                      type="text"
                      value={edu.school}
                      onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                      placeholder="Okul"
                      className="w-full px-2 py-1 text-sm text-gray-900 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                    />
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      placeholder="Derece"
                      className="w-full px-2 py-1 text-sm text-gray-900 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                    />
                    <input
                      type="text"
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                      placeholder="Bölüm"
                      className="w-full px-2 py-1 text-sm text-gray-900 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                    />
                    <input
                      type="text"
                      value={edu.location}
                      onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                      placeholder="Konum"
                      className="w-full px-2 py-1 text-sm text-gray-900 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                        placeholder="Başlangıç"
                        className="flex-1 px-2 py-1 text-xs text-gray-900 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                      />
                      <input
                        type="text"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                        placeholder="Bitiş"
                        className="flex-1 px-2 py-1 text-xs text-gray-900 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                      />
                    </div>
                    <input
                      type="text"
                      value={edu.gpa || ''}
                      onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                      placeholder="GPA (opsiyonel)"
                      className="w-full px-2 py-1 text-xs text-gray-900 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                    />
                </div>
              ))}
            </div>
          )}

          {activeSection === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">Projeler</h4>
                  <button
                    onClick={addProject}
                    className="flex items-center gap-1 text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    <Plus className="w-3 h-3" />
                    Add
                </button>
              </div>
              {localData.projects.map((proj) => (
                  <div key={proj.id} className="border border-gray-200 rounded p-3 relative space-y-2">
                    <button
                      onClick={() => removeProject(proj.id)}
                      className="absolute top-1 right-1 text-red-600 hover:bg-red-50 p-1 rounded"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <input
                      type="text"
                      value={proj.name}
                      onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                      placeholder="Proje Adı"
                      className="w-full px-2 py-1 text-sm text-gray-900 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                    />
                    <textarea
                      value={proj.description}
                      onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                      placeholder="Açıklama"
                      rows={3}
                      className="w-full px-2 py-1 text-sm text-gray-900 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                    />
                    <input
                      type="text"
                      value={proj.technologies.join(', ')}
                      onChange={(e) => updateProject(proj.id, 'technologies', e.target.value.split(',').map(t => t.trim()).filter(t => t))}
                      placeholder="Teknolojiler (virgülle ayırın)"
                      className="w-full px-2 py-1 text-sm text-gray-900 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                    />
                    <input
                      type="url"
                      value={proj.link || ''}
                      onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                      placeholder="Demo Link"
                      className="w-full px-2 py-1 text-xs text-gray-900 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                    />
                    <input
                      type="url"
                      value={proj.github || ''}
                      onChange={(e) => updateProject(proj.id, 'github', e.target.value)}
                      placeholder="GitHub"
                      className="w-full px-2 py-1 text-xs text-gray-900 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                    />
                </div>
              ))}
            </div>
          )}

          {activeSection === 'certificates' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">Sertifikalar</h4>
                <button
                  onClick={addCertificate}
                  className="flex items-center gap-1 text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                >
                  <Plus className="w-3 h-3" />
                  Add
                </button>
              </div>
              {localData.certificate.map((cert) => (
                <div key={cert.id} className="border border-gray-200 rounded p-3 relative space-y-2">
                  <button
                    onClick={() => removeCertificate(cert.id)}
                    className="absolute top-1 right-1 text-red-600 hover:bg-red-50 p-1 rounded"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                  <input
                    type="text"
                    value={cert.certificaten}
                    onChange={(e) => updateCertificate(cert.id, 'certificaten', e.target.value)}
                    placeholder="Sertifika Adı"
                    className="w-full px-2 py-1 text-sm text-gray-900 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={cert.issueDate}
                      onChange={(e) => updateCertificate(cert.id, 'issueDate', e.target.value)}
                      placeholder="Veriliş"
                      className="flex-1 px-2 py-1 text-xs text-gray-900 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                    />
                    <input
                      type="text"
                      value={cert.expirationdate || ''}
                      onChange={(e) => updateCertificate(cert.id, 'expirationdate', e.target.value)}
                      placeholder="Bitiş (ops.)"
                      className="flex-1 px-2 py-1 text-xs text-gray-900 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                    />
                  </div>
                  <input
                    type="text"
                    value={cert.certificationID}
                    onChange={(e) => updateCertificate(cert.id, 'certificationID', e.target.value)}
                    placeholder="Sertifika ID"
                    className="w-full px-2 py-1 text-xs text-gray-900 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                  />
                  <input
                    type="url"
                    value={cert.certificationURL || ''}
                    onChange={(e) => updateCertificate(cert.id, 'certificationURL', e.target.value)}
                    placeholder="Doğrulama URL"
                    className="w-full px-2 py-1 text-xs text-gray-900 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                  />
                </div>
              ))}
            </div>
          )}

          {activeSection === 'skills' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">Yetenekler</h4>
                  <button
                    onClick={addSkillCategory}
                    className="flex items-center gap-1 text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    <Plus className="w-3 h-3" />
                    Add
                </button>
              </div>
              {localData.skills.map((skill, index) => (
                  <div key={index} className="border border-gray-200 rounded p-3 relative space-y-2">
                    <button
                      onClick={() => removeSkillCategory(index)}
                      className="absolute top-1 right-1 text-red-600 hover:bg-red-50 p-1 rounded"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <input
                      type="text"
                      value={skill.category}
                      onChange={(e) => updateSkillCategory(index, 'category', e.target.value)}
                      placeholder="Kategori"
                      className="w-full px-2 py-1 text-sm text-gray-900 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                    />
                    <input
                      type="text"
                      value={skill.items.join(', ')}
                      onChange={(e) => updateSkillCategory(index, 'items', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
                      placeholder="Yetenekler (virgülle ayırın)"
                      className="w-full px-2 py-1 text-sm text-gray-900 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                    />
                </div>
              ))}
            </div>
          )}

            {!activeSection && (
            <div className="text-center text-gray-500 py-8">
              <p className="text-sm">Select a section from above to edit</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex-none p-4 border-t bg-gray-50 space-y-3">
        <div>
          <p className="text-xs font-semibold text-gray-700 mb-2">JSON Yedek</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleExportBackup}
              className="flex items-center justify-center gap-1.5 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Download className="w-4 h-4" />
              Yedek Al
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center gap-1.5 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Yedek Yükle
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImportBackup(file);
            }}
          />
        </div>

        {backupMessage && (
          <p
            className={`text-xs ${
              backupMessage.type === 'success' ? 'text-green-700' : 'text-red-600'
            }`}
          >
            {backupMessage.text}
          </p>
        )}

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

