import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles/community.css";
import Header from "./Header";
import Footer from "./Footer";

const Community = () => {
  // 필터 및 전체 조회 관련 상태
  const [posts, setPosts] = useState([]);
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState("");
  const [sortType, setSortType] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  
  // 검색 관련 상태
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchType, setSearchType] = useState("title"); // "author", "title", "content", "title_content"
  const [searchKeyword, setSearchKeyword] = useState("");
  // totalPages state는 검색 API에서 전달된 값을 사용. 필터 모드일 경우는 계산해서 사용.
  const [totalPages, setTotalPages] = useState(0);
  
  // client-side pagination: 필터/전체 조회모드일 땐 posts를 슬라이싱
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = isSearchMode
    ? posts  // 검색 모드: posts는 서버에서 해당 페이지 결과만 내려옴
    : posts.slice(indexOfFirstPost, indexOfLastPost);

  // 필터 모드일 때, 전체 페이지 수는 posts 배열 길이를 기준으로 함
  const calculatedTotalPages = isSearchMode
    ? totalPages
    : Math.ceil(posts.length / postsPerPage);
  
  const pageNumbers = Array.from({ length: calculatedTotalPages }, (_, i) => i + 1);
  const pageGroup = Math.floor((currentPage - 1) / 10);
  const startPage = pageGroup * 10 + 1;
  const endPage = Math.min(startPage + 9, calculatedTotalPages);
  const visiblePageNumbers = pageNumbers.slice(startPage - 1, endPage);

  // 필터 / 전체 게시글 불러오기
  const fetchPosts = async () => {
    const token = sessionStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    try {
      let res;
      // 검색 모드가 아닐 때 실행 (검색창에 키워드가 없으면 필터/전체 조회)
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
      // 전체 조회 및 필터 API는 배열 형태로 내려온다고 가정
      if (Array.isArray(res.data)) {
        setPosts(res.data);
        setCurrentPage(1);
      } else {
        //console.error("📛 응답 형식 오류", res.data);
        setPosts([]);
      }
    } catch (err) {
      //console.error("❌ 게시글 불러오기 실패:", err);
      setPosts([]);
    }
  };

  // 검색 API 호출 (서버 사이드 페이징)
  const fetchSearchResults = async (pageNumber = 1) => {
    const token = sessionStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };


    // "http://192.168.219.50:8081/boot/api/community/search"
    try {
      const res = await axios.get("http://localhost:8081/boot/api/community/search", {
        params: {
          searchType, 
          keyword: searchKeyword,
          page: pageNumber - 1, // 서버는 보통 0-based index
          size: postsPerPage,
        },
        headers,
      });
      // 서버 검색 결과가 Page 객체 형식으로 내려온다고 가정 (content, totalPages 등)
      if (res.data) {
        setPosts(res.data.content);
        setTotalPages(res.data.totalPages);
        setCurrentPage(pageNumber);
      }
    } catch (error) {
      //console.error("❌ 검색 실패:", error);
      setPosts([]);
    }
  };

  // 검색 실행 (엔터키 또는 검색 버튼으로 트리거)
  const handleSearch = () => {
    if (searchKeyword.trim() !== "") {
      setIsSearchMode(true);
      fetchSearchResults(1);
    } else {
      // 검색어가 비어있으면 검색 모드 해제 후 기존 게시글 조회
      setIsSearchMode(false);
      fetchPosts();
    }
  };

  // 페이지 번호 클릭 처리 (<, 숫자 버튼, >)
  const handlePageClick = (number) => {
    if (isSearchMode) {
      // 검색 모드인 경우, 서버로부터 해당 페이지 결과 다시 불러오기
      fetchSearchResults(number);
    } else {
      setCurrentPage(number);
    }
  };

  // 필터, 카테고리, 정렬 옵션 변경 시 (검색 모드가 아니면) 게시글 새로 불러오기
  useEffect(() => {
    if (!isSearchMode) {
      fetchPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region, category, sortType]);

  // 검색창에 입력 후 값이 지워지면 자동으로 검색 모드 해제
  useEffect(() => {
    if (searchKeyword.trim() === "") {
      setIsSearchMode(false);
      fetchPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeyword]);

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
              { label: "신혼집", value: "신혼집" },
              { label: "혼수", value: "혼수" },
              { label: "예물", value: "예물" },
              { label: "청첩장", value: "청첩장" },
              { label: "부케", value: "부케" },
              { label: "한복", value: "한복" },
              { label: "질문", value: "질문" },
              { label: "기타", value: "기타" }
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
              <p>광주 더 시그너스 웨딩 (광고배너입니다) 광주메이크업 Revenue 르베뉴</p>
            </div>

            <div className="community-top-banner">
              <div className="banner-left">
                <Link to="http://www.thesignus.com/page/intro/wedding">
                  <img src="/images/banner1.jpg" alt="banner1" />
                </Link>
                <div className="filter-buttons">
                  <select
                    className="filter-select"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    <option value="">지역</option>
                    {[
                      "서울특별시",
                      "부산광역시",
                      "대구광역시",
                      "인천광역시",
                      "광주광역시",
                      "대전광역시",
                      "울산광역시",
                      "세종특별자치시",
                      "경기도",
                      "강원특별자치도",
                      "충청북도",
                      "충청남도",
                      "전라북도",
                      "전라남도",
                      "경상북도",
                      "경상남도",
                      "제주특별자치도"
                    ].map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>

                  <select
                    className="filter-sort"
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                  >
                    <option value="latest">최신순</option>
                    <option value="popular">인기순</option>
                    <option value="views">조회수순</option>
                  </select>
                </div>
              </div>

              <div className="banner-right">
                <Link to="https://www.instagram.com/revenue.makeup/">
                  <img src="/images/banner2.jpg" alt="banner2" />
                </Link>
                <Link to="/community/write" className="write-btn">
                  글쓰기
                </Link>
              </div>
            </div>

            {/* 게시글 리스트 */}
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
                          <span className="post-comments">
                            💬 {post.commentCount || 0}
                          </span>
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

            {/* Pagination */}
            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => handlePageClick(startPage - 10)}
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
                onClick={() => handlePageClick(startPage + 10)}
                disabled={endPage >= calculatedTotalPages}
              >
                &raquo;
              </button>
            </div>

            {/* 검색바 (pagination 아래 조금 떨어뜨려 배치) */}
            <div className="search-bar" style={{ marginTop: "20px", textAlign: "center" }}>
              <select
                className="search-select"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="author">작성자</option>
                <option value="title">제목</option>
                <option value="content">내용</option>
                <option value="title_content">제목+내용</option>
              </select>
              <input
                type="text"
                className="search-input"
                placeholder="검색어를 입력하세요"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                style={{ marginLeft: "10px", padding: "5px" }}
              />
              <button
                className="search-btn"
                onClick={handleSearch}
                style={{ marginLeft: "10px", padding: "5px 10px" }}
              >
                검색
              </button>
            </div>
            
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Community;
