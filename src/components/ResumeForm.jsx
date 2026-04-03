import { useState } from 'react';
import './ResumeForm.css';

function ResumeForm({ data, onChange }) {
  const [activeSection, setActiveSection] = useState('personal');

  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const updateEducation = (index, field, value) => {
    const updated = data.education.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onChange({ ...data, education: updated });
  };

  const addEducation = () => {
    const newItem = {
      id: Date.now(),
      school: '',
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    onChange({ ...data, education: [...data.education, newItem] });
  };

  const removeEducation = (index) => {
    if (data.education.length <= 1) return;
    onChange({ ...data, education: data.education.filter((_, i) => i !== index) });
  };

  const updateExperience = (index, field, value) => {
    const updated = data.experience.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onChange({ ...data, experience: updated });
  };

  const addExperience = () => {
    const newItem = {
      id: Date.now(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onChange({ ...data, experience: [...data.experience, newItem] });
  };

  const removeExperience = (index) => {
    if (data.experience.length <= 1) return;
    onChange({ ...data, experience: data.experience.filter((_, i) => i !== index) });
  };

  const sections = [
    { id: 'personal', label: '👤 인적사항' },
    { id: 'education', label: '🎓 학력' },
    { id: 'experience', label: '💼 경력' },
    { id: 'extra', label: '📌 기타' },
  ];

  return (
    <div className="resume-form">
      <div className="form-tabs">
        {sections.map((section) => (
          <button
            type="button"
            key={section.id}
            className={`form-tab ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => setActiveSection(section.id)}
          >
            {section.label}
          </button>
        ))}
      </div>

      <div className="form-content">
        {activeSection === 'personal' && (
          <div className="form-section">
            <div className="field-group">
              <label>이름 *</label>
              <input
                type="text"
                placeholder="홍길동"
                value={data.name}
                onChange={(e) => updateField('name', e.target.value)}
              />
            </div>
            <div className="field-row">
              <div className="field-group">
                <label>이메일</label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  value={data.email}
                  onChange={(e) => updateField('email', e.target.value)}
                />
              </div>
              <div className="field-group">
                <label>연락처</label>
                <input
                  type="tel"
                  placeholder="010-0000-0000"
                  value={data.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                />
              </div>
            </div>
            <div className="field-group">
              <label>주소</label>
              <input
                type="text"
                placeholder="서울특별시 강남구"
                value={data.address}
                onChange={(e) => updateField('address', e.target.value)}
              />
            </div>
            <div className="field-group">
              <label>웹사이트 / GitHub</label>
              <input
                type="text"
                placeholder="https://github.com/username"
                value={data.website}
                onChange={(e) => updateField('website', e.target.value)}
              />
            </div>
            <div className="field-group">
              <label>자기소개</label>
              <textarea
                placeholder="간략한 자기소개를 입력하세요..."
                value={data.summary}
                onChange={(e) => updateField('summary', e.target.value)}
                rows={4}
              />
            </div>
          </div>
        )}

        {activeSection === 'education' && (
          <div className="form-section">
            {data.education.map((edu, index) => (
              <div key={edu.id} className="repeatable-item">
                <div className="item-header">
                  <span className="item-number">학력 {index + 1}</span>
                  {data.education.length > 1 && (
                    <button
                      className="btn-remove"
                      onClick={() => removeEducation(index)}
                    >
                      ✕ 삭제
                    </button>
                  )}
                </div>
                <div className="field-group">
                  <label>학교명</label>
                  <input
                    type="text"
                    placeholder="OO대학교"
                    value={edu.school}
                    onChange={(e) => updateEducation(index, 'school', e.target.value)}
                  />
                </div>
                <div className="field-row">
                  <div className="field-group">
                    <label>학위</label>
                    <select
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                    >
                      <option value="">선택</option>
                      <option value="고등학교 졸업">고등학교 졸업</option>
                      <option value="전문학사">전문학사</option>
                      <option value="학사">학사</option>
                      <option value="석사">석사</option>
                      <option value="박사">박사</option>
                    </select>
                  </div>
                  <div className="field-group">
                    <label>전공</label>
                    <input
                      type="text"
                      placeholder="컴퓨터공학과"
                      value={edu.major}
                      onChange={(e) => updateEducation(index, 'major', e.target.value)}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <div className="field-group">
                    <label>입학년월</label>
                    <input
                      type="month"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                    />
                  </div>
                  <div className="field-group">
                    <label>졸업년월</label>
                    <input
                      type="month"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                    />
                  </div>
                </div>
                <div className="field-group">
                  <label>설명 (선택)</label>
                  <textarea
                    placeholder="수상, 논문, 특이사항 등"
                    value={edu.description}
                    onChange={(e) => updateEducation(index, 'description', e.target.value)}
                    rows={2}
                  />
                </div>
              </div>
            ))}
            <button className="btn-add" onClick={addEducation}>
              + 학력 추가
            </button>
          </div>
        )}

        {activeSection === 'experience' && (
          <div className="form-section">
            {data.experience.map((exp, index) => (
              <div key={exp.id} className="repeatable-item">
                <div className="item-header">
                  <span className="item-number">경력 {index + 1}</span>
                  {data.experience.length > 1 && (
                    <button
                      className="btn-remove"
                      onClick={() => removeExperience(index)}
                    >
                      ✕ 삭제
                    </button>
                  )}
                </div>
                <div className="field-row">
                  <div className="field-group">
                    <label>회사명</label>
                    <input
                      type="text"
                      placeholder="(주)OO회사"
                      value={exp.company}
                      onChange={(e) => updateExperience(index, 'company', e.target.value)}
                    />
                  </div>
                  <div className="field-group">
                    <label>직책/직위</label>
                    <input
                      type="text"
                      placeholder="프론트엔드 개발자"
                      value={exp.position}
                      onChange={(e) => updateExperience(index, 'position', e.target.value)}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <div className="field-group">
                    <label>시작년월</label>
                    <input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                    />
                  </div>
                  <div className="field-group">
                    <label>종료년월</label>
                    <input
                      type="month"
                      value={exp.endDate}
                      disabled={exp.current}
                      onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                    />
                  </div>
                </div>
                <div className="field-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                    />
                    현재 재직 중
                  </label>
                </div>
                <div className="field-group">
                  <label>주요 업무 및 성과</label>
                  <textarea
                    placeholder="주요 업무, 프로젝트, 성과 등을 입력하세요..."
                    value={exp.description}
                    onChange={(e) => updateExperience(index, 'description', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            ))}
            <button className="btn-add" onClick={addExperience}>
              + 경력 추가
            </button>
          </div>
        )}

        {activeSection === 'extra' && (
          <div className="form-section">
            <div className="field-group">
              <label>보유 기술</label>
              <textarea
                placeholder="React, JavaScript, Python, Git..."
                value={data.skills}
                onChange={(e) => updateField('skills', e.target.value)}
                rows={3}
              />
              <span className="field-hint">쉼표(,)로 구분하여 입력하세요</span>
            </div>
            <div className="field-group">
              <label>자격증 / 어학</label>
              <textarea
                placeholder="정보처리기사 (2023.06), TOEIC 850 (2022.11)..."
                value={data.certifications}
                onChange={(e) => updateField('certifications', e.target.value)}
                rows={3}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeForm;
