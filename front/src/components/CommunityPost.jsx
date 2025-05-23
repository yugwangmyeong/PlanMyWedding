import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/communitypost.css";
import Header from "./Header";
import Footer from "./Footer";


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
  const [liked, setLiked] = useState(false); // 좋아요 여부
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  // 댓글 페이지네이션 관련
  const [commentPage, setCommentPage] = useState(1);

  const updateLockRef = useRef(false);
  const token = sessionStorage.getItem("token");

  // JWT 토큰에서 이메일과 username 추출
  const getEmailFromToken = (token) => {
    if (!token) return null;
    try {
      const payload = JSON.parse(
        atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
      );
      return { email: payload.sub, username: payload.username };
    } catch (error) {
      //console.error("토큰 파싱 실패", error);
      return null;
    }
  };

  // 이메일로부터 userId 조회
  const getUserIdFromEmail = async (email) => {
    try {
      const res = await axios.get(`${API_BASE}/user/email/${email}`);
      return res.data.userId;
    } catch (error) {
      //console.error("📛 userId 조회 실패:", error);
      return null;
    }
  };

  // 로그인 상태 초기화
  const initUser = async () => {
    if (!token) return;
    const userInfo = getEmailFromToken(token);
    if (!userInfo) return;
    setCurrentUsername(userInfo.username);
    const id = await getUserIdFromEmail(userInfo.email);
    setCurrentUserId(id);
  };

  // 게시글 조회
  const fetchPost = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/${postId}`);
      setPost(res.data);
      setLikes(res.data.commLikes);
    } catch (error) {
      //console.error("📛 게시글 불러오기 실패:", error);
    }
  };

  // 댓글 목록 조회
  const fetchComments = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/${postId}/comment`);
      if (Array.isArray(res.data)) {
        setComments(res.data.filter((comment) => comment != null));
      } else {
        //console.error("Unexpected comment data format:", res.data);
        setComments([]);
      }
    } catch (err) {
      //console.error("📛 댓글 불러오기 실패:", err);
      setComments([]);
    }
  };

  // 조회수 증가 (한 번만 실행)
  const viewHasIncreased = useRef(false);
  useEffect(() => {
    const increaseViews = async () => {
      if (viewHasIncreased.current) return;
      try {
        await axios.put(`${BASE_URL}/${postId}/view`);
        viewHasIncreased.current = true;
      } catch (error) {
        //console.error("조회수 증가 실패:", error);
      }
    };
    increaseViews();
  }, [postId]);

  // 초기 데이터 로드
  useEffect(() => {
    const init = async () => {
      await Promise.all([fetchPost(), fetchComments(), initUser()]);
    };
    init();
  }, [postId]);

  // 사용자가 좋아요 눌렀는지 여부를 가져오는 함수 (엔드포인트 구현 필요)
  const fetchLikedStatus = async () => {
    if (!currentUserId) return;
    try {
      const res = await axios.get(`${BASE_URL}/${postId}/like-status`, {
        params: { userId: currentUserId },
      });
      // 백엔드가 { liked: true } 형식으로 반환한다고 가정
      setLiked(res.data.liked);
    } catch (error) {
      //console.error("좋아요 상태 조회 실패:", error);
    }
  };

  // currentUserId와 post가 있을 때 좋아요 상태를 불러옴
  useEffect(() => {
    if (currentUserId && post) {
      fetchLikedStatus();
    }
  }, [currentUserId, post]);

  // 좋아요 토글
  const handleLike = async () => {
    if (!currentUserId) {
      alert("로그인이 필요합니다.");
      return;
    }
    try {
      const res = await axios.put(`${BASE_URL}/${postId}/like`, null, {
        params: { userId: currentUserId },
      });
      setLikes(res.data.commLikes);
      setLiked((prev) => !prev);
    } catch (error) {
      //console.error("📛 좋아요 토글 실패:", error);
    }
  };

  // 새 댓글 작성
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
      const res = await axios.post(
        `${BASE_URL}/${postId}/comment`,
        commentData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments((prevComments) => [...prevComments, res.data]);
      setNewComment("");
    } catch (error) {
      //console.error("📛 댓글 작성 실패:", error);
    }
  };

  // 댓글 편집 모드 진입
  const handleStartEdit = (comment) => {
    setEditingCommentId(comment.commentId);
    setEditedContent(comment.content);
  };

  // 댓글 수정: 저장 버튼 클릭 시 (저장 후 전체 페이지 새로고침)
  const handleUpdateComment = async (commentId) => {
    if (!editedContent.trim()) {
      alert("수정할 내용을 입력하세요.");
      return;
    }
    if (isUpdating) return;
    setIsUpdating(true);
    setEditingCommentId(null);
    const currentContent = editedContent;
    setEditedContent("");
    try {
      await axios.put(
        `${BASE_URL}/comment/${commentId}`,
        { userId: currentUserId, content: currentContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      //console.error("댓글 수정 실패:", error);
    } finally {
      setIsUpdating(false);
      window.location.reload();
    }
  };

  // 댓글 삭제
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await axios.delete(`${BASE_URL}/comment/${commentId}`, {
        params: { userId: currentUserId },
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments((prevComments) =>
        prevComments.filter((c) => c.commentId !== commentId)
      );
    } catch (error) {
      //console.error("댓글 삭제 실패:", error);
    }
  };

  // ===== 댓글 페이지네이션 =====
  const commentsPerPage = 20;
  const indexOfLastComment = commentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);
  const totalCommentPages = Math.ceil(comments.length / commentsPerPage);
  const commentPageNumbers = Array.from({ length: totalCommentPages }, (_, i) => i + 1);
  const commentPageGroup = Math.floor((commentPage - 1) / 10);
  const commentStartPage = commentPageGroup * 10 + 1;
  const commentEndPage = Math.min(commentStartPage + 9, totalCommentPages);
  const visibleCommentPageNumbers = commentPageNumbers.slice(commentStartPage - 1, commentEndPage);

  const handleCommentPageClick = (number) => {
    setCommentPage(number);
  };

  // 수정하기 버튼 클릭 시 작성자 체크
  const handleEditClick = () => {
    if (!post.user || post.user.id !== currentUserId) {
      alert("작성자가 아닙니다.");
      return;
    }
    navigate(`/community/update/${post.commIdx}`, { state: { post } });
  };

  return (
    <div className="community-container">
      <Header />
      <div className="community-post-wrapper">
        <div className="community-header">
          <h2 className="community-heading">커뮤니티</h2>
          <button className="edit-btn" onClick={handleEditClick}>
            수정하기
          </button>
        </div>
        {post ? (
          <>
            <div className="post-title-container">
              <h2 className="post-title">{post && post.commTitle}</h2>
              {post && (
                <span className="post-date">
                  {new Date(post.createdAt).toLocaleString()}
                </span>
              )}
            </div>
            <div className="post-metaPost">
              <span className="post-service">
                작성자: {post.user?.username || "익명"}
              </span>
              <div className="meta-right">
                <span>조회수: {post.commViews}</span>
                <span>좋아요: {likes}</span>
                <span className="post-comments">💬 {post.commentCount || 0}</span>
              </div>
            </div>
            {post.commFile && (
              <div className="post-images">
                <img
                  src={post.commFile}
                  alt="업로드 이미지"
                  className="post-image-preview"
                />
              </div>
            )}
            <div className="post-content-a">
              <p>{post.commContent}</p>
            </div>
            <div className="post-interactions">
              <div className="like-section">
                <button
                  className={`like-btn ${liked ? "liked" : ""}`}
                  onClick={handleLike}
                >
                  ❤️ 좋아요
                </button>
              </div>
            </div>
            <hr className="divider-line" />
            {/* 댓글 영역 */}
            <div className="comment-list">
              <h3>
                댓글 ({comments.length})
              </h3>
              {currentComments && currentComments.length > 0 ? (
                currentComments.map((c) => (
                  <div key={c.commentId} className="comment-item">
                    {/* 왼쪽: 작성자 영역 */}
                    <div className="comment-author">
                      {c.user?.username || "익명"}
                    </div>
                    
                    {/* 중앙: 댓글 내용 영역 */}
                    <div className="comment-content-container">
                      {editingCommentId === c.commentId ? (
                        <input
                          type="text"
                          value={editedContent}
                          onChange={(e) => setEditedContent(e.target.value)}
                          className="comment-edit-input"
                        />
                      ) : (
                        <span className="comment-content">{c.content}</span>
                      )}
                    </div>
                    
                    {/* 오른쪽: 액션 버튼 영역 - 현재 댓글의 작성자일 때만 표시 */}
                    {c.user?.id === currentUserId && (
                      <div className="comment-actions">
                        {editingCommentId === c.commentId ? (
                          <>
                            <button onClick={() => handleUpdateComment(c.commentId)}>저장</button>
                            <button
                              onClick={() => {
                                setEditingCommentId(null);
                                setEditedContent("");
                              }}
                            >
                              취소
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => handleStartEdit(c)}>수정</button>
                            <button onClick={() => handleDeleteComment(c.commentId)}>삭제</button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>아직 댓글이 없습니다.</p>
              )}
              {totalCommentPages > 1 && (
                <div className="comment-pagination">
                  <button
                    disabled={commentStartPage === 1}
                    onClick={() => setCommentPage(commentStartPage - 10)}
                  >
                    &laquo;
                  </button>
                  {visibleCommentPageNumbers.map((number) => (
                    <button
                      key={number}
                      className={`page-btn ${commentPage === number ? "active" : ""}`}
                      onClick={() => handleCommentPageClick(number)}
                    >
                      {number}
                    </button>
                  ))}
                  <button
                    disabled={commentEndPage >= totalCommentPages}
                    onClick={() => setCommentPage(commentStartPage + 10)}
                  >
                    &raquo;
                  </button>
                </div>
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
      <Footer/>
    </div>
  );
};

export default CommunityPost;
