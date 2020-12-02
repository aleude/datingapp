//Require node-moduls:
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

//Require classes:

//Setting up server:
const app = express();
const PORT = process.env.PORT || 3800;;

//Use moduls for server:
app.use(bodyParser.json());
app.use(cors()); 





//Opening server:
app.listen(PORT, console.log(`Server has started on ${PORT}`));
