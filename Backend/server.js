const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require("dotenv").config();


const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const brevoApiKey = process.env.BrevoKey; // Replace with your Brevo API key

app.use(cors());

function generateOTP() {
    // Generate a random 6-digit number
    const otp = Math.floor(100000 + Math.random() * 900000);
  
    return otp.toString();
  }
  
  const OTPApp=require('./WorkApp')
app.use(OTPApp)



app.post('/send-email', async (req, res) => {
  const { sender, to, subject, htmlContent } = req.body;

  const headers = {
    'accept': 'application/json',
    'api-key': brevoApiKey,
    'content-type': 'application/json',
  };

  const data = {
    sender,
    to,
    subject,
    htmlContent,
  };

  try {
    const response = await axios.post('https://api.brevo.com/v3/smtp/email', data, { headers });
    console.log('Email sent successfully:', response.data);
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error.response?.data || error.message);
    res.status(500).json({ success: false, message: 'Error sending email' });
  }
});

app.post('/login', (req, res) => {
  // Handle login logic, validate credentials, etc.

  // Assuming login is successful, send an email
  const OTP=generateOTP();
  
  const emailData = {
    sender: {
      name: 'Superset',
      email: 'dep24.p12@gmail.com',
    },
    to: [
      {
        email: req.body.email
      },
    ],
    
    subject: 'OTP Verification',
    htmlContent :`
<html>
    <head></head>
    <body>
      <p>Hello,</p>
      <p>Your One-Time Password (OTP) for verification is: ${OTP}.</p>
      
    </body>
  </html>
`
  };

  // Send the email
  axios.post('http://localhost:3000/send-email', emailData)
    .then(response => console.log('Email sent:', response.data))
    .catch(error => console.error('Error sending email:', error.response?.data || error.message));

  res.json({ success: true, message: 'OTP Send successful',OTP });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
