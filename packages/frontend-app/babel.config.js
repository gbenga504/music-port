module.exports = (api) => {
  api.cache.forever();

  return {
    presets: ["@babel/typescript", "@babel/preset-env"],
    plugins: [
      "@babel/proposal-class-properties",
      "@loadable/babel-plugin",
      "@babel/plugin-transform-react-jsx",
      "@babel/plugin-transform-react-display-name",
    ],
    env: {
      node: {
        plugins: [
          [
            "babel-plugin-transform-require-ignore",
            {
              extensions: [".css", ".scss"],
            },
          ],
        ],
      },
    },
  };
};
