import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./changepin.scss";
import InputField from '../../components/input-field/InputField';
import { changePin } from '../../store/actions/authActions';
import Message from '../../components/Message/Message';
import Loader from '../../components/loader/Loader';


const ChangePin = () => {
  const dispatch = useDispatch();

  const pinChange = useSelector(state => state.pinChange);
  const { loading, success, error } = pinChange;

  const validate = Yup.object({
    oldpin: Yup.string().min(4, "Must be 4 charcters").required("Old pin is Requierd"),
    newpin: Yup.string().min(4, "Must be 4 charcters").required("New pin is Requierd"),
    confirmpin: Yup.string().min(4, "Must be 4 charcters").oneOf([Yup.ref("newpin"), null]).required("Confirm pin is Requierd"),
  })

  const submitHandler = (values, { resetForm }) => {
    dispatch(changePin(values.oldpin, values.newpin))
    resetForm();
  }


  return (
    <div>
      <h2 className="page-header">Change PIN</h2>
      {loading && <Loader />}
      {success && <Message type={"success"}>Your pin has been changed</Message>}
      {error && <Message type={"danger"}>{error}</Message>}
      <div className="row">
        <Formik initialValues={{
          oldpin: "",
          newpin: "",
          confirmpin: "",
        }}
          validationSchema={validate}
          onSubmit={submitHandler}
        >
          {formik => (
            <Form className="col-4">
              <InputField label="Old Pin" name="oldpin" type="password" maxLength="4" />
              <InputField label="New Pin" name="newpin" type="password" maxLength="4" />
              <InputField label="Confirm Pin" name="confirmpin" type="password" maxLength="4" />
              <button type='submit'>Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default ChangePin