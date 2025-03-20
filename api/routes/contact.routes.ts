import { Router } from 'express';
import { handleError } from '../utils/error.utils';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const router = Router();

// Contact form submission endpoint
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });
    
    // Send email
    await transporter.sendMail({
      from: `"msport.lv" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });
    
    // Log the contact submission to file
    const logsDir = path.join(process.cwd(), 'logs');
    const timestamp = new Date().toISOString();
    const contactDetails = {
      timestamp,
      name,
      email,
      message: message.substring(0, 100) + (message.length > 100 ? '...' : '')
    };

    // Ensure logs directory exists
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    // Append to contacts log file
    fs.appendFileSync(
      path.join(logsDir, 'contacts.log'),
      JSON.stringify(contactDetails) + '\n'
    );

    res.status(200).json({ success: true, message: 'Message received' });
  } catch (err) {
    handleError(res, err, 'Failed to process contact form submission');
  }
});

export default router;