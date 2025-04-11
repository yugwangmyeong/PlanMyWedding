import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/communitypost.css";
import Header from "./Header";

const BASE_URL = "http://localhost:8081/boot/api/community";
const API_BASE = "http://localhost:8081/boot/api";

const CommunityPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUsername, setCurrentUsername] = useState("");

  const token = sessionStorage.getItem("token");

  
  

  // ✅ 토큰에서 이메일, username 추출
  const getEmailFromToken = (token) => {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      return {
        email: payload.sub,
        username: payload.username,
      };
    } catch {
      return null;
    }
  };

  const getUserIdFromEmail = async (email) => {
    try {
      const res = await axios.get(`${API_BASE}/user/email/${email}`);
      console.log("📦 게시글 정보:", post);
      console.log("🧑 작성자:", post.user);
      console.log("📦 현재 글의 작성자 userId:", post?.user?.id);
      console.log("👤 현재 로그인한 userId:", currentUserId);
      console.log("✅ post.user.username:", res.data.user?.username);
      return res.data.userId;
      
    } catch (err) {
      console.error("📛 userId 조회 실패:", err);
      return null;
    }
  };

  // ✅ 유저 초기화
  const initUser = async () => {
    if (!token) return;
    const userInfo = getEmailFromToken(token);
    if (!userInfo) return;

    setCurrentUsername(userInfo.username);

    const userId = await getUserIdFromEmail(userInfo.email);
    setCurrentUserId(userId);
  };

  const fetchPost = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/${postId}`);
      console.log("📦 게시글 정보:", post);
      setPost(res.data);
      setLikes(res.data.commLikes);
    } catch (err) {
      console.error("📛 게시글 불러오기 실패:", err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/${postId}/comment`);
      setComments(res.data);
    } catch (err) {
      console.error("📛 댓글 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchPost(); // post 상태 업데이트
      fetchComments();
      initUser(); // 로그인한 사용자 정보
    };
    init();
  }, [postId]);

  const handleLike = async () => {
    try {
      const res = await axios.put(`${BASE_URL}/${postId}/like`);
      setLikes(res.data.commLikes);
    } catch (err) {
      console.error("📛 좋아요 실패:", err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (!currentUserId || !token) {
      alert("로그인이 필요합니다.");
      return;
    }

    const commentData = {
      userId: currentUserId,
      content: newComment,
    };

    try {
      const res = await axios.post(`${BASE_URL}/${postId}/comment`, commentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComments([...comments, res.data]);
      setNewComment("");
    } catch (err) {
      console.error("📛 댓글 작성 실패:", err);
    }
  };

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
        <button onClick={() => navigate(`/community/update/${post.commIdx}`, { state: { post } })}>
          ✏️ 수정
        </button>
        {post ? (
  <>
    <h2 className="post-title">{post.commTitle}</h2>

    <div className="post-metaPost">
      <span className="post-service">작성자: {post.user?.username || "익명"}</span>
      <span>조회수: {post.commViews}</span>
      <span>좋아요: {likes}</span>
    </div>

    {post.commFile && (
      <div className="post-images">
        <img src={post.commFile} alt="업로드 이미지" className="post-image-preview" />
      </div>
    )}

    <div className="post-content">
      <p>{post.commContent}</p>
    </div>

    <div className="post-interactions">
      <div className="like-section">
        <button className="like-btn" onClick={handleLike}>❤️ 좋아요</button>
      </div>

      {/* 작성자만 보이는 수정/삭제 버튼 */}
      {currentUserId === post.user?.id && (
        <div className="edit-buttons">
          <button
            className="edit-btn"
            onClick={() => navigate(`/community/update/${post.commIdx}`, { state: { post } })}
          >
            ✏️ 수정
          </button>
          <button className="delete-btn" onClick={handleDelete}>🗑 삭제</button>
        </div>
      )}
    </div>

            <hr className="divider-line" />
            <div className="comment-list">
              <h3>댓글</h3>
              {comments.length > 0 ? (
                comments.map((c, i) => (
                  <div key={i} className="comment-item">
                    <span className="comment-author">{c.username || c.user?.username || "익명"}</span>
                    <span>{c.content}</span>
                  </div>
                ))
              ) : (
                <p>아직 댓글이 없습니다.</p>
              )}
            </div>

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
