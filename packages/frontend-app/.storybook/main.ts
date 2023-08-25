import type { StorybookConfig } from "@storybook/react-webpack5";

import { join, dirname } from "path";

import customConfig from "../webpack.config";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@storybook/addon-interactions"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    //  TODO: Pick some loaders from storybook webpack config as they might be useful
    return {
      ...config,
      module: {
        ...config.module,
        rules: [...customConfig.module.rules],
      },
      plugins: [...(config.plugins || []), ...customConfig.plugins],
    };
  },
};

export default config;
