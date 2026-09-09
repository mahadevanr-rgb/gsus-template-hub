const formCompositions = [
  {
    id: "login-form",
    name: "Login Form",
    slug: "login-form",
    category: "Authentication",
    componentName: "LoginForm",
    installPath: "components/forms/LoginForm",
    version: "1.0.0",
    description:
      "A focused sign-in form with email, password, remember-me, and a primary action.",
    overview:
      "A reusable authentication composition built from the existing form atoms and primary button. It provides a clear, accessible starting point for sign-in screens.",
    fields: [
      {
        id: "email",
        component: "text-input",
        label: "Email address",
        props: {
          type: "email",
          placeholder: "you@example.com",
          autoComplete: "email",
          required: true,
        },
      },
      {
        id: "password",
        component: "password-input",
        label: "Password",
        props: {
          placeholder: "Enter your password",
          autoComplete: "current-password",
          required: true,
        },
      },
      {
        id: "remember",
        component: "checkbox",
        label: "Remember me",
        props: {},
      },
    ],
    action: { component: "primary-button", label: "Sign in" },
    dependencies: [
      "text-input",
      "password-input",
      "checkbox",
      "primary-button",
    ],
    tags: ["authentication", "login", "form"],
  },
  {
    id: "contact-form",
    name: "Contact Form",
    slug: "contact-form",
    category: "Contact",
    version: "1.0.0",
    description:
      "A standard contact form with name, email, subject, and message fields.",
    overview:
      "A reusable contact composition built from existing form atoms. Suited for support pages, landing pages, or general inquiry forms.",
    fields: [
      {
        id: "full-name",
        component: "text-input",
        label: "Full name",
        props: {
          placeholder: "Jane Doe",
          autoComplete: "name",
          required: true,
        },
      },
      {
        id: "email",
        component: "text-input",
        label: "Email address",
        props: {
          type: "email",
          placeholder: "you@example.com",
          autoComplete: "email",
          required: true,
        },
      },
      {
        id: "subject",
        component: "text-input",
        label: "Subject",
        props: { placeholder: "How can we help?", required: false },
      },
      {
        id: "message",
        component: "textarea",
        label: "Message",
        props: { placeholder: "Write your message here...", required: true },
      },
    ],
    action: { component: "primary-button", label: "Send Message" },
    dependencies: ["text-input", "textarea", "primary-button"],
    tags: ["contact", "support", "form"],
  },
  {
    id: "otp-verification-form",
    name: "OTP Verification Form",
    slug: "otp-verification-form",
    category: "Authentication",
    version: "1.0.0",
    description:
      "A one-time-passcode verification form for confirming email, phone, or 2FA codes.",
    overview:
      "A reusable verification composition built around the existing OTP input atom. Suited for email/phone confirmation or two-factor authentication flows.",
    fields: [
      {
        id: "otp-code",
        component: "otp-input",
        label: "Verification code",
        props: { required: true },
      },
    ],
    action: { component: "primary-button", label: "Verify Code" },
    dependencies: ["otp-input", "primary-button"],
    tags: ["authentication", "otp", "verification", "form"],
  },
  {
    id: "password-reset-form",
    name: "Password Reset Form",
    slug: "password-reset-form",
    category: "Authentication",
    version: "1.0.0",
    description:
      "A form for setting a new password, with password and confirmation fields.",
    overview:
      "A reusable password-reset composition built from the existing password input atom. Suited for the final step of a reset-password flow, after the user has followed a reset link.",
    fields: [
      {
        id: "new-password",
        component: "password-input",
        label: "New password",
        props: {
          placeholder: "Enter new password",
          autoComplete: "new-password",
          required: true,
        },
      },
      {
        id: "confirm-password",
        component: "password-input",
        label: "Confirm password",
        props: {
          placeholder: "Re-enter new password",
          autoComplete: "new-password",
          required: true,
        },
      },
    ],
    action: { component: "primary-button", label: "Reset Password" },
    dependencies: ["password-input", "primary-button"],
    tags: ["authentication", "password", "reset", "form"],
  },
];

export { formCompositions };
export default formCompositions;
