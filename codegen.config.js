import dotenv from "dotenv";
// import { API_BASE_URL } from "./src/utils/endpoints";
dotenv.config();
/** @type {{ [key:string]: import('orval').Options}} */

export default {
  modern: {
    input: `http://thecodesource.net/moderncommune/swagger/v1/swagger.json`,
    output: {
      target: "./src/api",
      clean: true,
      prettier: true,
      tslint: true,
      override: {
        mutator: {
          path: "./src/utils/mutator.ts",
          name: "mutator",
        },
      },
    },
  },
};
