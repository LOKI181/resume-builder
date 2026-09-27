import React from 'react';
import { useResume } from '../../context/ResumeContext';

export const EducationStep: React.FC = () => {
  const { data, updateData, addEducation, removeEducation } = useResume();

  const handleChange = (id: string, field: string, value: string) => {
    const updated = data.education.map((edu) =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    updateData({ education: updated });
  };

  return (
    <div className="step-content">
      <h2>Education</h2>
      <p className="step-description">Add your educational background.</p>

      {data.education.map((edu, index) => (
        <div key={edu.id} className="card">
          <div className="card-header">
            <h3>Education {index + 1}</h3>
            <button className="btn-remove" onClick={() => removeEducation(edu.id)}>
              Remove
            </button>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Institution *</label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => handleChange(edu.id, 'institution', e.target.value)}
                placeholder="MIT"
              />
            </div>
            <div className="form-group">
              <label>Degree *</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleChange(edu.id, 'degree', e.target.value)}
                placeholder="Bachelor of Science"
              />
            </div>
            <div className="form-group">
              <label>Field of Study *</label>
              <input
                type="text"
                value={edu.field}
                onChange={(e) => handleChange(edu.id, 'field', e.target.value)}
                placeholder="Computer Science"
              />
            </div>
            <div className="form-group">
              <label>GPA</label>
              <input
                type="text"
                value={edu.gpa}
                onChange={(e) => handleChange(edu.id, 'gpa', e.target.value)}
                placeholder="3.8/4.0"
              />
            </div>
            <div className="form-group">
              <label>Start Date *</label>
              <input
                type="month"
                value={edu.startDate}
                onChange={(e) => handleChange(edu.id, 'startDate', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="month"
                value={edu.endDate}
                onChange={(e) => handleChange(edu.id, 'endDate', e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}

      <button className="btn-add-card" onClick={addEducation}>
        + Add Education
      </button>
    </div>
  );
};
