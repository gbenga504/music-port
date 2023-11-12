import path from "node:path";

import dotenv from "dotenv";
import { TestEnvironment } from "jest-environment-node";

dotenv.config({
  path: path.join(__dirname, "../.test.env"),
});

class CustomEnvironment extends TestEnvironment {
  constructor(config, context) {
    super(config, context);
  }
}

export default CustomEnvironment;
