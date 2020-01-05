import React from 'react';
import { TranslationContext, TranslationFunction } from './TranslationContext';

export type Translations = Record<string, string>;

interface ITranslationProvider {
  data: Translations;
  children: React.Component | React.ReactElement;
}

function translate(key: string, replaces?: { [p: string]: string }): string {
  return key.replace(/\{\{([^}]+)\}\}/gi, (_match, k) => {
    return (replaces || {})[k.trim()] || '';
  });
}

function getTranslationWithValue(
  translations: Translations,
): TranslationFunction {
  return (translationKey: string, values?: Record<string, string>) => {
    return translations[translationKey] === undefined
      ? translationKey
      : translate(translations[translationKey], values);
  };
}

export class TranslationProvider extends React.Component<ITranslationProvider> {
  render() {
    const rawTranslations = this.props.data;

    return (
      <TranslationContext.Provider
        value={getTranslationWithValue(rawTranslations)}
      >
        {this.props.children}
      </TranslationContext.Provider>
    );
  }
}
