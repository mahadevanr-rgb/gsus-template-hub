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
    links: {
      forgotPassword: {
        label: "Forgot password?",
        href: "/forgot-password",
      },
      signUp: {
        text: "Don't have an account?",
        label: "Sign up",
        href: "/signup",
      },
    },
    dependencies: [
      "text-input",
      "password-input",
      "checkbox",
      "primary-button",
    ],
    tags: ["authentication", "login", "form"],
  },

  {
    id: "register-form",
    name: "Register Form",
    slug: "register-form",
    category: "Authentication",
    componentName: "RegisterForm",
    installPath: "components/forms/RegisterForm",
    version: "1.0.0",
    description:
      "A professional sign-up form with personal details, account credentials, and terms acceptance.",
    overview:
      "A reusable registration composition built from existing form atoms. It provides a structured account creation flow with accessible labels, appropriate autocomplete attributes, password confirmation, and terms acceptance.",
    fields: [
      {
        id: "full-name",
        component: "text-input",
        label: "Full name",
        props: {
          type: "text",
          placeholder: "Enter your full name",
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
        id: "password",
        component: "password-input",
        label: "Password",
        props: {
          placeholder: "Create a password",
          autoComplete: "new-password",
          required: true,
        },
      },
      {
        id: "confirm-password",
        component: "password-input",
        label: "Confirm password",
        props: {
          placeholder: "Re-enter your password",
          autoComplete: "new-password",
          required: true,
        },
      },
      {
        id: "terms",
        component: "checkbox",
        label: "I agree to the Terms of Service and Privacy Policy",
        props: {
          required: true,
        },
      },
    ],
    action: {
      component: "primary-button",
      label: "Create account",
    },
    links: {
      signIn: {
        text: "Already have an account?",
        label: "Sign in",
        href: "/login",
      },
    },
    dependencies: [
      "text-input",
      "password-input",
      "checkbox",
      "primary-button",
    ],
    tags: ["authentication", "register", "signup", "account-creation", "form"],
  },
  {
  id: "forgot-password-form",
  name: "Forgot Password Form",
  slug: "forgot-password-form",
  category: "Authentication",
  description:
    "A clean, responsive forgot password form that helps users reset their password securely through their registered email address.",
  framework: "React",
  language: "JavaScript",
  styling: "Tailwind CSS",
  version: "1.0.0",
  componentName: "ForgotPasswordForm",
  installPath: "components/forms/ForgotPasswordForm",

  fields: [
    {
      id: "email",
      component: "text-input",
      label: "Email Address",
      props: {
        type: "email",
        placeholder: "Enter your registered email",
        required: true,
      },
      validationRules: {
        required: true,
        email: true,
      },
    },
  ],

  actions: [
    {
      label: "Send Reset Link",
      type: "submit",
      variant: "primary",
    },
  ],

  links: {
    backToLogin: {
      text: "Remember your password?",
      label: "Back to Sign in",
      href: "/login",
    },
  },

  dependencies: [
    "text-input",
    "primary-button",
  ],

  tags: [
    "authentication",
    "forgot-password",
    "password-reset",
    "email",
    "recovery",
  ],
},
{
  id: "reset-password-form",
  name: "Reset Password Form",
  slug: "reset-password-form",
  category: "Authentication",
  description:
    "A secure, responsive form that allows users to create a new password after verifying their password reset link.",
  framework: "React",
  language: "JavaScript",
  styling: "Tailwind CSS",
  version: "1.0.0",
  componentName: "ResetPasswordForm",
  installPath: "components/forms/ResetPasswordForm",

  fields: [
    {
      id: "new-password",
      component: "password-input",
      label: "New Password",
      props: {
        placeholder: "Enter your new password",
        required: true,
      },
      validationRules: {
        required: true,
        minLength: 8,
      },
    },
    {
      id: "confirm-password",
      component: "password-input",
      label: "Confirm New Password",
      props: {
        placeholder: "Re-enter your new password",
        required: true,
      },
      validationRules: {
        required: true,
        minLength: 8,
      },
    },
  ],

  actions: [
    {
      label: "Reset Password",
      type: "submit",
      variant: "primary",
    },
  ],

  links: {
    backToLogin: {
      text: "Remember your password?",
      label: "Back to Sign in",
      href: "/login",
    },
  },

  dependencies: [
    "password-input",
    "primary-button",
  ],

  tags: [
    "authentication",
    "reset-password",
    "new-password",
    "password-recovery",
    "security",
  ],
},
{
  id: "otp-verification-form",
  name: "OTP Verification Form",
  slug: "otp-verification-form",
  category: "Authentication",
  description:
    "A clean, responsive OTP verification form with six-digit code input, resend option, and verification action.",
  framework: "React",
  language: "JavaScript",
  styling: "Tailwind CSS",
  version: "1.0.0",
  componentName: "OTPVerificationForm",
  installPath: "components/forms/OTPVerificationForm",

  fields: [
    {
      id: "otp",
      component: "otp-input",
      label: "Verification Code",
      props: {
        length: 6,
        placeholder: "Enter verification code",
        required: true,
      },
      validationRules: {
        required: true,
        minLength: 6,
        maxLength: 6,
      },
    },
  ],

  actions: [
    {
      label: "Verify Code",
      type: "submit",
      variant: "primary",
    },
  ],

  links: {
    resendCode: {
      text: "Didn't receive the code?",
      label: "Resend OTP",
      href: "#resend-otp",
    },
    backToLogin: {
      text: "Back to your account?",
      label: "Sign in",
      href: "/login",
    },
  },

  dependencies: [
    "otp-input",
    "primary-button",
  ],

  tags: [
    "authentication",
    "otp",
    "verification",
    "two-factor-authentication",
    "email-verification",
    "phone-verification",
  ],
}

  // {
  //   id: "password-reset-form",
  //   name: "Password Reset Form",
  //   slug: "password-reset-form",
  //   category: "Authentication",
  //   version: "1.0.0",
  //   description:
  //     "A form for setting a new password, with password and confirmation fields.",
  //   overview:
  //     "A reusable password-reset composition built from the existing password input atom. Suited for the final step of a reset-password flow, after the user has followed a reset link.",
  //   fields: [
  //     {
  //       id: "new-password",
  //       component: "password-input",
  //       label: "New password",
  //       props: {
  //         placeholder: "Enter new password",
  //         autoComplete: "new-password",
  //         required: true,
  //       },
  //     },
  //     {
  //       id: "confirm-password",
  //       component: "password-input",
  //       label: "Confirm password",
  //       props: {
  //         placeholder: "Re-enter new password",
  //         autoComplete: "new-password",
  //         required: true,
  //       },
  //     },
  //   ],
  //   action: { component: "primary-button", label: "Reset Password" },
  //   dependencies: ["password-input", "primary-button"],
  //   tags: ["authentication", "password", "reset", "form"],
  // },
  // {
  //   id: "otp-verification-form",
  //   name: "OTP Verification Form",
  //   slug: "otp-verification-form",
  //   category: "Authentication",
  //   version: "1.0.0",
  //   description:
  //     "A one-time-passcode verification form for confirming email, phone, or 2FA codes.",
  //   overview:
  //     "A reusable verification composition built around the existing OTP input atom. Suited for email/phone confirmation or two-factor authentication flows.",
  //   fields: [
  //     {
  //       id: "otp-code",
  //       component: "otp-input",
  //       label: "Verification code",
  //       props: { required: true },
  //     },
  //   ],
  //   action: { component: "primary-button", label: "Verify Code" },
  //   dependencies: ["otp-input", "primary-button"],
  //   tags: ["authentication", "otp", "verification", "form"],
  // },
];

export { formCompositions };
export default formCompositions;
