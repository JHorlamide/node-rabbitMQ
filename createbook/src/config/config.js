import dotenv from "dotenv";
dotenv.config();

export const config = {
  user: "root",
  password: "password",
  databaseName: "node-rabbitmq",
  dialect: "mysql",
  host: "mysqldb",
};
