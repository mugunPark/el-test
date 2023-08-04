import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { MakerDeb } from "@electron-forge/maker-deb";
import { MakerRpm } from "@electron-forge/maker-rpm";
import { AutoUnpackNativesPlugin } from "@electron-forge/plugin-auto-unpack-natives";
import { WebpackPlugin } from "@electron-forge/plugin-webpack";

import { mainConfig } from "./webpack.main.config";
import { rendererConfig } from "./webpack.renderer.config";

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({}),
    new MakerZIP({}, ["darwin"]),
    new MakerRpm({}),
    new MakerDeb({}),
  ],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: "./src/index.html",
            js: "./src/renderer.ts",
            name: "main_window",
            preload: {
              js: "./src/preload.ts",
            },
          },
        ],
      },
    }),
  ],
  publishers: [
    // {
    //   name: "@electron-forge/publisher-bitbucket",
    //   platforms: ["darwin"],
    //   config: {
    //     repository: {
    //       owner: "ybrain-software",
    //       name: "electron-publish",
    //     },
    //     auth: {
    //       username: "mugoonpark", // string
    //       appPassword: "ATBBBae2XcGha5DjxBB5jZuc9CzMA01F5CEE", // string
    //     },
    //   },
    // },
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "mugunPark",
          name: "el-test",
        },
        authToken: "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",
        prerelease: true,
      },
    },
  ],
};

export default config;
