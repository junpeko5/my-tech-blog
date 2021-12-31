module.exports = {
  globals: {
    __PATH_PREFIX__: true
  },
  extends: ["airbnb", "prettier", "react-app"],
  plugins: ["react", "jsx-a11y", "import"],
  rules: {
    "react/prefer-stateless-function": "off",
    "react/prop-types": "off",
    "react/no-danger": "off",
    "jsx-a11y/anchor-is-valid": [
      "error", {
        "components": [ "Link" ],
        "specialLink": [ "hrefLeft", "hrefRight", "to" ],
        "aspects": [ "noHref", "invalidHref", "preferButton" ]
      }
    ]
  },
  settings: {
    "import/core-modules": []
  },
  env: {
    browser: true
  }
}
