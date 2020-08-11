import * as React from 'react';
import { useTheme } from '@arc-dls/core/utils/useTheme';

export type TabProps = {
  children?: React.ReactNode | React.ReactNode[],
  tab: string,
};

export const Tab: React.FC<TabProps> = ({children}) => {
  useTheme('/Tabs/Tab.scss');

  return (
    <div className="arc-tab">
      {children}
    </div>
  );
};
