import React from 'react';
import { useResume, ResumeProvider } from '../context/ResumeContext';
import { STEPS } from '../schema/resumeSchema';
import { PersonalInfoStep } from './steps/PersonalInfoStep';
import { ExperienceStep } from './steps/ExperienceStep';
import { EducationStep } from './steps/EducationStep';
import { SkillsStep } from './steps/SkillsStep';
import { ProjectsStep } from './steps/ProjectsStep';
import { PreviewStep } from './steps/PreviewStep';

const STEP_COMPONENTS = [
  PersonalInfoStep,
  ExperienceStep,
  EducationStep,
  SkillsStep,
  ProjectsStep,
  PreviewStep,
];

const ResumeBuilderInner: React.FC = () => {
  const { currentStep, setStep } = useResume();

  const CurrentStepComponent = STEP_COMPONENTS[currentStep];

  const canGoNext = currentStep < STEPS.length - 1;
  const canGoPrev = currentStep > 0;

  return (
    <div className="resume-builder-app">
      <header className="app-header">
        <h1>ResumeCraft</h1>
        <span className="subtitle">AI-Powered Resume Builder</span>
      </header>

      <div className="builder-layout">
        <nav className="step-nav">
          {STEPS.map((step, index) => (
            <button
              key={step.id}
              className={`step-btn ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
              onClick={() => setStep(index)}
            >
              <span className="step-icon">{step.icon}</span>
              <span className="step-title">{step.title}</span>
              {index < currentStep && <span className="step-check">✓</span>}
            </button>
          ))}
        </nav>

        <main className="step-panel">
          <CurrentStepComponent />

          <div className="step-navigation">
            <button
              className="btn-prev"
              onClick={() => setStep(currentStep - 1)}
              disabled={!canGoPrev}
            >
              Previous
            </button>
            <span className="step-indicator">
              Step {currentStep + 1} of {STEPS.length}
            </span>
            <button
              className="btn-next"
              onClick={() => setStep(currentStep + 1)}
              disabled={!canGoNext}
            >
              {currentStep === STEPS.length - 2 ? 'Preview' : 'Next'}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export const ResumeBuilder: React.FC = () => (
  <ResumeProvider>
    <ResumeBuilderInner />
  </ResumeProvider>
);
