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

            <div className="community-top-banner">
              <div className="banner-left">
                <img src="/images/sample1.png" alt="banner1" />
                <div className="filter-buttons">
                  <select className="filter-select">
                    <option value="">지역</option>
                    <option value="서울특별시">서울특별시</option>
                    <option value="부산광역시">부산광역시</option>
                    <option value="대구광역시">대구광역시</option>
                    <option value="인천광역시">인천광역시</option>
                    <option value="광주광역시">광주광역시</option>
                    <option value="대전광역시">대전광역시</option>
                    <option value="울산광역시">울산광역시</option>
                    <option value="세종특별자치시">세종특별자치시</option>
                    <option value="경기도">경기도</option>
                    <option value="강원특별자치도">강원특별자치도</option>
                    <option value="충청북도">충청북도</option>
                    <option value="충청남도">충청남도</option>
                    <option value="전라북도">전라북도</option>
                    <option value="전라남도">전라남도</option>
                    <option value="경상북도">경상북도</option>
                    <option value="경상남도">경상남도</option>
                    <option value="제주특별자치도">제주특별자치도</option>
                  </select>
                  <select className="filter-sort">
                    <option value="latest">최신순</option>
                    <option value="popular">인기순</option>
                  </select>
                </div>
              </div>

              <div className="banner-right">
                <img src="/images/sample2.jpg" alt="banner2" />
                <Link to="/community/write" className="write-btn">글쓰기</Link>
              </div>
            </div>

            {/* 게시글 리스트 */}
            <div className="post-list">
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => (
                <Link to={`/community/${post.commIdx}`} key={post.commIdx} style={{ textDecoration: "none", color: "inherit" }}>
                  <article className="post-item">
                    <div className="post-info">
                      <h3 className="post-title">{post.commTitle}</h3>
                      <div className="post-content">
                        <p>{post.commContent}</p>
                      </div>
                      <div className="post-meta">
                        <span className="post-likes">👍 {post.commLikes}</span>
                        <span className="post-comments">💬 {post.commViews}</span>
                      </div>
                    </div>
                    <div className="post-thumbnail">
                      {/* 썸네일 */}
                      {post.commFile && post.commFile !== "null" && (
                        <div className="post-thumbnail">
                          <img src={post.commFile} alt="thumbnail" />
                        </div>
                      )}
                    </div>
                  </article>
                </Link>
              ))
            ) : (
              <p>게시글이 없습니다.</p>
            )}
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
