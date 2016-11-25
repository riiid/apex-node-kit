module.exports = {
  "parser": "babel-eslint",
  "extends": "google",
  "installedESLint": true,
  "env": {
    "node": true,
    "jest": true
  },
  "rules": {
    "camelcase": 0,
    "comma-dangle": [2, "never"],
    "arrow-parens": [2, "as-needed"]
  }
};
