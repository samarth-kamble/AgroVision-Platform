import nodemailer from "nodemailer";

const domain = process.env.NEXT_PUBLIC_APP_URL;

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // SMTP server address (e.g., Gmail's)
  port: parseInt(process.env.SMTP_PORT || "465"), // SMTP port (465 for secure connection)
  secure: true, // Use true for port 465
  service: process.env.SMTP_SERVICE, // Gmail in this case
  auth: {
    user: process.env.SMTP_MAIL, // Your email address
    pass: process.env.SMTP_PASSWORD, // App-specific password for your email
  },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await transporter.sendMail({
    from: `"My Tools" <${process.env.SMTP_MAIL}>`,
    to: email,
    subject: "Confirm Your Email Address",
    html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="" alt="My Tools" style="width: 100px; height: auto;" />
      </div>
      <h2 style="color: #007BFF; text-align: center;">Welcome to My Tools!</h2>
      <p style="font-size: 16px; text-align: center;">
        Hi there, <br />
        Thank you for signing up with My Tools. Please confirm your email address to start using your account.
      </p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="${confirmLink}" style="display: inline-block; background-color: #007BFF; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 16px; font-weight: bold;">
          Confirm Email
        </a>
      </div>
      <p style="font-size: 14px; text-align: center; color: #666;">
        If you didn’t create this account, you can safely ignore this email.
      </p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; text-align: center; color: #999;">
        This email was sent by My Tools. For support, please contact us at
        <a href="mailto:support@my-tools.ai" style="color: #007BFF;">support@my-tools.ai</a>.
      </p>
    </div>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await transporter.sendMail({
    from: `"My Tools" <${process.env.SMTP_MAIL}>`,
    to: email,
    subject: "Reset your password",
    html: `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://your-app-url.com/logo.png" alt="My Tools" style="width: 100px; height: auto;" />
      </div>
      <h2 style="color: #007BFF; text-align: center;">Reset Your Password</h2>
      <p style="font-size: 16px; text-align: center;">
        Hi there, <br />
        We received a request to reset your password. Click the button below to reset it.
      </p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="${resetLink}" style="display: inline-block; background-color: #007BFF; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 16px; font-weight: bold;">
          Reset Password
        </a>
      </div>
      <p style="font-size: 14px; text-align: center; color: #666;">
        If you did not request a password reset, you can safely ignore this email. The reset link will expire in 30 minutes.
      </p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; text-align: center; color: #999;">
        This email was sent by My Tools. For support, please contact us at
        <a href="mailto:support@my-tools.ai" style="color: #007BFF;">support@my-tools.ai</a>.
      </p>
    </div>`,
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await transporter.sendMail({
    from: `"My Tools" <${process.env.SMTP_MAIL}>`, // Sender address
    to: email, // List of recipients
    subject: 'Two-Factor Authentication Code', // Subject line
    html: ` <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://your-app-url.com/logo.png" alt="My Tools" style="width: 100px; height: auto;" />
      </div>
      <h2 style="color: #2C3E50; text-align: center;">Your 2FA Code</h2>
      <p style="font-size: 16px; text-align: center; color: #555;">
        Hi there, <br />
        To complete your login, please use the following 2FA (Two-Factor Authentication) code:
      </p>
      <div style="text-align: center; margin: 20px 0;">
        <p style="display: inline-block; background-color: #3498DB; color: #fff; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 6px;">
          ${token}
        </p>
      </div>
      <p style="font-size: 14px; text-align: center; color: #666;">
        This code is valid for 10 minutes. If you didn’t request this, please ignore this email or contact our support team.
      </p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; text-align: center; color: #999;">
        This email was sent by My Tools. For support, please contact us at 
        <a href="mailto:support@my-tools.ai" style="color: #3498DB;">support@my-tools.ai</a>.
      </p>
    </div>`, 
  });
};