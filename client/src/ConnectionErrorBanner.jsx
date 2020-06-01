//@flow
import React from 'react';

type Props = {
  retryFunc: () => void,
};

const ConnectionErrorBanner = ({ retryFunc }: Props) => {
  return (
    <div
      style={{
        background: '#FFF2FA',
        border: '1px pink solid',
        borderRadius: 10,
        padding: 12,
        marginBottom: 20,
      }}
    >
      You have been disconnected. Wait for automatic reconnection or{' '}
      <a onClick={retryFunc} style={{ color: 'blue', cursor: 'pointer' }}>
        retry now
      </a>
      .
    </div>
  );
};

export default ConnectionErrorBanner;
