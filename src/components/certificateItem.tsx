import { Certificate } from '@/types/resume';
import { ExternalLink } from 'lucide-react';

interface CertificateItemProps {
  certificate: Certificate;
}

export default function CertificateItem({ certificate }: CertificateItemProps) {
  const dateRange = certificate.expirationdate
    ? `${certificate.issueDate} - ${certificate.expirationdate}`
    : certificate.issueDate;

  return (
    <div className="mb-3 last:mb-0">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-base font-bold text-gray-900">{certificate.certificaten}</h3>
          {certificate.certificationURL && (
            <a
              href={certificate.certificationURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 mt-1"
            >
              <ExternalLink className="w-3 h-3" />
              Verify
            </a>
          )}
          {certificate.certificationID && (
            <p className="text-sm text-gray-600 mt-1">ID: {certificate.certificationID}</p>
          )}
        </div>
        {dateRange && (
          <div className="text-right text-sm text-gray-600 ml-4">
            <p className="font-medium whitespace-nowrap">{dateRange}</p>
          </div>
        )}
      </div>
    </div>
  );
}

