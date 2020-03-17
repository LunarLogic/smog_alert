module.exports = {
  setupFiles: ["./app/javascript/src/frontend/spec/support/enzyme"],
  roots: ["<rootDir>/app/javascript/src/frontend/spec"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/app/javascript/src/frontend/spec/__mocks__/fileMock.js",
    "\\.(css|scss)$":
      "<rootDir>/app/javascript/src/frontend/spec/__mocks__/styleMock.js"
  }
};
