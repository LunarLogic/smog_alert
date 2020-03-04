export const stateSchema = {
  name: { value: "", error: "" },
  email: { value: "", error: "" },
  message: { value: "", error: "" }
};

export const validationStateSchema = {
  name: {
    required: true,
    validator: {
      regEx: /^([a-zA-Z]{3,})+$/,
      error: "Niepoprawny format imienia"
    }
  },
  email: {
    required: true,
    validator: {
      regEx: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
      error: "Niepoprawny format adresu e-mail"
    }
  },
  message: {
    required: true,
    validator: {
      regEx: /^(,?\w{2,})+$/,
      error: "Niepoprawny format wiadomości"
    }
  }
};
