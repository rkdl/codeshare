import {highlightAuto} from 'highlight.js';

const SUPPORTED_LANGUAGES_RAW = [
  '1c',
  'c',
  'cpp',
  'cs',
  'css',
  'go',
  'java',
  'javascript',
  'perl',
  'php',
  'python',
  'ruby',
  'scala',
  'shell',
];

const LANGUAGE_ALIASES_MAP = {
  cpp: 'C++',
  cs: 'C#',
};

const determineLanguage = codeFragment => highlightAuto(codeFragment).language;

export {SUPPORTED_LANGUAGES_RAW, LANGUAGE_ALIASES_MAP, determineLanguage};
