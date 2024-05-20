const isValidEmail = (email: string) => {
  return REGEX_PATTERNS.EMAIL.test(email);
};
