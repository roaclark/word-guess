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
        {options.map(({ name, value }) => (
          <option value={value} key={value}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
