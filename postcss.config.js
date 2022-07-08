module.exports = {
   plugins: [
      require("postcss-import-ext-glob"),
      require("postcss-import"),
      require("autoprefixer"),
      require("cssnano"),
      require("postcss-preset-env")({stage: 1}),
      require("postcss-nesting"),
      require("tailwindcss/nesting"),
      require("tailwindcss")
   ]
}