import React from "react";
import _ from "lodash";
import { Field, reduxForm } from "redux-form";
import { useIndexedDB } from "react-indexed-db";
import { phoneNumber, required } from "../utils/validate";
import "../App.css";
import { useHistory } from "react-router-dom";

const renderField = (props) => {
  console.log(props);
  const {
    input,
    label,
    type,
    meta: { touched, error, warning },
    style,
  } = props;
  console.log(style);
  return (
    <div>
      <h6 style={{ margin: "0px" }}>{label}</h6>
      <div>
        <input style={style} {...input} type={type} />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  );
};

const FieldLevelValidationForm = (props) => {
  const { add, update } = useIndexedDB("locations");
  const history = useHistory();
  const { handleSubmit, pristine, reset, submitting } = props;
  console.log("handleSubmit------>", handleSubmit);
  const onSubmitfunction = (values) => {
    console.log("value", values);
    if (_.get(values, "id")) {
      return update(values).then((event) => {
        alert("Edited!");
        history.push("/");
      });
    }
    add(values).then(
      (event) => {
        console.log(event);
        alert("Location Added");
        history.push("/");
      },
      (error) => {
        console.log(error);
      }
    );
  };
  return (
    <div className="Form-container">
      <form onSubmit={handleSubmit(onSubmitfunction)}>
        <h4>Add Locations</h4>
        <div style={{ width: "100%" }}>
          <Field
            name="location"
            type="text"
            component={renderField}
            label="Location Name"
            validate={required}
            style={{ width: "100%" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "15px",
          }}
        >
          <div>
            <Field
              name="address1"
              type="text"
              component={renderField}
              label="Address Line 1"
            />
          </div>
          <div>
            <Field
              name="suiteNo"
              type="text"
              component={renderField}
              label="Suite No."
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "15px",
          }}
        >
          <div>
            <Field
              name="address2"
              type="text"
              component={renderField}
              label="Address Line 2"
            />
          </div>
          <div>
            <Field
              name="city"
              type="text"
              component={renderField}
              label="City"
            />
          </div>
          <div>
            <Field
              name="state"
              type="text"
              component={renderField}
              label="State"
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "15px",
          }}
        >
          <div>
            <Field
              name="zipcode"
              type="text"
              component={renderField}
              label="Zip Code"
            />
          </div>
          <div>
            <Field
              name="phone"
              type="text"
              component={renderField}
              label="Phone Number"
              validate={phoneNumber}
            />
          </div>
          <div>
            <Field
              name="timezone"
              type="text"
              component={renderField}
              label="Time Zone"
            />
          </div>
        </div>
        <div style={{ marginTop: "15px" }}>
          <button type="submit" disabled={submitting}>
            Save
          </button>
          <button
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
            style={{ marginLeft: "20px" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  form: "fieldLevelValidation",
  enableReinitialize: true,
})(FieldLevelValidationForm);
