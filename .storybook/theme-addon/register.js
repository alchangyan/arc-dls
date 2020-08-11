import React, { useState } from 'react';
import { addons } from '@storybook/addons';
import { useAddonState } from '@storybook/api';
// import { useAddonState } from '@storybook/client-api'; 
import { STORY_CHANGED } from '@storybook/core-events';
import { AddonPanel } from '@storybook/components';
// import ThemeContext from '../../../src/core/ThemeContext/ThemeContext';

export const MyPanel = () => {
  const [state, setState] = useAddonState('themeAddon', 'initial state');
  
  return (
    <button onClick={() => setState('a new value')}>
      the state = "{state}"
    </button>
  );
  }

// Register the addon with a unique name.
addons.register('theme-addon', api => {
  addons.addPanel('theme-addon', {
    title: 'Theme',
    render: ({ active, key }) => (
      <AddonPanel key={key} active={active}>
        <MyPanel api={api} />
      </AddonPanel>
    ),
  });
});
