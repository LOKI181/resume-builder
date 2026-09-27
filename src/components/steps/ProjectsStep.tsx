import React from 'react';
import { useResume } from '../../context/ResumeContext';

export const ProjectsStep: React.FC = () => {
  const { data, updateData, addProject, removeProject } = useResume();

  const handleChange = (id: string, field: string, value: string) => {
    const updated = data.projects.map((proj) =>
      proj.id === id ? { ...proj, [field]: value } : proj
    );
    updateData({ projects: updated });
  };

  return (
    <div className="step-content">
      <h2>Projects</h2>
      <p className="step-description">Showcase your notable projects (optional).</p>

      {data.projects.map((proj, index) => (
        <div key={proj.id} className="card">
          <div className="card-header">
            <h3>Project {index + 1}</h3>
            <button className="btn-remove" onClick={() => removeProject(proj.id)}>
              Remove
            </button>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Project Name *</label>
              <input
                type="text"
                value={proj.name}
                onChange={(e) => handleChange(proj.id, 'name', e.target.value)}
                placeholder="E-commerce Platform"
              />
            </div>
            <div className="form-group">
              <label>Technologies *</label>
              <input
                type="text"
                value={proj.technologies}
                onChange={(e) => handleChange(proj.id, 'technologies', e.target.value)}
                placeholder="React, Node.js, PostgreSQL"
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Description *</label>
            <textarea
              value={proj.description}
              onChange={(e) => handleChange(proj.id, 'description', e.target.value)}
              placeholder="Describe what you built and the impact..."
              rows={3}
            />
          </div>

          <div className="form-group full-width">
            <label>Link</label>
            <input
              type="url"
              value={proj.link}
              onChange={(e) => handleChange(proj.id, 'link', e.target.value)}
              placeholder="https://github.com/..."
            />
          </div>
        </div>
      ))}

      <button className="btn-add-card" onClick={addProject}>
        + Add Project
      </button>
    </div>
  );
};
