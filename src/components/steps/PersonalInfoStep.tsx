import React from 'react';
import { useResume } from '../../context/ResumeContext';

export const PersonalInfoStep: React.FC = () => {
  const { data, updateData } = useResume();
  const { personalInfo } = data;

  const handleChange = (field: string, value: string) => {
    updateData({
      personalInfo: { ...personalInfo, [field]: value },
    });
  };

  return (
    <div className="step-content">
      <h2>Personal Information</h2>
      <p className="step-description">Tell us about yourself.</p>

      <div className="form-grid">
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            value={personalInfo.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="John Doe"
          />
        </div>
        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            value={personalInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john@example.com"
          />
        </div>
        <div className="form-group">
          <label>Phone *</label>
          <input
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div className="form-group">
          <label>Location *</label>
          <input
            type="text"
            value={personalInfo.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="San Francisco, CA"
          />
        </div>
        <div className="form-group">
          <label>LinkedIn</label>
          <input
            type="text"
            value={personalInfo.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
        <div className="form-group">
          <label>Website</label>
          <input
            type="text"
            value={personalInfo.website}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="johndoe.com"
          />
        </div>
      </div>

      <div className="form-group full-width">
        <label>Professional Summary *</label>
        <textarea
          value={personalInfo.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="Write a compelling 2-3 sentence summary of your professional background..."
          rows={4}
        />
        <span className="char-count">{personalInfo.summary.length}/500</span>
      </div>
    </div>
  );
};
