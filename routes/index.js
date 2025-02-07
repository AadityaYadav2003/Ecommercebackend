const express = require("express");
const router = express.Router();
const mssql = require("mssql");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express()

app.use(bodyParser.json)
app.use(cors())

// config for your database
const config = {
    user: 'vijay_Ecommerce_user',
    password: '7l#92R2uz',
    server: '38.242.197.161',
    database: 'Ecommerce',
    options: {
        encrypt: false,
        enableArithAbort: true,
    },
};

// connect to your database
const pool = new mssql.ConnectionPool(config);
const poolConnect = pool.connect();

poolConnect.then(() => {
    console.log("Connected to database");
}).catch(err => {
    console.error("Connection to database failed:", err);
});

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const request = pool.request();
        const result = await request
            .input('email', mssql.VarChar, email)
            .input('password', mssql.VarChar, password)
            .query('SELECT * FROM usermaster WHERE email = @email AND password = @password');
        if (result.recordset.length > 0) {
            res.status(200).json({ msg: "Login successful" });
        } else {
            res.status(401).json({ msg: "Invalid email or password" });
        }
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ msg: "Login Error Check Credentials" });
    }
});

// Register
router.post("/register", async (req, res) => {
    const { email, mobile, username, dob, password } = req.body;
    try {
        const request = pool.request();
        const result = await request
            .input('email', mssql.VarChar, email)
            .input('mobile', mssql.VarChar, mobile)
            .input('username', mssql.VarChar, username)
            .input('dob', mssql.Date, dob) // Assuming dateOfBirth is in YYYY-MM-DD format
            .input('password', mssql.VarChar, password)
            .query('INSERT INTO usermaster (email, mobile, username, dob, password) VALUES (@email, @mobile, @username, @dob, @password)');
        res.status(200).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({ msg: "Registration Error" });
    }
});

// Product 
router.get("/result", async (req, res) => {
    try {
        const request = pool.request();
        const result = await request.query('Select ProductName,Image,Description,Price,Category from productmaster');
        res.status(200).json({ result: result.recordsets });
    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({ msg: "Registration Error" });
    }
});

// Category
router.get("/category", async (req, res) => {
    try {
        const request = pool.request();
        const result = await request.query('Select categoryname,categoryimage from categorymaster');
        res.status(200).json({ result: result.recordsets });
    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({ msg: "Registration Error" });
    }
});

// profile 
router.post("/profile", async (req, res) => {
    const { email } = req.body;
    try {
        const request = pool.request();
        const result = await request
            .input('email', mssql.VarChar, email)
            .query('Select Image,username,email,mobile from usermaster WHERE email = @email');
        res.status(200).json({ result: result.recordsets });
    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({ msg: "Registration Error" });
    }
});

router.get("/profile", async (req, res) => {

    try {
        const request = pool.request();
        const result = await request
            .query('Select * from usermaster');
        res.status(200).json({ result: result.recordsets });
    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({ msg: "Registration Error" });
    }
});

// Database request for testing 
router.get("/db", async (req, res) => {

    try {
        const request = pool.request();
        const result = await request
            .query('Select * from usermaster');
        res.status(200).json({ result: result.recordsets });
    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({ msg: "Registration Error" });
    }
});

router.post("/forgot", async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    if (!email || !oldPassword || !newPassword) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    try {
        const request = pool.request();
        // First, verify the old password
        const result = await request
            .input('email', mssql.VarChar, email)
            .input('oldPassword', mssql.VarChar, oldPassword)
            .query('SELECT password FROM usermaster WHERE email = @email');

        if (result.recordset.length === 0) {
            return res.status(404).json({ msg: "User not found" });
        }

        const currentPassword = result.recordset[0].password;

        if (currentPassword !== oldPassword) {
            return res.status(400).json({ msg: "Old password is incorrect" });
        }

        // Update the password
        await request
            .input('newPassword', mssql.VarChar, newPassword)
            .query('UPDATE usermaster SET password = @newPassword WHERE email = @email');

        res.status(200).json({ msg: 'Password updated successfully' });
    } catch (err) {
        console.error("Password Update Error:", err);
        res.status(500).json({ msg: "An error occurred, please try again" });
    }
});


module.exports = router;