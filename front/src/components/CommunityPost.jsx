import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/communitypost.css";
import toggleMenuIcon from "./styles/assets/toggleMenu.png";

const CommunityPost = () => {
  const location = useLocation();
  const { post } = location.state || {};

  // 헤더 드롭다운 상태
  const [isMypageOpen, setIsMypageOpen] = React.useState(false);
  const toggleMypageMenu = () => {
    setIsMypageOpen(!isMypageOpen);
  };

  // 좋아요 상태(임시)
  const [likes, setLikes] = React.useState(0);
  const [liked, setLiked] = React.useState(false);

  // 댓글 상태(임시)
  const [comments, setComments] = React.useState([]);
  const [newComment, setNewComment] = React.useState("");

  // 좋아요 버튼 클릭
  const handleLike = () => {
    if (liked) {
      setLikes((prevLikes) => prevLikes - 1);
      setLiked(false);
    } else {
      setLikes((prevLikes) => prevLikes + 1);
      setLiked(true);
    }
  };

  // 댓글 작성
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    // 예: 작성자 익명
    const commentData = {
      author: "익명",
      text: newComment,
    };
    // 임시로 댓글 배열에 추가
    setComments([...comments, newComment]);
    setNewComment("");
  };

  // 신고하기 버튼 클릭
  const handleReport = (index) => {
    alert(`댓글 ${index + 1}을(를) 신고합니다.`);
    // 실제로는 서버와 통신하여 신고 로직 처리
  };

  return (
    <div className="community-container">
      {/* 헤더 영역 (CommunityWrite와 동일) */}
      <header className="header">
        <div className="logo">Plan my wedding</div>
        <nav className="nav-links">
          <div className={`mypage-container ${isMypageOpen ? "open" : ""}`}>
            <button onClick={toggleMypageMenu} className="mypage-btn">
              마이페이지
              <img
                src={toggleMenuIcon}
                className="mypage-icon"
                alt="toggle menu"
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
          <Link to="/Login" className="login-link">
            로그인
          </Link>
          <span className="header-margin">/ </span>
          <Link to="/Register" className="reg-link">
            회원가입
          </Link>
          <Link to="/Update">
            <span className="material-symbols-outlined">account_circle</span>
          </Link>
        </nav>
      </header>

      {/* 게시글 상세 내용 영역 */}
      <div className="community-post-wrapper">
        <h2 className="community-heading">커뮤니티</h2>

        {/* 제목 */}
        <h2 className="post-title">{post?.title}</h2>

        {/* 메타 정보 영역(카테고리, 서비스, 지역 등) */}
        <div className="post-metaPost">
          {post?.service && (
            <span className="post-service">{post.service}</span>
          )}
          {post?.region && <span className="post-region">{post.region}</span>}
          {post?.author && <span className="post-author">{post.author}</span>}
          {post?.category && (
            <span className="post-category">{post.category}</span>
          )}
        </div>

        {/* 이미지 미리보기 영역 */}
        {post?.images && post.images.length > 0 && (
          <div className="post-images">
            {post.images.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`uploaded ${index}`}
                className="post-image-preview"
              />
            ))}
          </div>
        )}

        {/* 본문 내용 */}
        <div className="post-content">
          <p>{post?.content}</p>
        </div>

        {/* 구분선 */}
        <hr className="divider-line" />

        {/* 좋아요 & 댓글 영역 */}
        <div className="post-interactions">
          <div className="like-section">
            <button className="like-btn" onClick={handleLike}>
              👍
            </button>
            <span className="like-count">{likes}</span>
          </div>

          {/* 댓글 목록 */}
          <div className="comment-list">
            {comments.map((comment, idx) => (
              <div key={idx} className="comment-item">
                <div className="comment-left">
                  <span className="comment-author">{comment.author}</span> :{" "}
                  {comment.text}
                </div>
                <button
                  className="report-btn"
                  onClick={() => handleReport(idx)}
                >
                  신고하기
                </button>
              </div>
            ))}
          </div>

          {/* 댓글 작성 폼 */}
          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <input
              type="text"
              placeholder="댓글을 작성하세요..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit">등록</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommunityPost;
