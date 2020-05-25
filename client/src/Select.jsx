//@flow
import React from 'react';

const Select = ({
  options,
  value,
  onChange,
}: {
  options: { label: string, id: string }[],
  value: ?string,
  onChange?: (string) => void,
}) => {
  return (
    <div>
      <label
        htmlFor="category-select"
        style={{ display: 'inline-block', paddingRight: '5px' }}
      >
        Word list:
      </label>
      <select
        id="category-select"
        style={{
          display: 'inline-block',
          border: '1px solid #ccc',
          background: 'white',
          fontSize: '14px',
        }}
        value={value}
        onChange={(e) => {
          onChange && onChange(e.target.value);
        }}
      >
        {options.map(({ label, id }) => (
          <option value={id} key={id}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
