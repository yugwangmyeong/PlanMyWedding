import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import "./styles/communitywrite.css";
import Header from "./Header";

const CommunityWrite = () => {
  const pictureIcon = "/images/picture.jpg";
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const editingPost = location.state?.post;
  const isEditMode = !!editingPost;

  const [title, setTitle] = useState(editingPost?.commTitle || "");
  const [content, setContent] = useState(editingPost?.commContent || "");
  const [service, setService] = useState(editingPost?.commService || "");
  const [region, setRegion] = useState(editingPost?.commRegion || "");
  const [images, setImages] = useState([]);
  const [userId, setUserId] = useState(null);
  const token = sessionStorage.getItem("token");

  const maxTitleLength = 100;
  const maxContentLength = 2000;
  const maxImageCount = 1;

  const getEmailFromToken = (token) => {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      return payload.sub;
    } catch {
      return null;
    }
  };

  const getUserIdFromEmail = async (email) => {
    try {
      const res = await axios.get(`http://localhost:8081/boot/api/community/user/email/${email}`);
      return res.data.userId;
    } catch (err) {
      console.error("📛 userId 조회 실패:", err);
      return null;
    }
  };

  useEffect(() => {
    const fetchUserId = async () => {
      if (!token) return;
      const email = getEmailFromToken(token);
      if (!email) return;
      const fetchedUserId = await getUserIdFromEmail(email);
      setUserId(fetchedUserId);
      console.log("✅ 로그인 userId:", fetchedUserId);
    };
    fetchUserId();
  }, [token]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const maxFileSize = 10 * 1024 * 1024; // 10MB

    if (files.some(file => file.size > maxFileSize)) {
      alert("파일 크기는 최대 10MB까지 업로드 가능합니다.");
      return;
    }

    if (images.length + files.length > maxImageCount) {
      alert(`최대 ${maxImageCount}개까지 업로드할 수 있어요.`);
      return;
    }

    setImages((prev) => [...prev, ...files]);
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("userId", userId);
  formData.append("service", service);
  formData.append("region", region);

  if (images.length > 0) {
    formData.append("file", images[0]);  // 이미지 파일 추가
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.put(
      `http://localhost:8081/boot/api/community/${id}`,  // 수정하려는 게시글 ID
      formData,
      config
    );

    alert("게시글이 수정되었습니다!");
    if (res.data && res.data.commIdx) {
      navigate(`/community/post/${res.data.commIdx}`);
    } else {
      console.error("commIdx가 응답에 없습니다:", res.data);
    }
  } catch (error) {
    console.error("요청 실패:", error);
    alert("게시글 수정 중 오류 발생");
  }
};

  

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.delete(`http://localhost:8081/boot/api/community/${id}`, config);

        if (res.status === 200) {
          alert("삭제 완료!");
          navigate("/community");
        } else {
          alert("삭제 실패!");
          console.error("삭제 오류:", res);
        }
      } catch (err) {
        alert("삭제 실패!");
        console.error("삭제 오류:", err);
      }
    }
  };

  return (
    <div className="community-container">
      <Header />
      <div className="community-main-wrapper">
        <h2>커뮤니티 {isEditMode ? "수정하기" : "글쓰기"}</h2>

        <form onSubmit={handleSubmit} className="community-write-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="제목을 입력해주세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="options-row">
            <select value={service} onChange={(e) => setService(e.target.value)} className="option-select" required>
              <option value="">서비스</option>
              <option value="웨딩홀">웨딩홀</option>
              <option value="스튜디오">스튜디오</option>
              <option value="드레스">드레스</option>
              <option value="메이크업">메이크업</option>
              <option value="기타">기타</option>
            </select>

            <select value={region} onChange={(e) => setRegion(e.target.value)} className="option-select" required>
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
          </div>

          <div className="form-group no-label">
            <textarea
              placeholder="내용을 입력해주세요..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="8"
              required
            />
          </div>

          <div className="image-upload-container">
            <label htmlFor="imageUpload" className="image-upload-label">
              <img src={pictureIcon} alt="사진 아이콘" className="image-icon" />
              <span>{images.length}/1</span>
            </label>
            <input
              type="file"
              id="imageUpload"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>

          {images.length > 0 && (
            <div className="image-preview-container">
              {images.map((file, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(file)}
                  alt={`preview-${idx}`}
                  className="preview-image"
                />
              ))}
            </div>
          )}

          <div className="button-group">
            <div className="left-buttons">
              <button type="submit" className="submit-btn">
                {isEditMode ? "수정하기" : "작성하기"}
              </button>
              <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>
                취소
              </button>
            </div>

            {isEditMode && (
              <button
                type="button"
                className="delete-btn"
                onClick={handleDelete}
              >
                🗑 삭제
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommunityWrite;
