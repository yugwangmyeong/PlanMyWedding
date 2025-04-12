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
      if (!email) {
        console.error("이메일이 없습니다.");
        return null;
      }
      const res = await axios.get(`${API_BASE}/user/email/${email}`);
      if (res.data && res.data.userId) {
        console.log("📦 유저 정보:", res.data);
        return res.data.userId;
      } else {
        console.error("📛 유저 정보를 찾을 수 없습니다.");
        return null;
      }
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
      await fetchPost(); // 게시글 먼저 불러오기
      await fetchComments(); // 댓글 불러오기
    };
    init();
  }, [postId]); // ✅ post는 제거하여 무한 호출 방지
  
  // post가 로드된 이후 user 정보 초기화
  useEffect(() => {
    const setupUser = async () => {
      if (post?.user && token) {
        const userInfo = getEmailFromToken(token);
        if (!userInfo) return;
  
        setCurrentUsername(userInfo.username);
  
        const userId = await getUserIdFromEmail(userInfo.email);
        setCurrentUserId(userId);
      }
    };
  
    setupUser();
  }, [post, token]); // ✅ post 바뀐 후에 user 초기화

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

  


  const handleEdit = () => {
    if (Number(currentUserId) !== post.user?.id) {
      alert("작성자만 수정할 수 있습니다.");
      return;
    }
    navigate(`/community/update/${post.commIdx}`, { state: { post } });
  };

  return (
    <div className="community-container">
      <Header />

      <div className="community-post-wrapper">
        <div className="community-post-header">
          <h2 className="community-heading">커뮤니티</h2>
          <button className="edit-button" onClick={handleEdit}>✏️ 수정</button>
        </div>

        {post ? (
          <>
            <h2 className="post-title">{post.commTitle}</h2>

            <div className="post-meta">
              <span className="post-author">작성자: {post.user?.username || "익명"}</span>
              <span className="post-views">조회수: {post.commViews}</span>
              <span className="post-likes">좋아요: {likes}</span>
            </div>

            
            <div className="post-content">
              <p>{post.commContent}</p>
            </div>

            <div className="post-interactions">
              <button className="like-btn" onClick={handleLike}>❤️ 좋아요</button>
            </div>

            <hr className="divider-line" />

            <div className="comment-section">
              <h3>댓글</h3>

              <div className="comment-list">
                {comments.length > 0 ? (
                  comments.map((c, i) => (
                    <div key={i} className="comment-item">
                      <span className="comment-author">
                        {c.username || c.user?.username || "익명"}
                      </span>
                      <span className="comment-content">{c.content}</span>
                    </div>
                  ))
                ) : (
                  <p className="no-comments">아직 댓글이 없습니다.</p>
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
            </div>
          </>
        ) : (
          <p className="loading-post">게시글을 불러오는 중입니다...</p>
        )}
      </div>
    </div>
  );
};

export default CommunityPost;
