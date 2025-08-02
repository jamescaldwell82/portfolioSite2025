# Contact Form Setup Guide

## Overview
The contact form is now integrated with EmailJS for email notifications. When users prefer phone contact, it sends a special "SMS-style" email alert to prioritize the response.

## EmailJS Setup (Required)

### 1. Create EmailJS Account
- Go to [EmailJS.com](https://www.emailjs.com/)
- Sign up for a free account (up to 200 emails/month)

### 2. Create Email Service
- In EmailJS dashboard, go to "Email Services"
- Add a new service (Gmail, Outlook, etc.)
- Connect your `james.caldwell82@outlook.com` account

### 3. Create Email Templates

#### Main Contact Template
Create a template with these variables:
```
Subject: {{subject}}

New contact inquiry from {{from_name}}!

Company: {{from_company}}
Inquiry Type: {{inquiry_type}} 
Contact Method: {{contact_method}}
Urgency: {{urgency}}

Phone Preferred: {{phone_preferred}}
Phone Number: {{phone_number}}

Contact Info: {{contact_info}}
Reply To: {{reply_to}}

Message:
{{message_details}}

Received: {{timestamp}}
```

#### SMS-Style Template (Optional)
Create a second template for phone alerts:
```
Subject: {{subject}}

{{message}}

From: {{from_name}}
Time: {{timestamp}}
```

### 4. Get Your Credentials
- Service ID: From "Email Services" page
- Template ID: From "Email Templates" page  
- Public Key: From "Account" > "General" > "API Keys"

### 5. Configure Environment
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Update `.env.local` with your values:
```
VITE_EMAILJS_SERVICE_ID=service_xyz123
VITE_EMAILJS_TEMPLATE_ID=template_abc456  
VITE_EMAILJS_PUBLIC_KEY=xyz789abc
VITE_EMAILJS_SMS_TEMPLATE_ID=template_sms123
```

## Features

### ✅ Working Now
- **Email Notifications**: All inquiries send detailed emails
- **Phone Priority**: Phone preferences trigger urgent SMS-style alerts
- **Smart Routing**: Different response times based on inquiry type
- **Fallback Logging**: Development mode logs all data to console
- **User Feedback**: Success/error messages in chat interface

### 🔧 CORS-Free Solution  
- **No Direct SMS**: Removed CORS-blocked SMS API calls
- **Email Simulation**: Phone preferences get special email formatting
- **Backend Ready**: Structure ready for server-side SMS integration

### 📱 SMS Integration (Future)
For true SMS functionality, you'll need:
1. Backend API endpoint (`/api/send-sms`)
2. SMS service (Twilio, AWS SNS, etc.)
3. Server-side integration to avoid CORS

## Testing

### Development Mode
- Check browser console for detailed logs
- All contact data is logged even if EmailJS fails
- Error states are handled gracefully

### Production Mode  
- Users get success/failure feedback
- EmailJS handles delivery
- Phone preferences trigger dual notifications

## Email Template Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `{{subject}}` | Email subject | "🚀 URGENT: New Contact: John Doe - Hiring Inquiry" |
| `{{from_name}}` | Contact's name | "John Doe" |
| `{{from_company}}` | Company name | "Tech Corp Inc" |
| `{{inquiry_type}}` | Type of inquiry | "I'm interested in hiring James" |
| `{{contact_method}}` | Preferred method | "phone" |
| `{{urgency}}` | Priority level | "HIGH" or "NORMAL" |
| `{{phone_preferred}}` | Phone flag | "YES - Please call instead of email" |
| `{{phone_number}}` | Phone number | "785-727-9319" |
| `{{contact_info}}` | Contact details | "john@techcorp.com" |
| `{{message_details}}` | Full message | "We're looking for a senior developer..." |
| `{{timestamp}}` | Submission time | "8/1/2025, 3:45:23 PM" |

## Troubleshooting

### Common Issues

1. **"EmailJS not configured"**: Update `.env.local` with real credentials
2. **Emails not sending**: Check EmailJS dashboard for quota/errors
3. **CORS errors**: Make sure you're using EmailJS, not direct API calls
4. **Template errors**: Verify template variable names match exactly

### Debug Mode
Set `NODE_ENV=development` to enable console logging for all contact submissions.
