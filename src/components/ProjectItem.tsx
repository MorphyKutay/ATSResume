'use client';

import { Project } from '@/types/resume';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectItemProps {
  project: Project;
  isEditable?: boolean;
  onUpdate?: (field: keyof Project, value: any) => void;
}

export default function ProjectItem({ project }: ProjectItemProps) {
  return (
    <div className="mb-4 last:mb-0">
      {/* Başlık ve Linkler */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className="text-base font-bold text-gray-900 mb-1">{project.name}</h3>
          <div className="flex gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-600 hover:text-gray-800 hover:underline flex items-center gap-1"
              >
                <Github className="w-3 h-3" />
                GitHub
              </a>
            )}
          </div>
        </div>
        {(project.startDate || project.endDate) && (
          <span className="text-xs text-gray-600 font-medium whitespace-nowrap ml-4">
            {project.startDate} {project.endDate && `- ${project.endDate}`}
          </span>
        )}
      </div>
      
      {/* Açıklama */}
      <p className="text-sm text-gray-700 leading-relaxed mb-2">
        {project.description}
      </p>
      
      {/* Teknolojiler */}
      {project.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="inline-block px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

