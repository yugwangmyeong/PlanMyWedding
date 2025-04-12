import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles/community.css";
import Header from "./Header";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState("");
  const [sortType, setSortType] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const pageGroup = Math.floor((currentPage - 1) / 10);
  const startPage = pageGroup * 10 + 1;
  const endPage = Math.min(startPage + 9, totalPages);
  const visiblePageNumbers = pageNumbers.slice(startPage - 1, endPage);

  const handlePageClick = (number) => {
    setCurrentPage(number);
  };

  // ✅ 게시글 불러오기
  const fetchPosts = async () => {
    const token = sessionStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    try {
      let res;

      if (!region && !category && sortType === "latest") {
        // 전체 게시글
        res = await axios.get("http://localhost:8081/boot/api/community/all", { headers });
      } else {
        // 필터 게시글
        res = await axios.post(
          "http://localhost:8081/boot/api/community/filter",
          {
            region: region || null,
            category: category || null,
            sort: sortType,
          },
          { headers }
        );
      }

      if (Array.isArray(res.data)) {
        setPosts(res.data);
        setCurrentPage(1);
      } else {
        console.error("📛 응답 형식 오류", res.data);
        setPosts([]);
      }
    } catch (err) {
      console.error("❌ 게시글 불러오기 실패:", err);
      setPosts([]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [region, category, sortType]);

  return (
    <div className="community-container">
      <Header />
      <div className="community-content">
        <div className="left-sidebar">
          <h2>커뮤니티</h2>
          <hr className="community-divider" />
          <ul className="category-menu">
            {[
              { label: "전체", value: "" },
              { label: "웨딩홀", value: "웨딩홀" },
              { label: "드레스", value: "드레스" },
              { label: "메이크업", value: "메이크업" },
              { label: "스튜디오", value: "스튜디오" },
              { label: "신혼여행", value: "신혼여행" },
            ].map((item) => (
              <li
                key={item.value}
                className={category === item.value ? "active" : ""}
                onClick={() => setCategory(item.value)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="right-content">
          <div className="community-main-wrapper">
            <div className="community-title">
              <p>만족도 높은</p>
              <p>고객님들의 최신 사진 리뷰</p>
            </div>

            <div className="community-top-banner">
              <div className="banner-left">
                <img src="/images/banner1.jpg" alt="banner1" />

                <div className="filter-buttons">
                  <select
                    className="filter-select"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    <option value="">지역</option>
                    {[
                      "서울특별시", "부산광역시", "대구광역시", "인천광역시",
                      "광주광역시", "대전광역시", "울산광역시", "세종특별자치시",
                      "경기도", "강원특별자치도", "충청북도", "충청남도",
                      "전라북도", "전라남도", "경상북도", "경상남도", "제주특별자치도"
                    ].map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>

                  <select
                    className="filter-sort"
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                  >
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

            <div className="post-list">
              {currentPosts.length > 0 ? (
                currentPosts.map((post) => (
                  <Link
                    key={post.commIdx}
                    to={`/community/post/${post.commIdx}`}
                    className="post-item-link"
                  >
                    <article className="post-item">
                      <div className="post-info">
                        <div className="post-title-container">
                          <h3 className="post-title">{post.commTitle}</h3>
                          <span className="post-date">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="post-content">
                          <p>{post.commContent}</p>
                        </div>
                        <div className="post-meta">
                        <span className="post-views">👁 {post.commViews}</span>
                          <span className="post-likes">👍 {post.commLikes}</span>
                          <span className="post-comments">💬 {post.commentCount || 0}</span>
                          <span className="post-region">📍 지역: {post.commRegion}</span>
                          <span className="post-category">📌 {post.commService}</span>
                        </div>
                      </div>
                      {post.commFile && (
                        <div className="post-thumbnail">
                          <img src={post.commFile} alt="썸네일" />
                        </div>
                      )}
                    </article>
                  </Link>
                ))
              ) : (
                <p>📭 조건에 맞는 게시글이 없습니다.</p>
              )}
            </div>

            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => setCurrentPage(startPage - 10)}
                disabled={startPage === 1}
              >
                &laquo;
              </button>

              {visiblePageNumbers.map((number) => (
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
                onClick={() => setCurrentPage(startPage + 10)}
                disabled={endPage >= totalPages}
              >
                &raquo;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
