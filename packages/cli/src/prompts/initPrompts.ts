import inquirer from 'inquirer';

export interface InitAnswers {
  projectName: string;
  framework: 'expo' | 'react-native';
  language: 'ts' | 'js';
  navigation: boolean;
  state: 'redux' | 'zustand' | 'context' | 'none';
  backend: 'firebase' | 'supabase' | 'custom' | 'none';
  auth: 'jwt' | 'oauth' | 'google' | 'none';
  ui: 'tailwind' | 'nativebase' | 'custom' | 'none';
  installDeps: boolean;
  initGit: boolean;
}

const PROJECT_NAME_RE = /^[a-z][a-z0-9-]*$/;

export async function runInitPrompts(defaultName?: string): Promise<InitAnswers> {
  return inquirer.prompt<InitAnswers>([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name?',
      default: defaultName ?? 'my-rn-app',
      validate: (input: string) =>
        PROJECT_NAME_RE.test(input) ||
        'Use lowercase letters, digits and dashes; must start with a letter.',
    },
    {
      type: 'list',
      name: 'framework',
      message: 'Which framework?',
      choices: [
        { name: 'Expo (recommended)', value: 'expo' },
        { name: 'React Native CLI', value: 'react-native' },
      ],
      default: 'expo',
    },
    {
      type: 'list',
      name: 'language',
      message: 'Language?',
      choices: [
        { name: 'TypeScript (recommended)', value: 'ts' },
        { name: 'JavaScript', value: 'js' },
      ],
      default: 'ts',
    },
    {
      type: 'confirm',
      name: 'navigation',
      message: 'Set up React Navigation?',
      default: true,
    },
    {
      type: 'list',
      name: 'state',
      message: 'State management?',
      choices: [
        { name: 'Zustand (lightweight)', value: 'zustand' },
        { name: 'Redux Toolkit', value: 'redux' },
        { name: 'React Context only', value: 'context' },
        { name: 'None', value: 'none' },
      ],
      default: 'zustand',
    },
    {
      type: 'list',
      name: 'backend',
      message: 'Backend integration?',
      choices: [
        { name: 'Firebase', value: 'firebase' },
        { name: 'Supabase', value: 'supabase' },
        { name: 'Custom REST API', value: 'custom' },
        { name: 'None for now', value: 'none' },
      ],
      default: 'custom',
    },
    {
      type: 'list',
      name: 'auth',
      message: 'Authentication?',
      choices: [
        { name: 'JWT (email/password)', value: 'jwt' },
        { name: 'OAuth providers', value: 'oauth' },
        { name: 'Google Sign-In', value: 'google' },
        { name: 'None', value: 'none' },
      ],
      default: 'jwt',
    },
    {
      type: 'list',
      name: 'ui',
      message: 'UI styling?',
      choices: [
        { name: 'Tailwind (NativeWind)', value: 'tailwind' },
        { name: 'NativeBase', value: 'nativebase' },
        { name: 'Custom theme', value: 'custom' },
        { name: 'None', value: 'none' },
      ],
      default: 'tailwind',
    },
    {
      type: 'confirm',
      name: 'installDeps',
      message: 'Install dependencies now?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'initGit',
      message: 'Initialize a fresh git repository?',
      default: true,
    },
  ]);
}
