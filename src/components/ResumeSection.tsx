interface ResumeSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function ResumeSection({ title, children }: ResumeSectionProps) {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-3 pb-1 border-b border-gray-300 uppercase tracking-wide">
        {title}
      </h2>
      {children}
    </section>
  );
}

