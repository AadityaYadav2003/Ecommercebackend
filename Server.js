const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

const userRoute = require('./routes/index')
app.use('/user', userRoute)

app.get('/', function (req, res) {
    res.send('Frist Api');
});
app.listen(4545, () => console.log("Server Statred"))