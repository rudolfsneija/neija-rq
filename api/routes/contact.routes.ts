import { Router } from 'express';
import { handleError } from '../utils/error.utils';
// import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';

const router = Router();

// Contact form submission endpoint
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Example: Send an email notification (you'd need to configure nodemailer)
    // const transporter = nodemailer.createTransport({...});
    // await transporter.sendMail({...});
    
    // For now, just log the submission
    console.log('Contact form submission:', { name, email, message });

    // Log the contact submission to file
    const logsDir = path.join(process.cwd(), 'logs');
    const timestamp = new Date().toISOString();
    const contactDetails = {
      timestamp,
      name,
      email,
      message: message.substring(0, 100) + (message.length > 100 ? '...' : '')
    };

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