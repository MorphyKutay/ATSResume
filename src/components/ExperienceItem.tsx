import { Experience } from '@/types/resume';

interface ExperienceItemProps {
  experience: Experience;
}

export default function ExperienceItem({ experience }: ExperienceItemProps) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between items-start mb-1">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">{experience.position}</h3>
          <p className="text-base text-gray-700 font-semibold">{experience.company}</p>
        </div>
        <div className="text-right text-sm text-gray-600 ml-4">
          <p className="font-medium whitespace-nowrap">
            {experience.startDate} - {experience.current ? 'Present' : experience.endDate}
          </p>
          <p className="text-gray-500">{experience.location}</p>
        </div>
      </div>
      
      <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-gray-700">
        {experience.description.map((item, index) => (
          <li key={index} className="leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

