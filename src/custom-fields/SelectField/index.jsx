import React from "react";
import PropTypes from "prop-types";
import { FormFeedback, FormGroup, Label } from "reactstrap";
import Select from "react-select";

const SelectField = (props) => {
  const { field, options, label, placeholder, disabled, form } = props;
  const { name, value, onBlur } = field;

  const selectedOption = options.find((option) => option.value === value);

  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const handleSelectedOptionChange = (selectedOption) => {
    const selectedValue = selectedOption
      ? selectedOption.value
      : selectedOption;

    const changeToEvent = {
      target: {
        name: name,
        value: selectedValue,
      },
    };

    field.onChange(changeToEvent);
  };

  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}
      <Select
        id={name}
        name={name}
        value={selectedOption}
        onChange={handleSelectedOptionChange}
        onBlur={onBlur}
        disabled={disabled}
        placeholder={placeholder}
        options={options}
        //handle errors
        className={showError ? "is-invalid" : ""}
      />
      {showError && <FormFeedback>{errors[name]}</FormFeedback>}
    </FormGroup>
  );
};

SelectField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.array,
};

SelectField.defaultProps = {
  label: "",
  placeholder: "",
  disabled: false,
  options: [],
};

export default SelectField;
