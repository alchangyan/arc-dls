import * as React from 'react';

export type TabProps = {
  children?: React.ReactNode | React.ReactNode[],
  theme?: string,
  tab: string,
};

export const Tab: React.FC<TabProps> = ({children, theme}) => {
  React.useMemo(() => {
    theme = theme || 'default';
    try {
      if (theme !== 'custom') import (`../../../themes/theme-${theme}/Tabs/Tab.scss`);
    } catch(err) {
      console.log('Not able to import styles. Please check is installed current theme.', err);
    }
  },[theme]);

  return (
    <div className="arc-tab">
      {children}
    </div>
  );
};
