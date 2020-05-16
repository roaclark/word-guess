//@flow
import * as React from 'react';

type Props = {
  onClick?: () => void,
  type?: string,
  children: React.Node,
};

const Button = ({ onClick, type, children }: Props): React.Node => {
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
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
