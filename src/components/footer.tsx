import React from 'react';

const Footer = () => {
  return (
    <div className='footer text-center text-lg-left'>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-dark' href='https://mdbootstrap.com/'>
          Ram Kumar Kota
        </a>
      </div>
    </div>
  );
}

export default Footer;
