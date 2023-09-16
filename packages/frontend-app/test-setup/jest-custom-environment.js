const path = require("node:path");

const dotenv = require("dotenv");
const { TestEnvironment } = require("jest-environment-node");

dotenv.config({
  path: path.join(__dirname, "../.test.env"),
});

class CustomEnvironment extends TestEnvironment {
  constructor(config, context) {
    super(config, context);
  }
}

module.exports = CustomEnvironment;
