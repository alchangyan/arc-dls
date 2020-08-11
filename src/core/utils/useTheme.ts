import * as React from 'react';
import ThemeContext from '@arc-dls/core/ThemeContext';

export const useTheme = (componentPath: string) => {
  const theme = React.useContext(ThemeContext);

  React.useEffect(() => {
    try {
      if (theme !== 'custom') {
        import(`@arc-dls/themes/${theme}${componentPath}`);
      }
    } catch (err) {
      console.log(
        'Not able to import styles. Please check is installed current theme.',
        err,
      );
    }
  }, [theme, componentPath]);
};
