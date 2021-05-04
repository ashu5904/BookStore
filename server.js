const express = require('express');

const app = express();

app.listen(3001, (req, res) => {
    console.log("Server Listening at port 3001");
})