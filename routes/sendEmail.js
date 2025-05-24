const nodemailer = require('nodemailer');

// Generate a 6-digit OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send email with OTP
async function sendOtpEmail(toEmail) {
    const otp = generateOTP();

    // Create transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or use 'smtp.ethereal.email' for testing
        auth: {
            user: 'princejebastin27@gmail.com',
            pass: 'isnf qbtz rlcf bxjq'
        }
    });

    // OTP email content
  const htmlContent = `
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>OTP Sent</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          background: url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1350&q=80') no-repeat center center fixed;
          background-size: cover;
          font-family: Arial, sans-serif;
          color: #fff;
        }
        .container {
          background-color: rgba(0, 0, 0, 0.7);
          width: 100%;
          max-width: 400px;
          margin: 100px auto;
          padding: 40px;
          border-radius: 10px;
          text-align: center;
        }
        .otp-code {
          font-size: 36px;
          font-weight: bold;
          color: #4CAF50;
          margin: 20px 0;
        }
        .message {
          font-size: 18px;
          color: #ccc;
        }
        .success {
          color: #00e676;
          margin-bottom: 20px;
          font-weight: bold;
          font-size: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="success">✅ OTP Sent Successfully</div>
        <h2>Your OTP Code</h2>
        <div class="otp-code">${otp}</div>
        <div class="message">Use this code to verify your identity. It will expire in 5 minutes.</div>
      </div>
    </body>
    </html>
  `;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: 'Your OTP Code',
        html: htmlContent
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return otp;
    } catch (error) {
        return null;
    }
}

sendOtpEmail('princejebastin27@gmail.com');
