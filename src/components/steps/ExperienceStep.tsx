import React from 'react';
import { useResume } from '../../context/ResumeContext';

export const ExperienceStep: React.FC = () => {
  const { data, updateData, addExperience, removeExperience } = useResume();

  const handleChange = (id: string, field: string, value: string | boolean) => {
    const updated = data.experiences.map((exp) =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    updateData({ experiences: updated });
  };

  return (
    <div className="step-content">
      <h2>Work Experience</h2>
      <p className="step-description">Add your professional experience.</p>

      {data.experiences.map((exp, index) => (
        <div key={exp.id} className="card">
          <div className="card-header">
            <h3>Experience {index + 1}</h3>
            <button className="btn-remove" onClick={() => removeExperience(exp.id)}>
              Remove
            </button>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Company *</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleChange(exp.id, 'company', e.target.value)}
                placeholder="Google"
              />
            </div>
            <div className="form-group">
              <label>Position *</label>
              <input
                type="text"
                value={exp.position}
                onChange={(e) => handleChange(exp.id, 'position', e.target.value)}
                placeholder="Software Engineer"
              />
            </div>
            <div className="form-group">
              <label>Start Date *</label>
              <input
                type="month"
                value={exp.startDate}
                onChange={(e) => handleChange(exp.id, 'startDate', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="month"
                value={exp.endDate}
                onChange={(e) => handleChange(exp.id, 'endDate', e.target.value)}
                disabled={exp.current}
              />
            </div>
          </div>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={exp.current}
              onChange={(e) => handleChange(exp.id, 'current', e.target.checked)}
            />
            Currently working here
          </label>

          <div className="form-group full-width">
            <label>Description *</label>
            <textarea
              value={exp.description}
              onChange={(e) => handleChange(exp.id, 'description', e.target.value)}
              placeholder="Describe your key responsibilities and achievements..."
              rows={4}
            />
          </div>
        </div>
      ))}

      <button className="btn-add-card" onClick={addExperience}>
        + Add Experience
      </button>
    </div>
  );
};
