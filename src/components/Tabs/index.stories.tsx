import * as React from 'react';
import Tabs from './index';

const Tab = Tabs.Tab;

export default { title: 'Tabs' };

export const defaultState = () => (
  <Tabs>
    <Tab tab="TITLE">
      <div>tab content 1</div>
    </Tab>
    <Tab tab="TITLE 2">
      <div>tab content 2</div>
    </Tab>
    <Tab tab="TITLE 3">
      tab content 3
    </Tab>
  </Tabs>
);