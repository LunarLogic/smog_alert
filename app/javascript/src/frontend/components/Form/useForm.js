import { useState, useEffect } from "react";

const useForm = (stateSchema, frontValidationSchema = {}, callback) => {
  const [frontValidationState, setFrontValidationState] = useState(stateSchema);
  const [backendValidationState, setBackendValidationState] = useState(
    stateSchema
  );

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
  }, [frontValidationState, isIncomplete]);

  const validateState = () => {
    const hasErrorInState = Object.keys(frontValidationSchema).some(key => {
      const isFieldRequired = frontValidationSchema[key].required;
      const stateValue = frontValidationState[key].value;
      const stateError = frontValidationState[key].error;
      return (isFieldRequired && !stateValue) || stateError;
    });
    return hasErrorInState;
  };

  const handleOnChange = () => {
    setIsIncomplete(true);

    const name = event.target.name;
    const value = event.target.value;

    let error = "";
    if (frontValidationSchema[name].required) {
      if (!value) {
        error = "To pole jest wymagane";
      }
    }
    if (
      frontValidationSchema[name] &&
      frontValidationSchema[name].validator !== null &&
      typeof frontValidationSchema[name].validator === "object"
    ) {
      if (value && !frontValidationSchema[name].validator.regEx.test(value)) {
        error = frontValidationSchema[name].validator.error;
      }
    }
    setFrontValidationState(prevState => ({
      ...prevState,
      [name]: { value, error }
    }));
  };

  const handleOnSubmit = event => {
    event.preventDefault();

    if (!validateState()) {
      callback(frontValidationState);
    }
  };
  return {
    frontValidationState,
    backendValidationState,
    setBackendValidationState,
    disabled,
    handleOnChange,
    handleOnSubmit
  };
};

export default useForm;
