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
  };

  return (
    <div className="community-container">
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
      </div>
    </div>
  );
};

export default CommunityPost;
