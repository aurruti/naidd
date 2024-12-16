import React from 'react';
import { useTranslation } from 'react-i18next';
import LangButton from './components/lang.js';

export default function App() {
  const t = useTranslation().t;
  return (
    <div>
      <div className="App">
        <h1>{t('construction.title')}</h1>
        <p>{t('construction.subtitle')}</p>
      </div>
      <div>
        <LangButton />
      </div>
    </div>
  );
}


