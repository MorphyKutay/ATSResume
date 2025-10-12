import { Skill } from '@/types/resume';

interface SkillsSectionProps {
  skills: Skill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <div className="space-y-2">
      {skills.map((skill, index) => (
        <div key={index}>
          <span className="font-semibold text-gray-900">{skill.category}:</span>{' '}
          <span className="text-gray-700">{skill.items.join(', ')}</span>
        </div>
      ))}
    </div>
  );
}

