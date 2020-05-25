//@flow
import React from 'react';

const Select = ({
  options,
  value,
  onChange,
}: {
  options: { name: string, value: string }[],
  value: ?string,
  onChange?: (string) => void,
}) => {
  return (
    <select
      style={{
        display: 'inline-block',
        border: '1px solid #ccc',
        fontSize: '16px',
      }}
      value={value}
      onChange={(e) => {
        onChange && onChange(e.target.value);
      }}
    >
      {options.map(({ name, value }) => (
        <option value={value} key={value}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default Select;
