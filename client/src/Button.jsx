//@flow
import * as React from 'react';

type Props = {
  onClick: () => void,
  children: React.Node,
};

const Button = ({ onClick, children }: Props): React.Node => {
  return (
    <button
      style={{
        margin: '10px 10px 50px 10px',
        borderRadius: '10px',
        padding: '10px 10px',
        fontSize: '16px',
        cursor: 'pointer',
      }}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </button>
  );
};

export default Button;
