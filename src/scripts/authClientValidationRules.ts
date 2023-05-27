// We could potentially bring in some TS schema validation e.g., via Zod  https://github.com/colinhacks/zod

export const authClientValidationRules = {
  email: {
    validate: (val: string = "") =>
      val.includes("@") ? "" : "Please check your email address format",
  },
  password: {
    validate: (val: string = "") =>
      val.length < 6 ? "Your password is too short" : "",
  },
};
