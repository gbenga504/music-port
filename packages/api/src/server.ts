import * as dotenv from "dotenv";
dotenv.config();

import app from "./app";

app.listen(process.env.PORT, function () {
  console.log(`API is listening on port:  ${process.env.PORT}
    API base URL:     http://localhost:${process.env.PORT}/api/v1
    Debug URL:        http://localhost:${process.env.PORT}/api/v1/debug
    GraphQL base URL: http://localhost:${process.env.PORT}/api/v1/graphql
  `);
});
