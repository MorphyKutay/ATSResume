'use client';

import { ContactInfo } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

interface ResumeHeaderProps {
  contact: ContactInfo;
  onEdit?: (field: keyof ContactInfo, value: string) => void;
}

export default function ResumeHeader({ contact, onEdit }: ResumeHeaderProps) {
  return (
    <header className="border-b-2 border-gray-800 pb-4 mb-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
        {contact.fullName}
      </h1>
      <p className="text-xl text-gray-700 mb-3 font-medium">{contact.title}</p>
      
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <a href={`mailto:${contact.email}`} className="hover:text-blue-600 transition-colors">
            {contact.email}
          </a>
        </div>
        
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          <a href={`tel:${contact.phone}`} className="hover:text-blue-600 transition-colors">
            {contact.phone}
          </a>
        </div>
        
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{contact.location}</span>
        </div>
        
        {contact.linkedin && (
          <div className="flex items-center gap-2">
            <Linkedin className="w-4 h-4" />
            <a 
              href={contact.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        )}
        
        {contact.github && (
          <div className="flex items-center gap-2">
            <Github className="w-4 h-4" />
            <a 
              href={contact.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              GitHub
            </a>
          </div>
        )}
        
        {contact.website && (
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <a 
              href={contact.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              Website
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

