const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const app = express();
const DB_path = path.join(__dirname, "cricketTeam.db");

app.use(express.json());

let DB = null;

const initializeDBAndServer = async () => {
  try {
    DB = await open({
      filename: DB_path,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("The server running at http://localhost/3000/");
    });
  } catch (e) {
    console.log(`DB error : ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

//return all players
app.get("/players/", async () => {
  const getPlayersQuery = `
    SELECT * FROM cricket_team;`;
  const playersArray = await DB.(getPlayersQuery);
  Response.send(playersArray);
});
