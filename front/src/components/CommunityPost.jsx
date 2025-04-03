import React from 'react';
import { Link } from 'react-router-dom';
import './styles/communitypost.css';
import toggleMenuIcon from './styles/assets/toggleMenu.png';

const CommunityPost = () => {
  // 헤더 관련 상태 (예시: 드롭다운 토글)
  const [isMypageOpen, setIsMypageOpen] = React.useState(false);
  const toggleMypageMenu = () => {
    setIsMypageOpen(!isMypageOpen);
  };

  // 임시 게시글 데이터 (실제 데이터는 서버나 상태관리에서 받아올 수 있음)
  const post = {
    
  };

  return (
    <div className="community-container">
      {/* 헤더 영역 (CommunityWrite와 동일) */}
      <header className="header">
        <div className="logo">Plan my wedding</div>
        <nav className="nav-links">
          <div className={`mypage-container ${isMypageOpen ? 'open' : ''}`}>
            <button onClick={toggleMypageMenu} className="mypage-btn">
              마이페이지
              <img src={toggleMenuIcon} className="mypage-icon" alt="toggle menu" />
            </button>
            <div className="mypage-dropdown">
              <Link to="/schedule">일정관리</Link>
              <Link to="/moneycontrol">예산관리</Link>
            </div>
          </div>
          <Link to="/Community" className="header-margin">
            커뮤니티
          </Link>
        </nav>
        <nav className="nav-links2">
          <Link to="/Login" className="login-link">로그인</Link>
          <span className="header-margin">/ </span>
          <Link to="/Register" className="reg-link">회원가입</Link>
          <Link to="/Update">
            <span className="material-symbols-outlined">account_circle</span>
          </Link>
        </nav>
      </header>

      {/* 게시글 상세 내용 영역 */}
      <div className="community-post-wrapper">
        <h2 className="community-heading">커뮤니티</h2>
        
        <h2 className="post-title">{post.title}</h2>
        <div className="post-meta">
          <span className="post-category">{post.category}</span>
          <span className="post-author">{post.author}</span>
          <span className="post-date">{post.date}</span>
        </div>
        <div className="post-content">
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default CommunityPost;