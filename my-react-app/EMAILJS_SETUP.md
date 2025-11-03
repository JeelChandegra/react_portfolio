# EmailJS Setup Instructions

Your contact form is now ready to send emails! Follow these steps to complete the setup:

## Step 1: Create an EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month)

## Step 2: Add Email Service
1. Go to **Email Services** in your EmailJS dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email
5. Copy the **Service ID** (e.g., `service_xyz123`)

## Step 3: Create Email Template
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template structure:

**Subject:** New message from {{name}}

**Body:**
```
You have a new message from your portfolio:

Name: {{name}}
Email: {{email}}

Message:
{{message}}
```

4. Save and copy the **Template ID** (e.g., `template_abc456`)

## Step 4: Get Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key** (starts with a long string of characters)

## Step 5: Update Your Code
Open `src/components/Contact.tsx` and replace these values around line 27:

```typescript
emailjs
  .sendForm(
    'YOUR_SERVICE_ID',    // Replace with your Service ID
    'YOUR_TEMPLATE_ID',   // Replace with your Template ID
    formRef.current,
    'YOUR_PUBLIC_KEY'     // Replace with your Public Key
  )
```

Example:
```typescript
emailjs
  .sendForm(
    'service_xyz123',
    'template_abc456',
    formRef.current,
    'a1B2c3D4e5F6g7H8'
  )
```

## Step 6: Test Your Form
1. Save your changes
2. Go to your contact page
3. Fill out the form and submit
4. Check your email inbox for the message!

## Troubleshooting
- **Error sending:** Double-check your Service ID, Template ID, and Public Key
- **Not receiving emails:** Check your spam folder
- **Template variables not working:** Make sure the input `name` attributes match the template variables exactly (name, email, message)

## Security Note
Your Public Key is safe to expose in frontend code - it's designed for this purpose. EmailJS handles all security on their end.

That's it! Your contact form is now fully functional and will send emails directly to your inbox. 🎉
