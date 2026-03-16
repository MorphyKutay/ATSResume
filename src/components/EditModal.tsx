'use client';

import { useState } from 'react';
import { ResumeData, Experience, Education, Skill, Project } from '@/types/resume';
import { X, Plus, Trash2 } from 'lucide-react';

interface EditModalProps {
  resumeData: ResumeData;
  onSave: (data: ResumeData) => void;
  onClose: () => void;
}

export default function EditModal({ resumeData, onSave, onClose }: EditModalProps) {
  const [data, setData] = useState<ResumeData>(JSON.parse(JSON.stringify(resumeData)));
  const [activeTab, setActiveTab] = useState<'contact' | 'summary' | 'experience' | 'education' | 'projects' | 'skills'>('contact');

  const handleSave = () => {
    onSave(data);
    onClose();
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
    setData({ ...data, experience: [...data.experience, newExp] });
  };

  const removeExperience = (id: string) => {
    setData({ ...data, experience: data.experience.filter(exp => exp.id !== id) });
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setData({
      ...data,
      experience: data.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
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
    setData({ ...data, education: [...data.education, newEdu] });
  };

  const removeEducation = (id: string) => {
    setData({ ...data, education: data.education.filter(edu => edu.id !== id) });
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    setData({
      ...data,
      education: data.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const addSkillCategory = () => {
    const newSkill: Skill = {
      category: '',
      items: []
    };
    setData({ ...data, skills: [...data.skills, newSkill] });
  };

  const removeSkillCategory = (index: number) => {
    setData({ ...data, skills: data.skills.filter((_, i) => i !== index) });
  };

  const updateSkillCategory = (index: number, field: keyof Skill, value: any) => {
    setData({
      ...data,
      skills: data.skills.map((skill, i) =>
        i === index ? { ...skill, [field]: value } : skill
      )
    });
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
    };
    setData({ ...data, projects: [...data.projects, newProject] });
  };

  const removeProject = (id: string) => {
    setData({ ...data, projects: data.projects.filter(proj => proj.id !== id) });
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    setData({
      ...data,
      projects: data.projects.map(proj =>
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Özgeçmişi Düzenle</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b overflow-x-auto">
          {[
            { key: 'contact', label: 'İletişim' },
            { key: 'summary', label: 'Özet' },
            { key: 'experience', label: 'Deneyim' },
            { key: 'education', label: 'Eğitim' },
            { key: 'projects', label: 'Projeler' },
            { key: 'skills', label: 'Yetenekler' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-6 py-3 font-medium whitespace-nowrap ${
                activeTab === tab.key
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
                <input
                  type="text"
                  value={data.contact.fullName}
                  onChange={(e) => setData({ ...data, contact: { ...data.contact, fullName: e.target.value } })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                  placeholder="Adınız Soyadınız"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ünvan</label>
                <input
                  type="text"
                  value={data.contact.title}
                  onChange={(e) => setData({ ...data, contact: { ...data.contact, title: e.target.value } })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                  <input
                    type="email"
                    value={data.contact.email}
                    onChange={(e) => setData({ ...data, contact: { ...data.contact, email: e.target.value } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                  <input
                    type="tel"
                    value={data.contact.phone}
                    onChange={(e) => setData({ ...data, contact: { ...data.contact, phone: e.target.value } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Konum</label>
                <input
                  type="text"
                  value={data.contact.location}
                  onChange={(e) => setData({ ...data, contact: { ...data.contact, location: e.target.value } })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn (Opsiyonel)</label>
                  <input
                    type="url"
                    value={data.contact.linkedin || ''}
                    onChange={(e) => setData({ ...data, contact: { ...data.contact, linkedin: e.target.value } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GitHub (Opsiyonel)</label>
                  <input
                    type="url"
                    value={data.contact.github || ''}
                    onChange={(e) => setData({ ...data, contact: { ...data.contact, github: e.target.value } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Web Sitesi (Opsiyonel)</label>
                <input
                  type="url"
                  value={data.contact.website || ''}
                  onChange={(e) => setData({ ...data, contact: { ...data.contact, website: e.target.value } })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                  placeholder="https://..."
                />
              </div>
            </div>
          )}

          {activeTab === 'summary' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Profesyonel Özet</label>
              <textarea
                value={data.summary}
                onChange={(e) => setData({ ...data, summary: e.target.value })}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Kendinizi ve deneyimlerinizi kısaca açıklayın..."
              />
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={exp.id} className="border border-gray-200 rounded-lg p-4 relative">
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Pozisyon</label>
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Şirket</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Başlangıç</label>
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                          placeholder="Ocak 2021"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Bitiş</label>
                        <input
                          type="text"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                          disabled={exp.current}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                          placeholder="Aralık 2023"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Konum</label>
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                        className="mr-2"
                      />
                      <label className="text-sm text-gray-700">Halen çalışıyorum</label>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Açıklama (Her satır bir madde)</label>
                      <textarea
                        value={exp.description.join('\n')}
                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value.split('\n'))}
                        rows={4}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                        placeholder="Her başarınızı yeni satıra yazın..."
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                onClick={addExperience}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 flex items-center justify-center gap-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Deneyim Ekle
              </button>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="space-y-6">
              {data.education.map((edu, index) => (
                <div key={edu.id} className="border border-gray-200 rounded-lg p-4 relative">
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Okul</label>
                        <input
                          type="text"
                          value={edu.school}
                          onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Derece</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                          placeholder="Lisans, Yüksek Lisans..."
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Alan</label>
                        <input
                          type="text"
                          value={edu.field}
                          onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                          placeholder="Bilgisayar Mühendisliği..."
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Konum</label>
                        <input
                          type="text"
                          value={edu.location}
                          onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Başlangıç Yılı</label>
                        <input
                          type="text"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                          placeholder="2017"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Bitiş Yılı</label>
                        <input
                          type="text"
                          value={edu.endDate}
                          onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                          placeholder="2021"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">GPA (Opsiyonel)</label>
                        <input
                          type="text"
                          value={edu.gpa || ''}
                          onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                          placeholder="3.50/4.00"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                onClick={addEducation}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 flex items-center justify-center gap-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Eğitim Ekle
              </button>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-6">
              {data.projects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4 relative">
                  <button
                    onClick={() => removeProject(project.id)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Proje Adı</label>
                      <input
                        type="text"
                        value={project.name}
                        onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                        placeholder="Proje Adı"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Açıklama</label>
                      <textarea
                        value={project.description}
                        onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                        placeholder="Proje hakkında kısa bir açıklama..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Teknolojiler (virgülle ayırın)</label>
                      <input
                        type="text"
                        value={project.technologies.join(', ')}
                        onChange={(e) => updateProject(project.id, 'technologies', e.target.value.split(',').map(t => t.trim()).filter(t => t))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                        placeholder="React, TypeScript, Node.js..."
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Demo Link (Opsiyonel)</label>
                        <input
                          type="url"
                          value={project.link || ''}
                          onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                          placeholder="https://..."
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">GitHub (Opsiyonel)</label>
                        <input
                          type="url"
                          value={project.github || ''}
                          onChange={(e) => updateProject(project.id, 'github', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                          placeholder="https://github.com/..."
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Başlangıç (Opsiyonel)</label>
                        <input
                          type="text"
                          value={project.startDate || ''}
                          onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                          placeholder="Ocak 2024"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Bitiş (Opsiyonel)</label>
                        <input
                          type="text"
                          value={project.endDate || ''}
                          onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                          placeholder="Mart 2024"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                onClick={addProject}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 flex items-center justify-center gap-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Proje Ekle
              </button>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-4">
              {data.skills.map((skill, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 relative">
                  <button
                    onClick={() => removeSkillCategory(index)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Kategori</label>
                      <input
                        type="text"
                        value={skill.category}
                        onChange={(e) => updateSkillCategory(index, 'category', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                        placeholder="Frontend Teknolojileri..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Yetenekler (virgülle ayırın)</label>
                      <input
                        type="text"
                        value={skill.items.join(', ')}
                        onChange={(e) => updateSkillCategory(index, 'items', e.target.value.split(',').map(s => s.trim()))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                        placeholder="React, TypeScript, Next.js..."
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                onClick={addSkillCategory}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 flex items-center justify-center gap-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Yetenek Kategorisi Ekle
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            İptal
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}

