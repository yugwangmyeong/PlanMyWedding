import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./styles/community.css";
import toggleMenuIcon from "./styles/assets/toggleMenu.png";

const Community = () => {
  const [isMypageOpen, setIsMypageOpen] = useState(false);

  const toggleMypageMenu = () => {
    setIsMypageOpen(!isMypageOpen);
  };

  // [2] 예시 게시글 데이터 (실제로는 서버에서 받아오거나 Redux, Context 등을 사용할 수 있습니다.)
  const [posts] = useState([
    {
      id: 1,
      title: "웨딩 촬영 후기",
      content: "드디어 웨딩 촬영을 마쳤어요! 스튜디오 분위기가 너무 좋아서...",
      thumbnail: "/images/sample1.jpg",
      date: "2025-04-01",
      author: "happyBride",
    },
    {
      id: 2,
      title: "스드메 업체 추천 부탁드려요",
      content: "서울 강남권에서 괜찮은 스드메 찾고 있어요! 예산은...",
      thumbnail: "/images/sample2.jpg",
      date: "2025-04-02",
      author: "weddinglover",
    },
    // 필요한 만큼 더미 데이터 추가
  ]);

  return (
    <div className="community-container">
     <header className="header">
      <div className="logo">Plan my wedding</div>

      <nav className="nav-links">
        {/* 마이페이지 버튼 - 클릭 시 드롭다운 표시 */}
        <div className={`mypage-container ${isMypageOpen ? "open" : ""}`}>
          <button onClick={toggleMypageMenu} className="mypage-btn">
            마이페이지 
            <img
             src={toggleMenuIcon}
             className="mypage-icon" 
             alt="toogle menu" 
             />
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
        <Link to="/Update" className="">
          <span className="material-symbols-outlined">account_circle</span>
        </Link>
      </nav>
    </header>

    {/* 커뮤니티 메인 콘텐츠 영역 */}
    <div className="community-content">
        {/* 왼쪽 사이드바: 커뮤니티 제목, 구분선, 카테고리 메뉴 */}
        <div className="left-sidebar">
          <h2>커뮤니티</h2>
          <hr className="divider" />
          <ul className="category-menu">
            <li>
              <NavLink
                to="/community"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                전체
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/community/hall"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                웨딩홀
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/community/dress"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                드레스
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/community/makeup"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                메이크업
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/community/studio"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                스튜디오
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/community/honeymoon"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                신혼여행
              </NavLink>
            </li>
          </ul>

        </div>

    {/* 오른쪽 영역: 기존 커뮤니티 콘텐츠 (배너, 게시글 목록, 페이지네이션 등) */}
    <div className="right-content">
      <div className="community-main-wrapper">
        {/* 상단 설명 영역 */}
        <div className="community-title">
          <p>만족도 높은</p>
          <p>고객님들의 최신 사진 리뷰</p>
        </div>

    {/* 상단 배너 영역 (왼쪽/오른쪽 이미지 & 글쓰기 버튼) */}
    <div className="community-top-banner">
      <div className="banner-left">
        <img src="/images/banner1.jpg" alt="banner1" />

        <div className="filter-buttons">
          <select className="filter-select">
              <option value="">지역</option>
              <option value="광주">광주</option>
              <option value="서울">서울</option>
              <option value="경기">경기</option>
              <option value="인천">인천</option>
              <option value="부산">부산</option>
              <option value="경남">경남</option>
              <option value="경북">경북</option>
              <option value="대구">대구</option>
              <option value="충남">충남</option>
              <option value="전북">전북</option>
              <option value="충북">충북</option>
              <option value="강원">강원</option>
              <option value="대전">대전</option>
              <option value="울산">울산</option>
              <option value="세종">세종</option>
              <option value="제주">제주</option>
          </select>
          <select className="filter-sort">
            <option value="popular">인기순</option>
            <option value="views">조회수순</option>
            <option value="latest">최신순</option>
          </select>
        </div>
      </div>

      <div className="banner-right">
        <img src="/images/banner2.jpg" alt="banner2" />
        <Link to="/community/write" className="write-btn">글쓰기</Link>
      </div>
    </div>

    {/* 게시글 목록 영역 */}
    <div className="post-list">
      {posts.map((post) => (
        <article className="post-item" key={post.id}>
          <div className="post-image">
            <img src={post.thumbnail} alt={post.title} />
          </div>
          <div className="post-info">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <div className="post-meta">
              <span className="post-author">{post.author}</span>
              <span className="post-date">{post.date}</span>
            </div>
          </div>
        </article>
       ))}
     </div>

     {/* 하단 페이지네이션 (간단 예시) */}
     <div className="pagination">
        <button className="page-btn">&lt;</button>
       <button className="page-btn active">1</button>
       <button className="page-btn">2</button>
        <button className="page-btn">3</button>
        <button className="page-btn">&gt;</button>
     </div>
   </div>
  </div>
 </div>
</div>
  );
};

export default Community;
