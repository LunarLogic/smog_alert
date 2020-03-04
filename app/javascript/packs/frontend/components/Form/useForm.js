import { useState, useEffect } from "react";

const useForm = (stateSchema, validationSchema = {}, callback) => {
  const [state, setState] = useState(stateSchema);
  const [disabled, setDisabled] = useState(true);
  const [isIncomplete, setIsIncomplete] = useState(false);

  // Button set to disabled at first render
  useEffect(() => {
    setDisabled(true);
  }, []);

  // Button set to disabled / enabled on every state & isIncomplete change
  useEffect(() => {
    if (isIncomplete) {
      setDisabled(validateState());
    }
  }, [state, isIncomplete]);

  const validateState = () => {
    const hasErrorInState = Object.keys(validationSchema).some(key => {
      const isFieldRequired = validationSchema[key].required;
      const stateValue = state[key].value;
      const stateError = state[key].error;
      return (isFieldRequired && !stateValue) || stateError;
    });
    return hasErrorInState;
  };

  const handleOnChange = () => {
    setIsIncomplete(true);

    const name = event.target.name;
    const value = event.target.value;

    let error = "";
    if (validationSchema[name].required) {
      if (!value) {
        error = "This field is required";
      }
    }
    if (
      validationSchema[name].validator !== null &&
      typeof validationSchema[name].validator === "object"
    ) {
      if (value && !validationSchema[name].validator.regEx.test(value)) {
        error = validationSchema[name].validator.error;
      }
    }
    setState(prevState => ({
      ...prevState,
      [name]: { value, error }
    }));
  };

  const handleOnSubmit = event => {
    event.preventDefault();

    if (!validateState()) {
      callback(state);
    }
  };
  return { state, disabled, handleOnChange, handleOnSubmit };
};

export default useForm;
