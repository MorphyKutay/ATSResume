import { Education } from '@/types/resume';

interface EducationItemProps {
  education: Education;
}

export default function EducationItem({ education }: EducationItemProps) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-base font-bold text-gray-900">{education.school}</h3>
          <p className="text-sm text-gray-700">
            {education.degree} - {education.field}
          </p>
          {education.gpa && (
            <p className="text-sm text-gray-600">GPA: {education.gpa}</p>
          )}
        </div>
        <div className="text-right text-sm text-gray-600 ml-4">
          <p className="font-medium whitespace-nowrap">
            {education.startDate} - {education.endDate}
          </p>
          <p className="text-gray-500">{education.location}</p>
        </div>
      </div>
    </div>
  );
}

