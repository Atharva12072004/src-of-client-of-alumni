import React from 'react';
import './OutlinedButton.css'; // Import the CSS file

function Button({ clr, title, ...props }) {
  return (
    <button className='animatedBTN' style={{
      position: 'relative',
      background: '#fff',
      color: '#000',
      textDecoration: 'none',
      textTransform: 'uppercase',
      border: 'none',
      borderRadius: '0.5rem',
      letterSpacing: '0.1rem',
      fontSize: '1rem',
      padding: '1rem 3rem',
      transition: '0.2s',
      '--clr': clr // Pass the clr prop as a CSS custom property
    }} {...props}>
      <span>{title}</span>
      <i style={{borderRadius: '0.5rem',}}></i>
    </button>
  );
}

export default Button;
