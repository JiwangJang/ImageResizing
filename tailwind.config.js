/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./view/**"],
  theme: {
    extend: {
      width: {
        ContentWidth: "1056px",
        WhatIdo: "300px",
      },
      height: {
        WhatIdo: "300px",
        EXPToolTip: "65px",
      },
      fontFamily: {
        "en-title": "en-title",
        "en-article": "en-article",
        "en-button": "en-button",
        "en-level": "en-level",
        "en-share": "en-share",
        //
        "ko-title": "ko-title",
        "ko-article": "ko-article",
        "ko-button": "ko-button",
        "ko-level": "ko-level",
        "ko-share": "ko-share",
      },
      fontSize: {
        article: "30px",
        "article-ko": "28px",
        "70px": "70px",
        "42px": "42px",
      },
    },
  },
  plugins: [],
};
