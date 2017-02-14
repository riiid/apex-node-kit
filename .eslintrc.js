module.exports = {
  "parser": "babel-eslint",
  "plugins": ["react"],
  "extends": ["google", "plugin:react/recommended"],
  "installedESLint": true,
  "env": {
    "node": true,
    "jest": true
  },
  "rules": {
    "camelcase": 0,
    "require-jsdoc": 0,
    "comma-dangle": [2, "never"],
    "arrow-parens": [2, "as-needed"],
    "react/jsx-uses-react": 1
  }
};
