import plugin from "@carlos-hfc/eslint-plugin"

export default [
  ...plugin.configs.react,
  {
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
]
