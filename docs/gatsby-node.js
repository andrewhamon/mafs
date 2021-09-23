/* eslint-disable */
const path = require("path")
const ReactDocgenTypescriptPlugin = require("react-docgen-typescript-plugin").default

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      alias: {
        "react-dom": "@hot-loader/react-dom",
        mafs: path.resolve(__dirname, "../src"),
      },
      fallback: {
        path: require.resolve("path-browserify"),
      },
    },
    plugins: [
      new ReactDocgenTypescriptPlugin({
        include: [
          path.resolve(__dirname, "../src/**/*.ts"),
          path.resolve(__dirname, "../src/**/*.tsx"),
        ],
      }),
    ],
  })
}
