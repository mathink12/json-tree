module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleNameMapper: {
    '^@pkgs/(.*)$': '<rootDir>/packages/$1'
  }
  // setupFiles: [
  //   './jest/setup.js'
  // ]
}
