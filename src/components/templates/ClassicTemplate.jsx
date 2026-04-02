import './ClassicTemplate.css';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  return `${year}.${month}`;
}

function ClassicTemplate({ data }) {
  const { name, email, phone, address, website, summary, education, experience, skills, certifications } = data;

  const skillList = skills
    ? skills.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  const certList = certifications
    ? certifications.split('\n').map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="classic-template">
      {/* Header */}
      <header className="ct-header">
        <h1 className="ct-name">{name || '홍길동'}</h1>
        <div className="ct-contact">
          {email && <span>✉ {email}</span>}
          {phone && <span>📞 {phone}</span>}
          {address && <span>📍 {address}</span>}
          {website && <span>🌐 {website}</span>}
        </div>
      </header>

      <div className="ct-body">
        {/* Summary */}
        {summary && (
          <section className="ct-section">
            <h2 className="ct-section-title">자기소개</h2>
            <div className="ct-divider" />
            <p className="ct-summary">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.some((e) => e.company) && (
          <section className="ct-section">
            <h2 className="ct-section-title">경력사항</h2>
            <div className="ct-divider" />
            {experience.map((exp) =>
              exp.company ? (
                <div key={exp.id} className="ct-item">
                  <div className="ct-item-header">
                    <div>
                      <span className="ct-item-title">{exp.company}</span>
                      {exp.position && (
                        <span className="ct-item-subtitle"> · {exp.position}</span>
                      )}
                    </div>
                    <span className="ct-item-date">
                      {formatDate(exp.startDate)}
                      {exp.startDate && ' ~ '}
                      {exp.current ? '현재' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="ct-item-desc">{exp.description}</p>
                  )}
                </div>
              ) : null
            )}
          </section>
        )}

        {/* Education */}
        {education && education.some((e) => e.school) && (
          <section className="ct-section">
            <h2 className="ct-section-title">학력사항</h2>
            <div className="ct-divider" />
            {education.map((edu) =>
              edu.school ? (
                <div key={edu.id} className="ct-item">
                  <div className="ct-item-header">
                    <div>
                      <span className="ct-item-title">{edu.school}</span>
                      {(edu.degree || edu.major) && (
                        <span className="ct-item-subtitle">
                          {' · '}
                          {[edu.degree, edu.major].filter(Boolean).join(' ')}
                        </span>
                      )}
                    </div>
                    <span className="ct-item-date">
                      {formatDate(edu.startDate)}
                      {edu.startDate && ' ~ '}
                      {formatDate(edu.endDate)}
                    </span>
                  </div>
                  {edu.description && (
                    <p className="ct-item-desc">{edu.description}</p>
                  )}
                </div>
              ) : null
            )}
          </section>
        )}

        {/* Skills */}
        {skillList.length > 0 && (
          <section className="ct-section">
            <h2 className="ct-section-title">보유 기술</h2>
            <div className="ct-divider" />
            <div className="ct-skills">
              {skillList.map((skill, i) => (
                <span key={i} className="ct-skill-tag">{skill}</span>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certList.length > 0 && (
          <section className="ct-section">
            <h2 className="ct-section-title">자격증 / 어학</h2>
            <div className="ct-divider" />
            <ul className="ct-cert-list">
              {certList.map((cert, i) => (
                <li key={i}>{cert}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

export default ClassicTemplate;
