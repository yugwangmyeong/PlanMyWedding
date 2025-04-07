import React, { useState, useRef } from "react";
import { Link, NavLink, } from "react-router-dom";
import Header from "./Header";
import "./styles/community.css";
import toggleMenuIcon from "./styles/assets/toggleMenu.png";

const Community = () => {
  const [isMypageOpen, setIsMypageOpen] = useState(false);
  const [isRecOpen, setIsRecOpen] = useState(false);  // 추천페이지 열림 상태
  const recRef = useRef(null);                         // 추천페이지 ref

  // 마이페이지 드롭다운 토글
  const toggleMypageMenu = () => {
    setIsMypageOpen(!isMypageOpen);
  };

  const toggleRecommendMenu = () => {
    setIsRecOpen(!isRecOpen);
  };

  // 임시 게시글 데이터 (실제 데이터는 서버나 전역 상태에서 받아옵니다)
  const [posts] = useState([
    {
      id: 1,
      title: "광주 인기 웨딩홀 드메르 식장 후기",
      content: "드메르는 인기가 많아서 이미 주말에는 예약이 마감되었다고 하네요...",
      likes: 77,        // 좋아요 수 (예시)
      comments: 5,       // 댓글 수 (예시)
      images: ["/images/sample1.jpg", "/images/sample2.jpg"], // 썸네일용 이미지
      service: "웨딩홀",
      region: "광주"
    },
    {
      id: 2,
      title: "드레스 투어 후기",
      content: "드레스 투어를 다녀왔어요. 가장 마음에 들었던 곳은...",
      likes: 23,
      comments: 5,
      images: ["/images/sample3.jpg"],
      service: "드레스",
      region: "서울"
    },
    // 필요한 만큼 더미 데이터 추가
  ]);

  return (
    <div className="community-container">
      {/* 헤더 영역 */}
     <div><Header></Header>

        
      <nav className="nav-links2">
        <Link to="/Login" className="login-link">로그인</Link>
        <span className="header-margin">/ </span>
        <Link to="/Register" className="reg-link">회원가입</Link>
        <Link to="/Update" className="">
          <span className="material-symbols-outlined">account_circle</span>
        </Link>
      </nav>
    

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

          {/* 왼쪽: 글 정보 */}
          <div className="post-info">
            <h3 className="post-title">{post.title}</h3>

            {/* 게시글 내용 영역: 구분선 없음 */}
          <div className="post-content">
            <p>{post.content}</p>
          </div>

            {/* 좋아요/댓글 영역: 구분선이 적용됨 */}
            <div className="post-meta">
              <span className="post-likes">👍 {post.likes}</span>
              <span className="post-comments">💬 {post.comments}</span>
            </div>
          </div>
          {/* 썸네일 이미지 */}
          <div className="post-thumbnail">
          {post.images && post.images.length > 0 ? (
            // 실제 파일 객체가 아니라 URL이므로 바로 src에 할당
            <img src={post.images[0]} alt="thumbnail" />
          ) : (
            <img src="/images/no-image.jpg" alt="no thumbnail" />
          )}
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
</div>
  );
};

export default Community;