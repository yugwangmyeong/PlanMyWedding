<<<<<<< HEAD
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/communitypost.css';
import toggleMenuIcon from './styles/assets/toggleMenu.png';

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
  const [newComment, setNewComment] = React.useState('');

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
    if (newComment.trim() === '') return;
    // 예: 작성자 익명
    const commentData = {
        author: "익명",
        text: newComment
      };
    // 임시로 댓글 배열에 추가
    setComments([...comments, newComment]);
    setNewComment('');
  };

  // 신고하기 버튼 클릭
  const handleReport = (index) => {
    alert(`댓글 ${index + 1}을(를) 신고합니다.`);
    // 실제로는 서버와 통신하여 신고 로직 처리
=======
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/communitypost.css";
import Header from "./Header";

// ✅ API base url (중앙 집중 관리 가능)
const BASE_URL = "http://localhost:8081/boot/api/community";

const CommunityPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(0);

  const token = sessionStorage.getItem("token");
  const currentUser = getUsernameFromToken(token);

  // ✅ 토큰에서 사용자 정보 추출
  function getUsernameFromToken(token) {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      return payload.username;
    } catch {
      return null;
    }
  }

  // ✅ 게시글 상세 조회
  const fetchPost = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/${postId}`);
      setPost(res.data);
      setLikes(res.data.commLikes);
    } catch (err) {
      console.error("📛 게시글 불러오기 실패:", err);
    }
  };

  // ✅ 댓글 목록 불러오기
  const fetchComments = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/${postId}/comment`);
      setComments(res.data);
    } catch (err) {
      console.error("📛 댓글 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [postId]);

  // ✅ 좋아요
  const handleLike = async () => {
    try {
      const res = await axios.put(`${BASE_URL}/${postId}/like`);
      setLikes(res.data.commLikes);
    } catch (err) {
      console.error("📛 좋아요 실패:", err);
    }
  };

  // ✅ 댓글 작성
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const data = {
      mbId: currentUser || "guest",
      content: newComment,
    };

    try {
      const res = await axios.post(`${BASE_URL}/${postId}/comment`, data);
      setComments([...comments, res.data]);
      setNewComment("");
    } catch (err) {
      console.error("📛 댓글 작성 실패:", err);
    }
  };

  // ✅ 게시글 삭제
  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await axios.delete(`${BASE_URL}/${postId}`);
        alert("삭제 완료!");
        navigate("/community");
      } catch (err) {
        alert("삭제 실패!");
      }
    }
>>>>>>> origin/main
  };

  return (
    <div className="community-container">
<<<<<<< HEAD
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
        
        {/* 제목 */}
        <h2 className="post-title">{post?.title}</h2>

        {/* 메타 정보 영역(카테고리, 서비스, 지역 등) */}
        <div className="post-metaPost">
        {post?.service && <span className="post-service">{post.service}</span>}
          {post?.region && <span className="post-region">{post.region}</span>}
          {post?.author && <span className="post-author">{post.author}</span>}
          {post?.category && <span className="post-category">{post.category}</span>}
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
                  <span className="comment-author">{comment.author}</span> : {comment.text}
                </div>
                <button className="report-btn" onClick={() => handleReport(idx)}>
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

=======
      <Header />

      <div className="community-post-wrapper">
        <h2 className="community-heading">커뮤니티</h2>

        {post ? (
          <>
            <h2 className="post-title">{post.commTitle}</h2>

            <div className="post-metaPost">
              <span className="post-service">작성자: {post.mbId}</span>
              <span>조회수: {post.commViews}</span>
              <span>좋아요: {likes}</span>
            </div>

            {/* 업로드 이미지 */}
            {post.commFile && (
              <div className="post-images">
                <img src={post.commFile} alt="업로드 이미지" className="post-image-preview" />
              </div>
            )}

            {/* 본문 */}
            <div className="post-content">
              <p>{post.commContent}</p>
            </div>

            {/* 좋아요, 수정 삭제 */}
            <div className="post-interactions">
              <div className="like-section">
                <button className="like-btn" onClick={handleLike}>❤️ 좋아요</button>
              </div>

              {currentUser === post.mbId && (
                <div className="edit-buttons">
                  <Link to={`/community/update/${post.commIdx}`} className="edit-btn">✏️ 수정</Link>
                  <button className="delete-btn" onClick={handleDelete}>🗑 삭제</button>
                </div>
              )}
            </div>

            {/* 댓글 목록 */}
            <hr className="divider-line" />
            <div className="comment-list">
              <h3>댓글</h3>
              {comments.length > 0 ? (
                comments.map((c, i) => (
                  <div key={i} className="comment-item">
                    <span className="comment-author">{c.mbId}</span>
                    <span>{c.content}</span>
                  </div>
                ))
              ) : (
                <p>아직 댓글이 없습니다.</p>
              )}
            </div>

            {/* 댓글 작성 */}
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <input
                type="text"
                placeholder="댓글을 입력하세요"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button type="submit">댓글 작성</button>
            </form>
          </>
        ) : (
          <p>게시글을 불러오는 중입니다...</p>
        )}
>>>>>>> origin/main
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default CommunityPost;
=======
export default CommunityPost;
>>>>>>> origin/main
