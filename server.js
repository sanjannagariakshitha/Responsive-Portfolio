const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Nodemailer transporter
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sanjannagari23@gmail.com', // Replace with your email
        pass: 'A8790@897' // Replace with your app-specific password
    }
});

// Route to handle form submissions
app.post('/send-email', (req, res) => {
    const { name, email, subject, phone, message } = req.body;

    // Email options
    let mailOptions = {
        from: email,
        to: 'sanjannagari23@gmail.com', // Replace with your email
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('There was an error sending your message. Please try again.');
        }
        console.log('Email sent:', info.response);
        res.status(200).send('Message sent successfully!');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

