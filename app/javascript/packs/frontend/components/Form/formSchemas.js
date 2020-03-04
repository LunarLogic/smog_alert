export const stateSchema = {
  name: { value: "", error: "" },
  email: { value: "", error: "" },
  message: { value: "", error: "" }
};

export const validationStateSchema = {
  fname: {
    required: true,
    validator: {
      regEx: /^[a-zA-Z]+$/,
      error: "Invalid first name format."
    }
  },
  lname: {
    required: true,
    validator: {
      regEx: /^[a-zA-Z]+$/,
      error: "Invalid last name format."
    }
  },
  tags: {
    required: true,
    validator: {
      regEx: /^(,?\w{3,})+$/,
      error: "Invalid tag format."
    }
  }
};
