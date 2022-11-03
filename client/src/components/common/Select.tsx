import React, { useState } from 'react';

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
   * Id of Select
   */
  id?: string;
  /**
   * Name of Select
   */
  name?: string;
  /**
   * Non-selectable option to use as placeholder for Select
   */
  placeholder?: string;
  /**
   * Options to render in dropdown
   */
  children?: React.ReactNode;
  /**
   * Default Value of Selected Item
   */
  defaultValue?: string;
  /**
   * Value of Selected Item
   */
  value?: string;
  /**
   * Handle Change for Select
   */
  handleChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

function Select({
  id,
  name,
  placeholder,
  children,
  defaultValue,
  value,
  handleChange,
}: SelectProps) {
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
