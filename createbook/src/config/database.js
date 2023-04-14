import Sequelize from "sequelize";

const sequelize = new Sequelize(
  "mysql://root:password@mysql_server:3306/node_rabbitmq"
);

try {
  sequelize.authenticate();
  console.log("Database connected successfully");
} catch (error) {
  console.log("Unable to connect to database: " + error.message);
}

export default sequelize;
