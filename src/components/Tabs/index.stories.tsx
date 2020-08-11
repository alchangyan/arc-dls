import * as React from 'react';
import Tabs from './index';

const Tab = Tabs.Tab;

export default { title: 'Tabs' };

export const defaultState = () => (
  <Tabs>
    <Tab tab="Tab 1">
      <div>Tab 1</div>
    </Tab>
    <Tab tab="Tab 2">
      <div>Tab 2</div>
    </Tab>
    <Tab tab="Tab 3">
      Tab 3
    </Tab>
  </Tabs>
);