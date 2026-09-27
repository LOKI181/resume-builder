import { z } from 'zod';

const experienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, 'Company is required'),
  position: z.string().min(1, 'Position is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string(),
  current: z.boolean(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

const educationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, 'Institution is required'),
  degree: z.string().min(1, 'Degree is required'),
  field: z.string().min(1, 'Field of study is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string(),
  gpa: z.string(),
});

const projectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Project name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  technologies: z.string().min(1, 'Technologies are required'),
  link: z.string().url('Invalid URL').or(z.string().length(0)),
});

export const resumeSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    phone: z.string().min(1, 'Phone is required'),
    location: z.string().min(1, 'Location is required'),
    linkedin: z.string(),
    website: z.string(),
    summary: z.string().min(20, 'Summary must be at least 20 characters'),
  }),
  experiences: z.array(experienceSchema).min(1, 'Add at least one experience'),
  education: z.array(educationSchema).min(1, 'Add at least one education'),
  skills: z.array(z.string()).min(1, 'Add at least one skill'),
  projects: z.array(projectSchema),
});

export type ResumeFormData = z.infer<typeof resumeSchema>;

export const STEPS = [
  { id: 'personal', title: 'Personal Info', icon: '👤' },
  { id: 'experience', title: 'Experience', icon: '💼' },
  { id: 'education', title: 'Education', icon: '🎓' },
  { id: 'skills', title: 'Skills', icon: '🛠️' },
  { id: 'projects', title: 'Projects', icon: '🚀' },
  { id: 'preview', title: 'Preview & Export', icon: '📄' },
] as const;
