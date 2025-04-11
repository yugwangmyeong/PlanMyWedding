<<<<<<< HEAD
import React from 'react';
import Header from '../components/Header';
import './styles/Community.css';

function Community() {
    return (
        <div className="community-page">
            <Header />
            <div className="community-container">
                {/* 사이드바 */}
                <aside className="sidebar">
                    <ul>
                        <li className="active">전체</li>
                        <li>웨딩홀</li>
                        <li>드레스</li>
                        <li>메이크업</li>
                        <li>스튜디오</li>
                        <li>신혼여행</li>
                    </ul>
                </aside>

                {/* 메인 컨텐츠 */}
                <div className="main-content">
                    {/* 검색창과 글작성 버튼 */}
                    <header className="header">
                        <input type="text" placeholder="관심있는 내용을 검색해보세요!" className="search-bar" />
                        <button className="write-button">글작성</button>
                    </header>

                    {/* 이미지 갤러리 */}
                    <section className="image-gallery">
                        <h2>고객님들의 최신 사진 리뷰</h2>
                        <div className="images">
                            <img src="image1.jpg" alt="웨딩홀" />
                            <img src="image2.jpg" alt="드레스" />
                        </div>
                    </section>

                    {/* 게시글 목록 */}
                    <section className="post-list">
                        {[
                            {
                                category: '웨딩홀 - 드메르웨딩홀 광주',
                                title: '광주 인기 웨딩홀 드메르 식장 후기',
                                description: '드메르는 인기가 많아서 이미 올해는 예약이 마감 되었다고 해요...',
                                likes: 77,
                                comments: 10,
                            },
                            {
                                category: '스튜디오 - 르노브해밥 웨딩스튜디오',
                                title: '광주웨딩드레스 다양한 스타일 르노브해밥',
                                description: '최근에 결혼 준비하시는 분들은 르노브해밥을 찾는 추세입니다...',
                                likes: 89,
                                comments: 14,
                            },
                        ].map((post, index) => (
                            <article key={index} className="post-item">
                                <h3>{post.category}</h3>
                                <h2>{post.title}</h2>
                                <p>{post.description}</p>
                                <div className="post-meta">
                                    <span>👍 {post.likes}</span>
                                    <span>💬 {post.comments}</span>
                                </div>
                            </article>
                        ))}
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Community;
=======
// src/components/Community/Community.jsx
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./styles/community.css";
import Header from "./Header";


const Community = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // 페이지별 게시글 잘라내기
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  // 페이지 번호 배열 만들기
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchCommunityPosts = async () => {
      const token = sessionStorage.getItem("token");
  
      try {
        const response = await fetch("http://localhost:8081/boot/api/community/all", {
          method: "POST", // 또는 POST, 백엔드와 맞춰
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          credentials: "include"
        });
  
        console.log("📦 상태:", response.status);
  
        const text = await response.text();
        console.log("📦 응답 내용 (text):", text);
  
        if (!response.ok) {
          throw new Error(`서버 응답 오류: ${response.status}`);
        }
  
        if (!text || text.trim() === "") {
          console.warn("⚠️ 서버 응답 본문이 비어 있습니다.");
          setPosts([]);
          return;
        }
  
        const data = JSON.parse(text);
        console.log("✅ 게시글 데이터:", data);
        setPosts(data);
      } catch (err) {
        console.error("❌ 게시글 불러오기 실패:", err);
      }
    };
  
    fetchCommunityPosts();
  }, []);

  return (
    <div className="community-container">
      <Header />
      <div className="community-content">
        {/* 사이드 메뉴 */}
        <div className="left-sidebar">
          <h2>커뮤니티</h2>
          <hr className="community-divider" />
          <ul className="category-menu">
            <li><NavLink to="/community" end className={({ isActive }) => (isActive ? "active" : "")}>전체</NavLink></li>
            <li><NavLink to="/community/hall">웨딩홀</NavLink></li>
            <li><NavLink to="/community/dress">드레스</NavLink></li>
            <li><NavLink to="/community/makeup">메이크업</NavLink></li>
            <li><NavLink to="/community/studio">스튜디오</NavLink></li>
            <li><NavLink to="/community/honeymoon">신혼여행</NavLink></li>
          </ul>
        </div>

        {/* 오른쪽 콘텐츠 */}
        <div className="right-content">
          <div className="community-main-wrapper">
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

            {/* 페이지네이션 */}
            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lt;
              </button>

              {pageNumbers.map((number) => (
                <button
                  key={number}
                  className={`page-btn ${currentPage === number ? "active" : ""}`}
                  onClick={() => handlePageClick(number)}
                >
                  {number}
                </button>
              ))}

              <button
                className="page-btn"
                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
>>>>>>> origin/main
