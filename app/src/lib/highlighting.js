import {highlightAuto} from 'highlight.js';

const SUPPORTED_LANGUAGES_RAW = [
  '1c',
  'bash',
  'c',
  'cpp',
  'cs',
  'css',
  'go',
  'haskell',
  'java',
  'javascript',
  'kotlin',
  'lisp',
  'perl',
  'php',
  'python',
  'ruby',
  'rust',
  'scala',
  'shell',
  'xml',
  'yaml',
];

const LANG_ALIASES_MAP = {
  'cpp': 'C++',
  'cs': 'C#',
};

const langsForHumans = SUPPORTED_LANGUAGES_RAW.map(
  lang => LANG_ALIASES_MAP[lang] || lang
);

const determineLanguage = (codeFragment) => highlightAuto(codeFragment).language;

export {
  SUPPORTED_LANGUAGES_RAW,
  langsForHumans as SUPPORTED_LANGUAGES,
  determineLanguage,
};
