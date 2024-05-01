
const oracledb = require('oracledb');


class dbConnection {
     constructor() {
        this.oracledb = oracledb;
        this.oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
        this.connection = null;

    }

    async connect() {
         console.log("connection");
        try {
                this.connection = await this.oracledb.getConnection({
                user: "ora_kyu16",
                password: "a70917505",
                connectString: "dbhost.students.cs.ubc.ca:1522/stu",
                    autoCommit: true

            });
            console.log("Connected to database");
            return this.connection;
        } catch (error) {
            console.error("Error connecting to Oracle DB:", error);
            throw error;
        }
    }

    async executeQuery(sql, bindings = []) {
        if (!this.connection) {
            throw new Error('Database connection has not set');
        }
        try {
            return await this.connection.execute(sql, bindings, { autoCommit: true });


        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }

    async executeQueryResult(sql, bindings = []) {
        if (!this.connection) {
            throw new Error('Database connection has not been established');
        }
        try {
            const result = await this.connection.execute(sql, bindings);
            console.log("successful");
            return result.rows;
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }


}
module.exports = dbConnection;
