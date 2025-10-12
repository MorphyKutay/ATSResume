'use client';

import { useState } from 'react';
import ResumeHeader from '@/components/ResumeHeader';
import ResumeSection from '@/components/ResumeSection';
import ExperienceItem from '@/components/ExperienceItem';
import EducationItem from '@/components/EducationItem';
import SkillsSection from '@/components/SkillsSection';
import ProjectItem from '@/components/ProjectItem';
import Sidebar from '@/components/Sidebar';
import { sampleResumeData } from '@/data/sampleData';
import { ResumeData } from '@/types/resume';
import { Download } from 'lucide-react';

type VisibleSections = {
  summary: boolean;
  experience: boolean;
  education: boolean;
  projects: boolean;
  skills: boolean;
};

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData>(sampleResumeData);
  const [visibleSections, setVisibleSections] = useState<VisibleSections>({
    summary: true,
    experience: true,
    education: true,
    projects: true,
    skills: true,
  });

  const handleDownloadPDF = () => {
    window.print();
  };

  const toggleSection = (section: keyof VisibleSections) => {
    setVisibleSections({
      ...visibleSections,
      [section]: !visibleSections[section],
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Always visible */}
      <Sidebar
        resumeData={resumeData}
        visibleSections={visibleSections}
        onToggleSection={toggleSection}
        onUpdateData={setResumeData}
        isOpen={true}
        onClose={() => {}}
      />

      {/* Main Content Area */}
      <div className="flex-1 print:ml-0">
        {/* PDF Download Button - Hidden when printing */}
        <div className="print:hidden fixed top-4 right-4 z-30">
          <button
            onClick={handleDownloadPDF}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>

        {/* Info Banner - Hidden when printing */}
        <div className="print:hidden bg-blue-600 text-white py-3 px-4 text-center text-sm">
          <p>
            ✨ ATS-Friendly Resume Template - This template is optimized for easy readability by Applicant Tracking Systems
          </p>
        </div>

        {/* Resume Content */}
        <main className="max-w-4xl mx-auto bg-white shadow-xl my-8 print:my-0 print:shadow-none">
        <div className="p-8 md:p-12 print:p-12">
          <ResumeHeader contact={resumeData.contact} />

          {/* Professional Summary */}
          {visibleSections.summary && (
          <ResumeSection title="Professional Summary">
            <p className="text-sm text-gray-700 leading-relaxed">
              {resumeData.summary}
            </p>
          </ResumeSection>
          )}

          {/* Work Experience */}
          {visibleSections.experience && (
          <ResumeSection title="Work Experience">
            {resumeData.experience.map((exp) => (
              <ExperienceItem key={exp.id} experience={exp} />
            ))}
          </ResumeSection>
          )}

          {/* Education */}
          {visibleSections.education && (
          <ResumeSection title="Education">
            {resumeData.education.map((edu) => (
              <EducationItem key={edu.id} education={edu} />
            ))}
          </ResumeSection>
          )}

          {/* Projects */}
          {visibleSections.projects && (
          <ResumeSection title="Projects">
            {resumeData.projects.map((proj) => (
              <ProjectItem 
                key={proj.id} 
                project={proj}
              />
            ))}
          </ResumeSection>
          )}

          {/* Skills */}
          {visibleSections.skills && (
          <ResumeSection title="Skills">
            <SkillsSection skills={resumeData.skills} />
          </ResumeSection>
          )}
          </div>
        </main>

        {/* Footer - Hidden when printing */}
        <footer className="print:hidden text-center py-8 text-gray-600 text-sm">
          <p>This resume is optimized for ATS compatibility.</p>
          <p className="mt-2">
            <strong>💜 Left Panel:</strong> Manage and edit sections
          </p>
          <p className="mt-2">
            Built by <a href="https://github.com/MorphyKutay" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">@MorphyKutay</a>
          </p>
        </footer>
      </div>
    </div>
  );
}
