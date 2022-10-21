import React from 'react';
import { useField, FieldHookConfig } from 'formik';

interface OtherProps {
  label: string;
}

/**
 * Primary UI component
 */
function TextInput(props: OtherProps & FieldHookConfig<string>) {
  const [field, meta] = useField(props);
  return (
    <div>
      <label className="ml-1" htmlFor={props.name}>
        {props.label}
      </label>
      <input
        className={`input input-bordered w-full max-w-md ${
          meta.touched && meta.error ? 'input-error' : ''
        }`}
        {...field}
        placeholder={props.placeholder}
        type={props.type}
      />

      {meta.touched && meta.error ? (
        <label className="label-text-alt text-error">
          <span>{meta.error}</span>
        </label>
      ) : null}
    </div>
  );
}

export default TextInput;
