import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';

export const PreviewStep: React.FC = () => {
  const { data, generateWithAI, aiLoading, aiError } = useResume();
  const [jobDescription, setJobDescription] = useState('');
  const [showAI, setShowAI] = useState(false);

  const handleGenerate = () => {
    if (jobDescription.trim()) {
      generateWithAI(jobDescription);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="step-content preview-step">
      <div className="preview-header">
        <h2>Resume Preview</h2>
        <div className="preview-actions">
          <button className="btn-ai" onClick={() => setShowAI(!showAI)}>
            {showAI ? 'Close AI' : 'AI Enhance'}
          </button>
          <button className="btn-print" onClick={handlePrint}>
            Print / PDF
          </button>
        </div>
      </div>

      {showAI && (
        <div className="ai-panel">
          <h3>AI Resume Enhancer</h3>
          <p>Paste a job description and AI will optimize your resume for it.</p>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            rows={5}
          />
          <button
            className="btn-generate"
            onClick={handleGenerate}
            disabled={aiLoading || !jobDescription.trim()}
          >
            {aiLoading ? 'Generating...' : 'Generate Optimized Content'}
          </button>
          {aiError && <p className="ai-error">{aiError}</p>}
        </div>
      )}

      <div className="resume-preview" id="resume-preview">
        <div className="resume-paper">
          {/* Header */}
          <div className="resume-header">
            <h1>{data.personalInfo.fullName || 'Your Name'}</h1>
            <div className="contact-row">
              {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
              {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
              {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
            </div>
            <div className="contact-row">
              {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
              {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
            </div>
          </div>

          {/* Summary */}
          {data.personalInfo.summary && (
            <div className="resume-section">
              <h2>Professional Summary</h2>
              <p>{data.personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experiences.length > 0 && (
            <div className="resume-section">
              <h2>Work Experience</h2>
              {data.experiences.map((exp) => (
                <div key={exp.id} className="resume-item">
                  <div className="item-header">
                    <div>
                      <strong>{exp.position}</strong>
                      <span className="company"> at {exp.company}</span>
                    </div>
                    <span className="date">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="item-description">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div className="resume-section">
              <h2>Education</h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="resume-item">
                  <div className="item-header">
                    <div>
                      <strong>{edu.degree} in {edu.field}</strong>
                      <span className="company"> - {edu.institution}</span>
                    </div>
                    <span className="date">
                      {edu.startDate} - {edu.endDate || 'Present'}
                    </span>
                  </div>
                  {edu.gpa && <p>GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="resume-section">
              <h2>Skills</h2>
              <div className="resume-skills">
                {data.skills.map((skill) => (
                  <span key={skill} className="resume-skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div className="resume-section">
              <h2>Projects</h2>
              {data.projects.map((proj) => (
                <div key={proj.id} className="resume-item">
                  <div className="item-header">
                    <strong>{proj.name}</strong>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="project-link">
                        View Project
                      </a>
                    )}
                  </div>
                  <p className="item-tech">{proj.technologies}</p>
                  <p className="item-description">{proj.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
