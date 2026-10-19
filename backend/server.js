
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const bcrypt = require("bcrypt"); //encrypting passwords
require("dotenv").config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());

// Create a MySQL connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}); 

// Check database connection
app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ success: true, message: "MySQL connected!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Database connection failed" });
  }
});

// Registration 
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body

    if (
      typeof username !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !username.trim() ||
      !email.trim() ||
      !password
    ) {
        // make sure inputs are filled
      return res.status(400).json({
        message: 'Username, email and password are required.'
      })
    }

    if (password.length < 8) {
        // make sure password is at least 8 characters
      return res.status(400).json({
        message: 'Password must be at least 8 characters.'
      })
    }

    const cleanUsername = username.trim()
    const cleanEmail = email.trim()

    // Check whether the username or email is already used
    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE username = ? OR email = ?',
      [cleanUsername, cleanEmail]
    )

    if (existingUsers.length > 0) {
        // Checks if the email and/or username is already registered in the database
      return res.status(409).json({
        message: 'Username or email is already registered.'
      })
    }

    // Never store plain passwords (unencrypted)
    const hashedPassword = await bcrypt.hash(password, 12)

    // New accounts receive the student role (normal register form)
    await pool.execute(
      `INSERT INTO users (username, email, password, role)
       VALUES (?, ?, ?, ?)`,
      [cleanUsername, cleanEmail, hashedPassword, 'student']
    )

    return res.status(201).json({
      success: true,
      message: 'Registration successful!'
    })
  } catch (error) {
    console.error('Registration error:', error.message)

    return res.status(500).json({
      message: 'Something went wrong. Please try again.'
    })
  }
})


// Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        // make sure inputs are filled
        message: "Email and password are required."
      });
    }

    const [users] = await pool.execute(
        // 
      "SELECT id, username, email, password, role FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
        // email and/or password dont match up with database
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    const user = users[0];

    // bcrypt password verification
    const passwordMatches = await bcrypt.compare(
  password,
  user.password
)

if (!passwordMatches) {
    // password doesnt match with the database
  return res.status(401).json({
    message: 'Invalid email or password.'
  })
}

    res.json({
        // login successful, return user info
      success: true,
      message: "Login successful!",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role 
      }
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({
      message: "Something went wrong. Please try again."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
