export const getFirebaseAuthErrorMessage = (errorCode, isSignIn) => {
  switch (errorCode) {
    case "auth/invalid-credential":
      return "Incorrect email or password.";

    case "auth/user-not-found":
      return "No account found with this email.";

    case "auth/wrong-password":
      return "Incorrect password. Please try again.";

    case "auth/email-already-in-use":
      return "This email is already registered. Please sign in.";

    case "auth/weak-password":
      return "Password should be at least 8 characters long.";

    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";

    default:
      return isSignIn
        ? "Unable to sign in. Please try again."
        : "Unable to create account. Please try again.";
  }
};
