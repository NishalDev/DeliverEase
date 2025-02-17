// Import necessary globals and plugins
import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

export default [
  {
    // Apply this configuration to all JavaScript and JSX files
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      // Enable browser globals (window, document, etc.)
      globals: {
        ...globals.browser, // This enables global variables available in the browser
        ...globals.node,    // This enables global variables available in Node.js
      },
    },
    plugins: {
      js: pluginJs,           // Enable ESLint's recommended JavaScript rules
      react: pluginReact,     // Enable React-specific rules
    },
    rules: {
      // Add any custom rules or override defaults if needed
      'no-unused-vars': 'warn',        // Warn on unused variables
      'react/react-in-jsx-scope': 'off', // Disable 'React must be in scope' for React 17+
      'react/prop-types': 'off',       // Disable prop-types validation if using TypeScript or no prop-types
    },
  },
  pluginJs.configs.recommended,         // Use ESLint's recommended rules for JS
  pluginReact.configs.flat.recommended, // Use flat-config recommended rules for React
];
