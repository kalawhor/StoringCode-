const express = require("express");
const { google } = require("googleapis");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
const port = 5500;
const id = "1QLdUDkbg1_JYIYHA685lTD6GjfYQaahh7bhnydGQooU";

app.listen(port, () => console.log(`Listening on port ${port}`));
xa

function intervalFunc() {
//This allows us to parse the incoming request body as JSON
app.use(express.json());

// With this, we'll listen for the server on port 5500
async function authSheets() {
    const auth = new google.auth.GoogleAuth({
      keyFile: "keys.json",
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  
    //Create client instance for auth
    const authClient = await auth.getClient();
  
    //Instance of the Sheets API
    const sheets = google.sheets({ version: "v4", auth: authClient });
  
    return {
      auth,
      authClient,
      sheets,
    };
  }


    app.get("/", async (req, res) => {
    const { sheets } = await authSheets();

    // Read rows from spreadsheet
    const getRows = await sheets.spreadsheets.values.get({
      spreadsheetId: id,
      range: "Data!A1:D5",
    });
    const tableData = getRows.data.values;
    res.sendFile(__dirname + "/website.html");

    app.get('/jsondata', (req, res) => {
      res.send(tableData);
      console.log(tableData);
        });
    })
  }

  intervalFunc();
  setInterval(intervalFunc, 10000);
