import {
  IWidgetControllerConfig,
  IWixWindow,
} from '@wix/native-components-infra/dist/es/src/types/types';
import { Translations } from './react/TranslationProvider';

export interface FrameworkData {
  experimentsPromise: Promise<Record<string, string>>;
  translationsPromise: Promise<Translations>;
}

export interface IMultiLangFields {
  isPrimaryLanguage: boolean;
  locale: string;
  lang: string;
}

function getMultiLangFields(
  multilingual: IWixWindow['multilingual'],
): IMultiLangFields {
  const currentShortLang = multilingual.currentLanguage;
  const currentLang = multilingual.siteLanguages.find(
    lang => lang.languageCode === currentShortLang,
  );
  if (currentLang) {
    return {
      isPrimaryLanguage: currentLang.isPrimaryLanguage,
      lang: currentShortLang,
      locale: currentLang.locale,
    };
  }

  return {
    isPrimaryLanguage: true,
    lang: 'en',
    locale: 'en',
  };
}

// TODO: fix this with glue code
export function getTranslationPath(baseUrl: string, locale: string): string {
  return `${baseUrl}assets/locales/messages_${locale}.json`;
}

async function getTranslations(
  baseUrl: string,
  locale: string,
): Promise<Translations> {
  const translationPath = getTranslationPath(baseUrl, locale);
  return fetch(translationPath, {
    method: 'get',
  })
    .then(response => response.json())
    .catch(e => {
      throw new Error(`Could not fetch ${translationPath}
        original error: ${e.message}`);
    });
}

function fetchTranslations({ appParams, wixCodeApi }: IWidgetControllerConfig) {
  const fields = getMultiLangFields(wixCodeApi.window.multilingual);
  return getTranslations(appParams.baseUrls.staticsBaseUrl, fields.locale);
}

export function fetchFrameworkData(
  controllerConfig: IWidgetControllerConfig,
): FrameworkData {
  // TODO: conduction
  const experimentsPromise = Promise.resolve({
    'specs.AnExperiment': 'true',
  });

  const translationsPromise = fetchTranslations(controllerConfig);
  return { experimentsPromise, translationsPromise };
}
