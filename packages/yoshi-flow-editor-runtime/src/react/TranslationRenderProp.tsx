import React from 'react';
import { TranslationContext, TranslationFunction } from './TranslationContext';

interface ITranslation {
  children: (translate: TranslationFunction) => React.ReactNode;
}

export class Translation extends React.Component<ITranslation> {
  render() {
    return (
      <TranslationContext.Consumer>
        {translate => this.props.children(translate as TranslationFunction)}
      </TranslationContext.Consumer>
    );
  }
}
