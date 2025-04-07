import React from 'react';
import './styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h2 className="footer-logo">Plan my wedding</h2>
          <p className="footer-desc">당신의 결혼을 위한 완벽한 플래너</p>
        </div>
        <div className="footer-links">
          <a href="#">이용약관</a>
          <a href="#">개인정보처리방침</a>
          <a href="#">문의하기</a>
        </div>
      </div>
      <div className="footer-bottom">
        © 2025 Plan my wedding. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
