import * as React from 'react';
import * as arcConfig from '../../../../arc.config.json';
const { theme } = arcConfig;
async () => await import (`../../../styles/${theme}/Tab.scss`);

export type TabProps = {
  children?: React.ReactNode | React.ReactNode[],
  tab: string,
};

export const Tab: React.FC<TabProps> = ({children}) => {
  return (
    <div className="arc-tab">
      {children}
    </div>
  );
};
