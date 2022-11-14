import React from 'react';

interface OptionsProps {
  /**
   * Value of option
   */
  value: string;
  /**
   * Label of option
   */
  label?: string;
}

export function Option({ value, label }: OptionsProps) {
  return <option value={value}>{label ? label : value}</option>;
}

interface SelectProps {
  /**
   * Non-selectable option to use as placeholder for Select
   */
  placeholder?: string;
  /**
   * Options to render in dropdown
   */
  children?: React.ReactNode;
  /**
   * Value of Selected Item
   */
  value?: string;
  /**
   * Handle Change for Select
   */
  handleChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

function Select({ placeholder, children, handleChange }: SelectProps) {
  return (
    <select onChange={handleChange} className="select select-bordered max-w-xs">
      {placeholder && (
        <option disabled selected>
          {placeholder}
        </option>
      )}
      {children}
    </select>
  );
}

export default Select;
