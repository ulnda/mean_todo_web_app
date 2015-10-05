exports.config = {
  framework: 'jasmine',
  specs: ['e2e-tests/**/*.js'],
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
  seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.47.1.jar'
}