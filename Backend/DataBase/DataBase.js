const { Pool } = require('pg');
require('dotenv').config();

const DB = {
  isConnected: false,
  client: null,

  async connect() {
    try {
      const connectionString = process.env.DBString;
      const pool = new Pool({
        connectionString: connectionString,
        ssl: {
          rejectUnauthorized: false
        }
      });

      this.client = await pool.connect();
      this.isConnected = true;
      console.log('Connected to the database!');
    } catch (error) {
      console.error('Error connecting to the database:', error);
      throw error;
    }
  },

  async disconnect() {
    try {
      if (this.isConnected) {
        await this.client.release();
        this.isConnected = false;
        console.log('Disconnected from the database!');
      }
    } catch (error) {
      console.error('Error disconnecting from the database:', error);
      throw error;
    }
  },

  async runQuery(query) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }

      const result = await this.client.query(query);
      return { result: result.rows, error: null };
    } catch (error) {
      console.error('Error running query:', error);
      return { result: null, error: error };
    }
  }
};

// Establish the database connection on module load
DB.connect();

const createStudentTable = `create table Students(
  email text,
  data text
)`;

const createStudentTableApp = `create table StudentsApp(
  email text,
  data text
)`;

async function main() {
  let query = `delete from Students`;
  let result = await DB.runQuery(createStudentTableApp);
  console.log(result);
}

// main();

module.exports = DB;
