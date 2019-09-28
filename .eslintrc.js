module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": 0,
    "no-debugger": 0,
    "no-undef": 0
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
