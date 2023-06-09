import React from 'react';
import ReactDOM from 'react-dom';
import { webPackageBanner } from '@soundslikeodd/package-banner';
import standard from 'figlet/importable-fonts/Standard'; // eslint-disable-line  import/no-unresolved
import packageJson from '../package.json';
import Memory from './Memory';

webPackageBanner({
  packageJson,
  capitalCase: true,
  breakOnWord: true,
  figletFontFileData: standard,
  additionalPackageInfo: [
    'description',
    'author',
    'license',
  ],
});

ReactDOM.render(
  <Memory />,
  document.getElementById('appRoot'),
);
