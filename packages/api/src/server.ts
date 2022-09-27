import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

import app from "./app";

mongoose.connect(process.env.MONGODB_URI!);
const database = mongoose.connection;

database.on("error", function (error) {
  console.log(error);
});

database.on("connected", function () {
  console.log("Database connected");
});

app.listen(process.env.NODE_DOCKER_PORT, function () {
  console.log(`API is listening on port:  ${process.env.NODE_DOCKER_PORT}
    API base URL:     http://localhost:${process.env.NODE_DOCKER_PORT}/api/v1
    Debug URL:        http://localhost:${process.env.NODE_DOCKER_PORT}/api/v1/debug
    GraphQL base URL: http://localhost:${process.env.NODE_DOCKER_PORT}/api/v1/graphql
  `);
});
