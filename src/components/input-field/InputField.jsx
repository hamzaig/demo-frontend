import React from 'react'
import { useField, ErrorMessage } from 'formik'
const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className='form-label'>
        <label htmlFor={field.name}>{label}</label>
      </div>
      <div className='form-control-div'>
        <input autoComplete='off'
          {...field}
          {...props}
          className={`${meta.touched && meta.error && "is-invalid"}`}
        />
        <ErrorMessage component="div" name={field.name} className="input-error" />
      </div>
    </>
  )
}

export default InputField