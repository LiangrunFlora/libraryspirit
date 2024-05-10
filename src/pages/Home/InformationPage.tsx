import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <p style={textStyle}>Read with us | Learn with us | Research with us</p>
        <p style={textStyle}>Follow us: <a href="#">Twitter</a> | <a href="#">Facebook</a> | <a href="#">Instagram</a></p>
        <p style={textStyle}>© 2024 Library Spirit. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

const footerStyle:React.CSSProperties = {
  backgroundColor: '#333',
  color: '#fff',
  padding: '1rem',
  marginTop: 'auto', // 设置为 auto 使得 footer 在页面底部
  textAlign: 'center',
  margin: '0', // 移除底部边缘
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
};

const textStyle = {
  fontSize: '0.8rem',
};

export default Footer;
