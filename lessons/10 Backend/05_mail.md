### MAIL

```bash
npm install mailgen
npm install nodemailer
```

**in `.env`**

```env
EMAIL_HOST=smtp.your-email-provider.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

**in `utils/mails.js`**

```javascript
import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const emailVerificationContent = function(username, verificationLink) {
    return {
        body: {
            name: username,
            intro: "Welcome to our app! We're very excited to have you on board.",
            action: {
                instructions: "To get started with our app, please click here:",
                button: {
                    color: "#22BC66", // Optional action button color
                    text: "Verify Email",
                    link: verificationLink,
                }
            },
            outro: "Need help, or have questions? Just reply to this email, we'd love to help."
        }
    }
}

const forgotPasswordContent = function(username, resetLink) {
    return {
        body: {
            name = username,
            intro: "You have requested to reset your password. Please click the button below to reset your password.",
            action:{
                instructions: "To reset your password, please click here:",
                button: {
                    color: "#DC4D2F", //Optional action button color
                    text: "Reset Password",
                    link: resetLink,
                }
            },
            outro: "If you did not request a password reset, please ignore this email or reply to let us know. This password reset link is only valid for the next 10 minutes."
        }
    }
}

const sendEmail = async function(options) {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Your App Name",
            link: "https://yourapp.com"
        }
    });

    const emailTextual = mailGenerator.generatePlainText(options);
    const emailHtml = mailGenerator.generate(options);

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    const mail = {
        from: process.env.EMAIL_USER,
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHtml
    }

    try {
        await transporter.sendMail(mail);
    } catch (err) {
        console.error("Error sending email: ", err);
    }
}

export {emailVerificationContent, forgotPasswordContent, sendEmail};
```

