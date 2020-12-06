const mysql = require("mysql");
const dontenv = require("dotenv");
let instance = null;
dontenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("db " + connection.state);
});

class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM `to-do`;";

        connection.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      //   console.log(respone);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async insertNewName(name) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query = "INSERT INTO to-do (name) VALUES (?,?);";

        connection.query(query, [name], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.insertId);
        });
      });
      //   console.log(insertId);
      return insertId;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = DbService;
