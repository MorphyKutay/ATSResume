# ATS-Friendly Resume Builder

A modern, professional resume builder optimized for Applicant Tracking Systems (ATS). Built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

![ATS Resume Builder](https://img.shields.io/badge/Next.js-15.5.4-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

### 🎯 ATS Optimization
- **Single-page PDF output** - All content fits on one page
- **Clean, semantic structure** - Easy for ATS systems to parse
- **Standard sections** - Professional Summary, Experience, Education, Projects, Skills
- **Clickable links in PDF** - Email, phone, and web links remain functional
- **Optimized typography** - ATS-friendly fonts and spacing

### 💼 Professional Design
- **Modern, clean layout** - Professional appearance
- **Responsive design** - Works on desktop, tablet, and mobile
- **Technology badges** - Modern skill display with colored badges
- **Icon integration** - Lucide React icons for enhanced visuals
- **Print-optimized** - Perfect PDF generation via browser print

### 🎨 Easy Customization
- **Left sidebar panel** - Manage all content from one place
- **Show/hide sections** - Control which sections appear on your resume
- **Real-time editing** - See changes instantly
- **Add/remove entries** - Easily manage experience, education, and projects
- **Persistent state** - Your changes are saved while editing

### 📱 User Experience
- **Intuitive interface** - Easy to navigate and use
- **Section management** - Toggle visibility of any section
- **One-click PDF download** - Generate PDF instantly
- **No backend required** - Runs entirely in the browser
- **Fast and lightweight** - Built with Next.js 15 and Turbopack

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ats-resume-builder.git
cd ats-resume-builder
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📝 Usage

### Editing Your Resume

1. **Open the left sidebar** - Access the control panel to edit all sections
2. **Select a section** - Click on any section (Contact, Summary, Experience, etc.)
3. **Edit content** - Update your information in the editing panel
4. **Add/Remove entries** - Use the "+ Add" button to create new entries
5. **Toggle visibility** - Use the eye icon to show/hide sections
6. **Save changes** - Click "Save Changes" to apply your edits

### Downloading PDF

1. Click the green **"Download PDF"** button in the top-right corner
2. Your browser's print dialog will open
3. Select **"Save as PDF"** as the destination
4. Click **"Save"** to download your resume

**Note:** All links (email, phone, LinkedIn, GitHub) remain clickable in the PDF!

## 🏗️ Project Structure

```
my-app/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles and print optimization
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Main resume page
│   ├── components/
│   │   ├── Sidebar.tsx           # Left control panel
│   │   ├── ResumeHeader.tsx      # Contact information section
│   │   ├── ResumeSection.tsx     # Section wrapper component
│   │   ├── ExperienceItem.tsx    # Work experience display
│   │   ├── EducationItem.tsx     # Education display
│   │   ├── ProjectItem.tsx       # Project display
│   │   ├── SkillsSection.tsx     # Skills display
│   │   └── EditModal.tsx         # Full edit modal (optional)
│   ├── data/
│   │   └── sampleData.ts         # Sample resume data
│   └── types/
│       └── resume.ts             # TypeScript interfaces
├── public/                       # Static assets
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Customization

### Updating Your Information

Edit `src/data/sampleData.ts` to change the default resume data:

```typescript
export const sampleResumeData: ResumeData = {
  contact: {
    fullName: "Your Name",
    title: "Your Title",
    email: "your.email@example.com",
    // ... more fields
  },
  summary: "Your professional summary...",
  experience: [...],
  education: [...],
  projects: [...],
  skills: [...]
};
```

### Modifying Colors

The project uses Tailwind CSS. Main colors can be modified in:
- `src/app/globals.css` - For print styles
- Component files - For UI colors

### Adding New Sections

1. Add the section interface to `src/types/resume.ts`
2. Create a new component in `src/components/`
3. Update `src/app/page.tsx` to include the new section
4. Add editing capability in `src/components/Sidebar.tsx`

## 🛠️ Technologies

- **[Next.js 15.5.4](https://nextjs.org/)** - React framework with App Router
- **[React 19.1.0](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[Turbopack](https://turbo.build/pack)** - Fast bundler

## 📋 Features Breakdown

### ✅ Implemented Features

- ✅ Complete resume sections (Contact, Summary, Experience, Education, Projects, Skills)
- ✅ Left sidebar control panel
- ✅ Section visibility toggle
- ✅ Add/edit/remove entries
- ✅ Real-time preview
- ✅ PDF download functionality
- ✅ Single-page PDF optimization
- ✅ Clickable links in PDF
- ✅ ATS-friendly formatting
- ✅ Responsive design
- ✅ Technology badges
- ✅ Modern UI/UX

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Icons by [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

## 👨‍💻 Author

**Kutay** - [@MorphyKutay](https://github.com/MorphyKutay)

- 🌐 Website: [kutaysec.online](https://kutaysec.online/)
- 🐦 X (Twitter): [@exploitpy](https://x.com/exploitpy)
- 📷 Instagram: [@kutay.java](https://instagram.com/kutay.java)

---

**Made with ❤️ for job seekers everywhere**
