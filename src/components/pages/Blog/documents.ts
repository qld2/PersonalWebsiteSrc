import React from 'react';

import Resume from 'resources/documents/Resume.pdf';
import DARS from 'resources/documents/UnofficialTranscriptRedacted.pdf';

export type Document = {
  key: string,
  title: string,
  src: string
};

const documents: Document[] = [
  {
    key: '0',
    title: 'Resume',
    src: Resume,
  }, {
    key: '1',
    title: 'Unofficial Transcript',
    src: DARS,
  },
];

export default documents;
