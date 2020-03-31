export const stateSchema = {
  sender_name: { value: "", error: "" },
  sender_email: { value: "", error: "" },
  message: { value: "", error: "" }
};

export const frontValidationStateSchema = {
  sender_name: {
    required: true,
    validator: {
      regEx: /^([a-zA-Z]{2,})+$/,
      error: "Niepoprawny format imienia"
    }
  },
  sender_email: {
    required: true,
    validator: {
      regEx: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
      error: "Niepoprawny format adresu e-mail"
    }
  },
  message: {
    required: true
  }
};

export const backendFormAnswersSchema = {
  sender_name: "",
  sender_email: "",
  message: ""
};
