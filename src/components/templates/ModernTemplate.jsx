import './ModernTemplate.css';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  return `${year}.${month}`;
}

function ModernTemplate({ data }) {
  const { name, email, phone, address, website, summary, education, experience, skills, certifications } = data;

  const skillList = skills
    ? skills.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  const certList = certifications
    ? certifications.split('\n').map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="modern-template">
      {/* Sidebar */}
      <aside className="mt-sidebar">
        <div className="mt-avatar">
          <span>{name ? name.charAt(0) : '이'}</span>
        </div>
        <h1 className="mt-name">{name || '홍길동'}</h1>

        <div className="mt-contact-section">
          <h3 className="mt-sidebar-title">연락처</h3>
          {email && (
            <div className="mt-contact-item">
              <span className="mt-contact-icon">✉</span>
              <span>{email}</span>
            </div>
          )}
          {phone && (
            <div className="mt-contact-item">
              <span className="mt-contact-icon">📞</span>
              <span>{phone}</span>
            </div>
          )}
          {address && (
            <div className="mt-contact-item">
              <span className="mt-contact-icon">📍</span>
              <span>{address}</span>
            </div>
          )}
          {website && (
            <div className="mt-contact-item">
              <span className="mt-contact-icon">🌐</span>
              <span className="mt-website">{website}</span>
            </div>
          )}
        </div>

        {skillList.length > 0 && (
          <div className="mt-contact-section">
            <h3 className="mt-sidebar-title">보유 기술</h3>
            <div className="mt-skills">
              {skillList.map((skill, i) => (
                <div key={i} className="mt-skill-item">
                  <span className="mt-skill-name">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {certList.length > 0 && (
          <div className="mt-contact-section">
            <h3 className="mt-sidebar-title">자격증 / 어학</h3>
            <ul className="mt-cert-list">
              {certList.map((cert, i) => (
                <li key={i}>{cert}</li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="mt-main">
        {summary && (
          <section className="mt-section">
            <h2 className="mt-section-title">
              <span className="mt-title-bar" />
              자기소개
            </h2>
            <p className="mt-summary">{summary}</p>
          </section>
        )}

        {experience && experience.some((e) => e.company) && (
          <section className="mt-section">
            <h2 className="mt-section-title">
              <span className="mt-title-bar" />
              경력사항
            </h2>
            {experience.map((exp) =>
              exp.company ? (
                <div key={exp.id} className="mt-timeline-item">
                  <div className="mt-timeline-dot" />
                  <div className="mt-timeline-content">
                    <div className="mt-item-header">
                      <div>
                        <span className="mt-company">{exp.company}</span>
                        {exp.position && (
                          <span className="mt-position"> | {exp.position}</span>
                        )}
                      </div>
                      <span className="mt-date">
                        {formatDate(exp.startDate)}
                        {exp.startDate && ' – '}
                        {exp.current ? '현재' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="mt-desc">{exp.description}</p>
                    )}
                  </div>
                </div>
              ) : null
            )}
          </section>
        )}

        {education && education.some((e) => e.school) && (
          <section className="mt-section">
            <h2 className="mt-section-title">
              <span className="mt-title-bar" />
              학력사항
            </h2>
            {education.map((edu) =>
              edu.school ? (
                <div key={edu.id} className="mt-timeline-item">
                  <div className="mt-timeline-dot" />
                  <div className="mt-timeline-content">
                    <div className="mt-item-header">
                      <div>
                        <span className="mt-company">{edu.school}</span>
                        {(edu.degree || edu.major) && (
                          <span className="mt-position">
                            {' | '}
                            {[edu.degree, edu.major].filter(Boolean).join(' ')}
                          </span>
                        )}
                      </div>
                      <span className="mt-date">
                        {formatDate(edu.startDate)}
                        {edu.startDate && ' – '}
                        {formatDate(edu.endDate)}
                      </span>
                    </div>
                    {edu.description && (
                      <p className="mt-desc">{edu.description}</p>
                    )}
                  </div>
                </div>
              ) : null
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default ModernTemplate;
