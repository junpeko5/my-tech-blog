"use strict"

require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
    target: "esnext",
  },
})

require("./src/__generated__/gatsby-types")

module.exports = require('./gatsby-config.ts')