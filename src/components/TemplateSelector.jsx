import './TemplateSelector.css';

function TemplateSelector({ templates, selected, onSelect }) {
  return (
    <div className="template-selector">
      <h3 className="template-selector-title">📐 템플릿 선택</h3>
      <div className="template-list">
        {templates.map((template) => (
          <button
            key={template.id}
            className={`template-item ${selected === template.id ? 'selected' : ''}`}
            onClick={() => onSelect(template.id)}
          >
            <span className="template-icon">
              {template.id === 'classic' ? '📋' : '✨'}
            </span>
            <div className="template-info">
              <span className="template-name">{template.name}</span>
              <span className="template-desc">{template.description}</span>
            </div>
            {selected === template.id && <span className="template-check">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TemplateSelector;
