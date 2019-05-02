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

const LANG_ALIASES_MAP = {
  cpp: 'C++',
  cs: 'C#',
};

const SUPPORTED_LANGUAGES = SUPPORTED_LANGUAGES_RAW.map(
  lang => LANG_ALIASES_MAP[lang] || lang
);

const determineLanguage = codeFragment => highlightAuto(codeFragment).language;

export {SUPPORTED_LANGUAGES_RAW, SUPPORTED_LANGUAGES, determineLanguage};
