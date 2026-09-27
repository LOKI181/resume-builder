import React, { createContext, useContext, useReducer, useCallback } from 'react';
import type { ResumeFormData } from '../schema/resumeSchema';
import { v4 as uuidv4 } from 'uuid';

interface ResumeState {
  data: ResumeFormData;
  currentStep: number;
  aiLoading: boolean;
  aiError: string | null;
}

type ResumeAction =
  | { type: 'SET_STEP'; step: number }
  | { type: 'UPDATE_DATA'; data: Partial<ResumeFormData> }
  | { type: 'ADD_EXPERIENCE' }
  | { type: 'REMOVE_EXPERIENCE'; id: string }
  | { type: 'ADD_EDUCATION' }
  | { type: 'REMOVE_EDUCATION'; id: string }
  | { type: 'ADD_PROJECT' }
  | { type: 'REMOVE_PROJECT'; id: string }
  | { type: 'ADD_SKILL'; skill: string }
  | { type: 'REMOVE_SKILL'; skill: string }
  | { type: 'AI_LOADING' }
  | { type: 'AI_SUCCESS'; data: Partial<ResumeFormData> }
  | { type: 'AI_ERROR'; error: string }
  | { type: 'RESET' };

const initialData: ResumeFormData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: '',
  },
  experiences: [],
  education: [],
  skills: [],
  projects: [],
};

const initialState: ResumeState = {
  data: initialData,
  currentStep: 0,
  aiLoading: false,
  aiError: null,
};

function resumeReducer(state: ResumeState, action: ResumeAction): ResumeState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.step };
    case 'UPDATE_DATA':
      return { ...state, data: { ...state.data, ...action.data } };
    case 'ADD_EXPERIENCE':
      return {
        ...state,
        data: {
          ...state.data,
          experiences: [
            ...state.data.experiences,
            {
              id: uuidv4(),
              company: '',
              position: '',
              startDate: '',
              endDate: '',
              current: false,
              description: '',
            },
          ],
        },
      };
    case 'REMOVE_EXPERIENCE':
      return {
        ...state,
        data: {
          ...state.data,
          experiences: state.data.experiences.filter((e) => e.id !== action.id),
        },
      };
    case 'ADD_EDUCATION':
      return {
        ...state,
        data: {
          ...state.data,
          education: [
            ...state.data.education,
            {
              id: uuidv4(),
              institution: '',
              degree: '',
              field: '',
              startDate: '',
              endDate: '',
              gpa: '',
            },
          ],
        },
      };
    case 'REMOVE_EDUCATION':
      return {
        ...state,
        data: {
          ...state.data,
          education: state.data.education.filter((e) => e.id !== action.id),
        },
      };
    case 'ADD_PROJECT':
      return {
        ...state,
        data: {
          ...state.data,
          projects: [
            ...state.data.projects,
            { id: uuidv4(), name: '', description: '', technologies: '', link: '' },
          ],
        },
      };
    case 'REMOVE_PROJECT':
      return {
        ...state,
        data: {
          ...state.data,
          projects: state.data.projects.filter((p) => p.id !== action.id),
        },
      };
    case 'ADD_SKILL':
      return {
        ...state,
        data: {
          ...state.data,
          skills: [...state.data.skills, action.skill],
        },
      };
    case 'REMOVE_SKILL':
      return {
        ...state,
        data: {
          ...state.data,
          skills: state.data.skills.filter((s) => s !== action.skill),
        },
      };
    case 'AI_LOADING':
      return { ...state, aiLoading: true, aiError: null };
    case 'AI_SUCCESS':
      return {
        ...state,
        aiLoading: false,
        data: {
          ...state.data,
          ...action.data,
          personalInfo: { ...state.data.personalInfo, ...action.data.personalInfo },
        },
      };
    case 'AI_ERROR':
      return { ...state, aiLoading: false, aiError: action.error };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

interface ResumeContextType extends ResumeState {
  setStep: (step: number) => void;
  updateData: (data: Partial<ResumeFormData>) => void;
  addExperience: () => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  removeEducation: (id: string) => void;
  addProject: () => void;
  removeProject: (id: string) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  generateWithAI: (jobDescription: string) => Promise<void>;
  reset: () => void;
}

const ResumeContext = createContext<ResumeContextType | null>(null);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  const setStep = useCallback((step: number) => dispatch({ type: 'SET_STEP', step }), []);
  const updateData = useCallback((data: Partial<ResumeFormData>) => dispatch({ type: 'UPDATE_DATA', data }), []);
  const addExperience = useCallback(() => dispatch({ type: 'ADD_EXPERIENCE' }), []);
  const removeExperience = useCallback((id: string) => dispatch({ type: 'REMOVE_EXPERIENCE', id }), []);
  const addEducation = useCallback(() => dispatch({ type: 'ADD_EDUCATION' }), []);
  const removeEducation = useCallback((id: string) => dispatch({ type: 'REMOVE_EDUCATION', id }), []);
  const addProject = useCallback(() => dispatch({ type: 'ADD_PROJECT' }), []);
  const removeProject = useCallback((id: string) => dispatch({ type: 'REMOVE_PROJECT', id }), []);
  const addSkill = useCallback((skill: string) => dispatch({ type: 'ADD_SKILL', skill }), []);
  const removeSkill = useCallback((skill: string) => dispatch({ type: 'REMOVE_SKILL', skill }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  const generateWithAI = useCallback(
    async (jobDescription: string) => {
      dispatch({ type: 'AI_LOADING' });

      // Simulate AI processing with smart defaults
      await new Promise((resolve) => setTimeout(resolve, 2000));

      try {
        // Extract keywords from job description
        const keywords = jobDescription
          .toLowerCase()
          .split(/\s+/)
          .filter((word) => word.length > 4)
          .slice(0, 10);

        const aiGenerated = {
          personalInfo: {
            ...state.data.personalInfo,
            summary: `Results-driven professional with expertise in ${keywords.slice(0, 3).join(', ')}. ` +
              `Proven track record of delivering high-quality solutions and collaborating with cross-functional teams. ` +
              `Passionate about ${keywords.slice(3, 6).join(' and ')}.`,
          },
          skills: [
            ...new Set([
              ...state.data.skills,
              ...keywords.map((k) => k.charAt(0).toUpperCase() + k.slice(1)),
            ]),
          ].slice(0, 15),
        };

        dispatch({ type: 'AI_SUCCESS', data: aiGenerated });
      } catch {
        dispatch({ type: 'AI_ERROR', error: 'Failed to generate resume. Please try again.' });
      }
    },
    [state.data.personalInfo, state.data.skills]
  );

  return (
    <ResumeContext.Provider
      value={{
        ...state,
        setStep,
        updateData,
        addExperience,
        removeExperience,
        addEducation,
        removeEducation,
        addProject,
        removeProject,
        addSkill,
        removeSkill,
        generateWithAI,
        reset,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) throw new Error('useResume must be used within ResumeProvider');
  return context;
}
