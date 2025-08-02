import emailjs from '@emailjs/browser';

// EmailJS configuration - Set these up in your .env file
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_your_id';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_your_id';  
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key';
const EMAILJS_SMS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_SMS_TEMPLATE_ID || EMAILJS_TEMPLATE_ID;

export interface ContactData {
  name: string;
  company?: string;
  inquiryType: string;
  contactMethod: 'email' | 'phone' | 'linkedin';
  email?: string;
  phone?: string;
  linkedin?: string;
  details: string;
}

export const sendContactNotification = async (data: ContactData): Promise<boolean> => {
  try {
    // For now, always send email notification due to CORS limitations with SMS services
    // We'll include phone preference in the email content
    return await sendEmailNotification(data);
  } catch (error) {
    console.error('Failed to send contact notification:', error);
    return false;
  }
};

const sendEmailNotification = async (data: ContactData): Promise<boolean> => {
  try {
    // Initialize EmailJS if not already done
    emailjs.init(EMAILJS_PUBLIC_KEY);

    // Create different email content based on contact preference
    const isPhonePreferred = data.contactMethod === 'phone';
    const urgencyLevel = data.inquiryType?.toLowerCase().includes('hire') ? 'HIGH' : 'NORMAL';
    
    const templateParams = {
      to_email: 'james.caldwell82@outlook.com',
      from_name: data.name,
      from_company: data.company || 'Not specified',
      inquiry_type: data.inquiryType,
      contact_method: data.contactMethod,
      contact_info: data.email || data.phone || data.linkedin || 'Not provided',
      message_details: data.details,
      timestamp: new Date().toLocaleString(),
      reply_to: data.email || 'noreply@jamescaldwell.dev',
      urgency: urgencyLevel,
      phone_preferred: isPhonePreferred ? 'YES - Please call instead of email' : 'No',
      phone_number: data.phone || 'Not provided',
      subject: `${urgencyLevel === 'HIGH' ? '🚀 URGENT: ' : ''}New Contact: ${data.name} - ${data.inquiryType}`
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', response);
    
    // If phone is preferred, also send a second "SMS simulation" email
    if (isPhonePreferred && data.phone) {
      setTimeout(() => {
        sendSMSSimulationEmail(data);
      }, 1000);
    }
    
    return response.status === 200;
  } catch (error) {
    console.error('Email sending failed:', error);
    
    // Development fallback - log the data
    logContactData(data);
    console.log('📧 Email would have been sent to james.caldwell82@outlook.com');
    
    return false; // Return false to show error state in UI, but data is logged
  }
};

// Send a separate "SMS-style" email when phone is preferred
const sendSMSSimulationEmail = async (data: ContactData): Promise<void> => {
  try {
    const smsStyleParams = {
      to_email: 'james.caldwell82@outlook.com',
      subject: `📱 SMS Alert: ${data.name} wants you to call ${data.phone}`,
      message: `SMS-STYLE ALERT:
      
${data.name} from ${data.company || 'unspecified company'} wants to discuss: ${data.inquiryType}

They prefer PHONE contact: ${data.phone}

Quick summary: ${data.details.substring(0, 100)}${data.details.length > 100 ? '...' : ''}

Call them back or send full details via email.`,
      from_name: 'Portfolio Contact Bot',
      timestamp: new Date().toLocaleString()
    };

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_SMS_TEMPLATE_ID, // Use dedicated SMS template if available
      smsStyleParams
    );
    
    console.log('SMS simulation email sent');
  } catch (error) {
    console.error('SMS simulation email failed:', error);
  }
};

// Alternative: Server-side approach for real SMS (no CORS issues)
// For true SMS functionality, you'd need a backend API that handles SMS services like Twilio
export const sendSMSViaBackend = async (data: ContactData): Promise<boolean> => {
  try {
    const response = await fetch('/api/send-sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: '785-727-9319',
        message: `New contact: ${data.name} (${data.company || 'No company'}) - ${data.inquiryType}. Contact: ${data.phone}. Details: ${data.details.substring(0, 100)}...`,
        contactData: data
      })
    });

    return response.ok;
  } catch (error) {
    console.error('Backend SMS call failed:', error);
    return false;
  }
};
export const sendToServerAPI = async (data: ContactData): Promise<boolean> => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    return response.ok;
  } catch (error) {
    console.error('Server API call failed:', error);
    return false;
  }
};

// Development/Testing function
export const logContactData = (data: ContactData): void => {
  console.log('=== CONTACT FORM SUBMISSION ===');
  console.log('Name:', data.name);
  console.log('Company:', data.company);
  console.log('Inquiry Type:', data.inquiryType);
  console.log('Contact Method:', data.contactMethod);
  console.log('Contact Info:', data.email || data.phone || data.linkedin);
  console.log('Details:', data.details);
  console.log('Timestamp:', new Date().toLocaleString());
  console.log('================================');
};
