//@flow
import React from 'react';

const Input = (props: any) => {
  const { style, ...extra } = props;
  return (
    <input
      style={{
        ...style,
        display: 'inline-block',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
        fontSize: '16px',
      }}
      {...extra}
    />
  );
};

export default Input;
