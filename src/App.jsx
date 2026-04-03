import { useState } from 'react';
import './App.css';
import ResumeForm from './components/ResumeForm';
import TemplateSelector from './components/TemplateSelector';
import ClassicTemplate from './components/templates/ClassicTemplate';
import ModernTemplate from './components/templates/ModernTemplate';
import { downloadPDF } from './utils/pdfExport';

const TEMPLATES = [
  { id: 'classic', name: '클래식', description: '전통적인 이력서 스타일' },
  { id: 'modern', name: '모던', description: '현대적이고 세련된 디자인' },
];

const DEFAULT_RESUME_DATA = {
  name: '',
  email: '',
  phone: '',
  address: '',
  website: '',
  summary: '',
  education: [
    { id: 1, school: '', degree: '', major: '', startDate: '', endDate: '', description: '' },
  ],
  experience: [
    { id: 1, company: '', position: '', startDate: '', endDate: '', current: false, description: '' },
  ],
  skills: '',
  certifications: '',
};

function App() {
  const [resumeData, setResumeData] = useState(DEFAULT_RESUME_DATA);
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      const safeName = (resumeData.name || '이력서').replace(/[\\/:*?"<>|]/g, '_');
      await downloadPDF('resume-preview', `${safeName}.pdf`);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const TemplateComponent = selectedTemplate === 'modern' ? ModernTemplate : ClassicTemplate;

  return (
    <div className="app">
      <header className="app-header no-print">
        <div>
          <h1>📄 이력서 빌더</h1>
          <p className="subtitle">정보를 입력하고 원하는 디자인으로 이력서를 만드세요</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={handlePrint}>
            🖨️ 인쇄
          </button>
          <button
            className="btn btn-primary"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
          >
            {isDownloading ? '⏳ 생성 중...' : '⬇️ PDF 저장'}
          </button>
        </div>
      </header>

      <div className="app-body">
        <div className="form-panel no-print">
          <TemplateSelector
            templates={TEMPLATES}
            selected={selectedTemplate}
            onSelect={setSelectedTemplate}
          />
          <ResumeForm data={resumeData} onChange={setResumeData} />
        </div>

        <div className="preview-panel">
          <p className="preview-label no-print">실시간 미리보기</p>
          <div className="resume-preview" id="resume-preview">
            <TemplateComponent data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
