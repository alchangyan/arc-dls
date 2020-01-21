import * as React from 'react';

export type TabProps = {
  children?: React.ReactNode | React.ReactNode[],
  theme?: string,
  tab: string,
};

export const Tab: React.FC<TabProps> = ({children, theme}) => {
  React.useMemo(() => {
    theme = theme || 'default';
    import (`@arc-dls/theme-${theme}/Tabs/Tab.css`);
    // import (`../../../themes/theme-${theme}/Tabs/Tab.css`);
  },[theme]);

  return (
    <div className="arc-tab">
      {children}
    </div>
  );
};
