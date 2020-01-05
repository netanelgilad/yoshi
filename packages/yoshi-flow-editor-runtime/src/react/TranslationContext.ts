import { createContext } from 'react';

export type TranslationFunction = (
  key: string,
  values?: Record<string, string>,
  fallback?: string,
) => string;

export const TranslationContext = createContext<TranslationFunction | null>(
  null,
);
