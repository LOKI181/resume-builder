import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';

const SUGGESTED_SKILLS = [
  'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python',
  'SQL', 'Git', 'Docker', 'AWS', 'REST APIs',
  'GraphQL', 'HTML/CSS', 'Java', 'C++', 'Go',
  'Machine Learning', 'Agile', 'CI/CD', 'Linux', 'Kubernetes',
];

export const SkillsStep: React.FC = () => {
  const { data, addSkill, removeSkill } = useResume();
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() && !data.skills.includes(newSkill.trim())) {
      addSkill(newSkill.trim());
      setNewSkill('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const suggestedSkills = SUGGESTED_SKILLS.filter(
    (s) => !data.skills.includes(s)
  ).slice(0, 10);

  return (
    <div className="step-content">
      <h2>Skills</h2>
      <p className="step-description">Add your technical and soft skills.</p>

      <div className="skill-input-group">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a skill and press Enter"
        />
        <button className="btn-add-skill" onClick={handleAddSkill}>
          Add
        </button>
      </div>

      {data.skills.length > 0 && (
        <div className="skills-container">
          {data.skills.map((skill) => (
            <span key={skill} className="skill-tag">
              {skill}
              <button className="skill-remove" onClick={() => removeSkill(skill)}>
                x
              </button>
            </span>
          ))}
        </div>
      )}

      {suggestedSkills.length > 0 && (
        <div className="suggested-skills">
          <h4>Suggested Skills</h4>
          <div className="suggested-list">
            {suggestedSkills.map((skill) => (
              <button
                key={skill}
                className="suggested-tag"
                onClick={() => addSkill(skill)}
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
