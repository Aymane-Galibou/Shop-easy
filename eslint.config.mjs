module.exports = {
  root: true,
  extends: [
    "next/core-web-vitals",
    "next",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // Disable explicit any errors globally
    "@typescript-eslint/no-explicit-any": "off",
    
    // Disable react hooks exhaustive deps warnings globally
    "react-hooks/exhaustive-deps": "off",
    
    // You can add more rules here to disable or customize
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
