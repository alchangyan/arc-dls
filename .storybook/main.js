const path = require('path');
module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('awesome-typescript-loader'),
        },
        {
          loader: require.resolve('react-docgen-typescript-loader'),
        },
      ],
    });

    config.module.rules.push({
      resolve: {
        alias: {
          '@arc-dls/theme-default': path.resolve(__dirname, './src/themes/theme-default'),
        }
      }
    });
    
    config.module.rules.push({
      test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader",
          }
        ],
        include: path.resolve(__dirname, "../")
    })

    config.resolve.extensions.push(".ts", ".tsx");

    return config;
  }
};
