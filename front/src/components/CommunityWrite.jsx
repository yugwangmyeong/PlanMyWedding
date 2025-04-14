<<<<<<< HEAD
// src/components/Community/CommunityWrite.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/communitywrite.css";
import toggleMenuIcon from "./styles/assets/toggleMenu.png";
import Header from "./Header";
=======
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import "./styles/communitywrite.css";
import Header from "./Header";
import Footer from "./Footer";
>>>>>>> origin/JSG3

const CommunityWrite = () => {
  const pictureIcon = "/images/picture.jpg";
  const navigate = useNavigate();
<<<<<<< HEAD

  const [isMypageOpen, setIsMypageOpen] = useState(false);
  const toggleMypageMenu = () => setIsMypageOpen(!isMypageOpen);

  // 게시글 정보 상태
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [service, setService] = useState("");
  const [region, setRegion] = useState("");
  const [images, setImages] = useState([]);

  const userId = sessionStorage.getItem("loginId") || "testuser";

  // 이미지 서버 업로드
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8081/api/community/upload", formData);
      return res.data; // 이미지 URL 반환
=======
  const location = useLocation();
  const { id } = useParams(); // 수정할 경우 postId
  const editingPost = location.state?.post;
  const isEditMode = !!editingPost;

  const [title, setTitle] = useState(editingPost?.commTitle || "");
  const [content, setContent] = useState(editingPost?.commContent || "");
  const [service, setService] = useState(editingPost?.commService || "");
  const [region, setRegion] = useState(editingPost?.commRegion || "");
  const [images, setImages] = useState([]);
  const [userId, setUserId] = useState(null);

  const token = sessionStorage.getItem("token");

  // 이메일 추출
  const getEmailFromToken = (token) => {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      return payload.sub;
    } catch {
      return null;
    }
  };

  // 이메일로 userId 조회
  const getUserIdFromEmail = async (email) => {
    try {
      const res = await axios.get(`http://192.168.219.50:8081/boot/api/user/email/${email}`);
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

  // 이미지 업로드
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post("http://192.168.219.50:8081/boot/api/community/upload", formData);
      return res.data;
>>>>>>> origin/JSG3
    } catch (err) {
      console.error("이미지 업로드 실패", err);
      return null;
    }
  };

<<<<<<< HEAD
  // 게시글 작성
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 필수 입력 확인
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
=======
  // 작성 or 수정 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    if (!service || !region) {
      alert("서비스와 지역을 선택해주세요.");
>>>>>>> origin/JSG3
      return;
    }

    const imageUrls = await Promise.all(images.map((img) => handleImageUpload(img)));
<<<<<<< HEAD
    const requestData = {
      commTitle: title,
      commContent: content,
      commFile: imageUrls[0] || "", // 첫 번째 이미지만 대표 썸네일로 저장
      mbId: userId,
    };

    try {
      const res = await axios.post("http://localhost:8081/api/community/write", requestData,{withCredentials: true,});
      
      alert("게시글이 등록되었습니다!");
      navigate(`/community/post/${res.data.commIdx}`);
    } catch (error) {
      console.error("작성 실패", error);
      alert("게시글 작성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 이미지 선택 핸들러
=======

    const requestData = {
      commTitle: title,
      commContent: content,
      commFile: imageUrls[0] || editingPost?.commFile || "",
      userId: userId,
      commService: service,
      commRegion: region
    };

    console.log("📦 최종 요청 데이터:", requestData);

    try {
      if (isEditMode) {
        await axios.put(`http://192.168.219.50:8081/boot/api/community/${id}`, requestData);
        alert("게시글이 수정되었습니다!");
        navigate(`/community/post/${id}`);
      } else {
        const res = await axios.post("http://192.168.219.50:8081/boot/api/community/write", requestData);
        alert("게시글이 등록되었습니다!");
        if (res.data && res.data.commIdx) {
          navigate(`/community/post/${res.data.commIdx}`);
        } else {
          console.error("commIdx가 응답에 없습니다:", res.data);
        }
      }
    } catch (error) {
      console.error("요청 실패:", error);
      alert("게시글 처리 중 오류 발생");
    }
  };

  // 이미지 선택
>>>>>>> origin/JSG3
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 15) {
      alert("최대 15개까지 업로드할 수 있어요.");
      return;
    }
    setImages((prev) => [...prev, ...files]);
  };

<<<<<<< HEAD
  return (
    <div className="community-container">
      <Header />

      <div className="community-main-wrapper">
        <h2>커뮤니티 글쓰기</h2>
=======
  const handleDelete = async () => {
    if (!window.confirm("정말로 게시글을 삭제하시겠습니까?")) {
      return;
    }
  
    try {
      await axios.delete(`http://192.168.219.50:8081/boot/api/community/${id}`);
      alert("게시글이 삭제되었습니다!");
      navigate("/community");  // 삭제 후 게시글 목록 페이지로 이동
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
      alert("게시글 삭제 중 오류 발생");
    }
  };

  return (
    <div className="community-container">
      <Header />
      <div className="community-main-wrapper">
        <h2>커뮤니티 {isEditMode ? "수정하기" : "글쓰기"}</h2>
>>>>>>> origin/JSG3

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
<<<<<<< HEAD
            <select value={service} onChange={(e) => setService(e.target.value)} className="option-select">
              <option value="">서비스</option>
              <option value="웨딩홀">웨딩홀</option>
              <option value="스튜디오">스튜디오</option>
              <option value="드레스">드레스</option>
              <option value="메이크업">메이크업</option>
              <option value="기타">기타</option>
            </select>

            <select value={region} onChange={(e) => setRegion(e.target.value)} className="option-select">
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
=======
            <select value={service} onChange={(e) => setService(e.target.value)} className="option-select" required>
              <option value="">서비스</option>
                {[
                  "웨딩홀", "드레스", "메이크업", "스튜디오", "신혼여행", "신혼집", "혼수", "예물", "청첩장", "부케", "한복", "질문", "기타"
                ].map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
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
>>>>>>> origin/JSG3
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
<<<<<<< HEAD

=======
{/*
>>>>>>> origin/JSG3
          <div className="image-upload-container">
            <label htmlFor="imageUpload" className="image-upload-label">
              <img src={pictureIcon} alt="사진 아이콘" className="image-icon" />
              <span>{images.length}/15</span>
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

<<<<<<< HEAD
          {/* 이미지 미리보기 */}
=======
>>>>>>> origin/JSG3
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
<<<<<<< HEAD

          <div className="button-group">
            <button type="submit" className="submit-btn">작성하기</button>
            <button type="button" className="cancel-btn" onClick={() => window.history.back()}>
              취소
            </button>
          </div>
        </form>
      </div>
=======
*/}
          <div className="button-group">
          <div className="left-buttons">
            <button type="submit" className="submit-btn">
              {isEditMode ? "수정하기" : "작성하기"}
            </button>
            <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>
              취소
            </button>
            </div>
            <div className="right-buttons">
            {isEditMode && (
              <div className="button-group">
                <button type="button" className="delete-btn" onClick={handleDelete}>
                  삭제하기
                </button>
              </div>
            )}
            </div>
          </div>
        </form>
      </div>
      <Footer/>
>>>>>>> origin/JSG3
    </div>
  );
};

export default CommunityWrite;
