import React from 'react';

const BallCanvas = ({ icon }) => {
  return (
    <div
      style={{
        width: '100px', // Or use w-28 h-28 tailwind classes if preferred and Tailwind is set up for JS styling
        height: '100px',
        borderRadius: '50%',
        backgroundColor: '#fff8eb', // A light background color
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '10px', // Padding to ensure image doesn't touch edges
      }}
    >
      <img
        src={icon} // The icon prop should be a URL/path to the image
        alt="Tech icon"
        style={{
          maxWidth: '80%',
          maxHeight: '80%',
          objectFit: 'contain', // Ensures aspect ratio is maintained
        }}
      />
    </div>
  );
};

export default BallCanvas;
