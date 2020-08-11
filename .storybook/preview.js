import React, { useState, useEffect } from 'react';
import { addDecorator } from '@storybook/react';
import { useStorybookState } from '@storybook/api';
import ThemeContext from '../src/core/ThemeContext';

addDecorator(storyFn => {
  const state = useStorybookState();

  useEffect(() => {
    console.log('state: ', state)
  }, [state])
  // if (sb) {
  //   sb.api.on('theme-changed', (a,b,c) => {
  //     console.log('theme-changed: ', a,b,c);
  //   })
  // }
  return (
    <ThemeContext.Provider value={'default'}>{storyFn()}</ThemeContext.Provider>
  );
});
