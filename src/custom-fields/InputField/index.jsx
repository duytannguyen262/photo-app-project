import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";

const InputField = (props) => {
  const { field, form, type, label, placeholder, disabled } = props;
  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}
      <Input
        id={name}
        // These codes can be replaced with {...field}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        // -------------------------------------------
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        //handle errors
        invalid={showError}
      />

      {showError && <FormFeedback>{errors[name]}</FormFeedback>}
    </FormGroup>
  );
};

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

InputField.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  disabled: false,
};

export default InputField;
