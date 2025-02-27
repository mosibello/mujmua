"use client";
import React from "react";
import Select from "react-select";

export default ({
  isMulti,
  options,
  className,
  defaultValue = [],
  onChange,
  onBlur,
  value,
}) => (
  <Select
    defaultValue={defaultValue}
    isMulti={isMulti}
    name="colors"
    options={options}
    className={`basic-multi-select ${className}`}
    classNamePrefix="select"
    closeMenuOnSelect={!isMulti}
    onChange={onChange}
    onBlur={onBlur}
    value={value}
  />
);
