import { PHOTO_CATEGORY_OPTIONS } from "constants/globals";

import InputField from "custom-fields/InputField";
import RandomPhotoField from "custom-fields/RandomPhotoField";
import SelectField from "custom-fields/SelectField";
import { FastField, Form, Formik } from "formik";

import React from "react";
import { Button, FormGroup, Spinner } from "reactstrap";
import * as Yup from "yup";
import PropTypes from "prop-types";

const PhotoForm = (props) => {
  const { initialValues, onSubmit, isAddingMode } = props;

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("This field is required"),
    categoryId: Yup.number().required("This field is required").nullable(),
    //Luyện tập thêm Yup
    photo: Yup.string().when("categoryId", {
      is: 1,
      then: Yup.string().required("This field is required"),
      otherwise: Yup.string().notRequired(),
    }),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formikProps) => {
        const { values, errors, touched, isSubmitting } = formikProps;
        console.log({ values, errors, touched });
        return (
          <Form>
            <FastField
              name="title"
              component={InputField}
              label="Title"
              placeholder="Eg: Wow nature ..."
            />

            <FastField
              name="categoryId"
              component={SelectField}
              label="Category"
              placeholder="What's your photo category?"
              options={PHOTO_CATEGORY_OPTIONS}
            />

            <FastField
              name="photo"
              component={RandomPhotoField}
              label="Photo"
            />

            <FormGroup>
              <Button
                type="submit"
                color={isAddingMode ? "primary" : "success"}
              >
                {isSubmitting && <Spinner size="sm" />}
                {isAddingMode ? "Add to album" : "Update Photo"}
              </Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
};

PhotoForm.propTypes = {
  onSubmit: PropTypes.func,
};

PhotoForm.defaultProps = {
  onsubmit: null,
};

export default PhotoForm;
