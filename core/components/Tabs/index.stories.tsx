import * as React from 'react';
import Tabs from './index';

export default { title: 'Tabs' };

export const defaultState = () => (
  <Tabs>
    <Tabs.Tab tab="title">
      <div>tab content 1</div>
    </Tabs.Tab>
    <Tabs.Tab tab="title 2">
      <div>tab content 2</div>
    </Tabs.Tab>
    <Tabs.Tab tab="title 3">
      tab content 3
    </Tabs.Tab>
  </Tabs>
);