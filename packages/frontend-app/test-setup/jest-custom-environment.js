const { TestEnvironment } = require("jest-environment-node");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.join(__dirname, ".env"),
});

class CustomEnvironment extends TestEnvironment {
  constructor(config, context) {
    super(config, context);
  }
}

module.exports = CustomEnvironment;
