import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/communitywrite.css";
import toggleMenuIcon from "./styles/assets/toggleMenu.png";
import Header from "./Header";

const CommunityWrite = () => {
  const pictureIcon = "/images/picture.jpg";
  const navigate = useNavigate();

  // 헤더 관련 상태
  const [isMypageOpen, setIsMypageOpen] = useState(false);
  const toggleMypageMenu = () => {
    setIsMypageOpen(!isMypageOpen);
  };

  // 글 제목, 내용, 카테고리 등 상태 관리
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [service, setService] = useState("");
  const [region, setRegion] = useState("");
  const [images, setImages] = useState([]);

  // 글 작성 처리: 작성하기 버튼 클릭 시, 데이터를 전달하며 CommunityPost로 이동
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("제목:", title);
    console.log("내용:", content);
    console.log("카테고리:", category);
    console.log("서비스:", service);
    console.log("지역:", region);
    console.log("이미지 개수:", images.length);

    // 예시로 글 ID를 1로 설정(실제 앱에서는 백엔드에서 생성한 ID 사용)
    navigate("/community/post/1", {
      state: {
        post: {
          title,
          content,
          category,
          service,
          region,
          images,
        },
      },
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    // 기존 이미지 + 새로 선택한 이미지 총합이 15개를 넘으면 제한
    if (images.length + files.length > 15) {
      alert("이미지는 최대 15개까지 등록할 수 있습니다.");
      return;
    }
    setImages((prev) => [...prev, ...files]);
  };

  return (
    <div className="community-container">
      <Header />

      {/* 커뮤니티 글 작성 폼 영역 */}
      <div className="community-main-wrapper">
        <h2>커뮤니티</h2>
        <form onSubmit={handleSubmit} className="community-write-form">
          {/* 제목 */}
          <div className="form-group">
            <label htmlFor="title"></label>
            <input
              type="text"
              id="title"
              placeholder="제목을 입력해주세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* (선택)서비스 & (선택)지역을 한 줄에 배치 */}
          <div className="options-row">
            <select
              className="option-select"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option value="">{"(선택)서비스"}</option>
              <option value="웨딩홀">웨딩홀</option>
              <option value="스튜디오">스튜디오</option>
              <option value="드레스">드레스</option>
              <option value="메이크업">메이크업</option>
            </select>

            <select
              className="option-select"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="">{"(선택)지역"}</option>
              <option value="광주">광주</option>
              <option value="서울">서울</option>
              <option value="경기">경기</option>
              <option value="인천">인천</option>
              <option value="부산">부산</option>
              <option value="경남">경남</option>
              <option value="경북">경북</option>
              <option value="대구">대구</option>
              <option value="충남">충남</option>
              <option value="전북">전북</option>
              <option value="충북">충북</option>
              <option value="강원">강원</option>
              <option value="대전">대전</option>
              <option value="울산">울산</option>
              <option value="세종">세종</option>
              <option value="제주">제주</option>
            </select>
          </div>

          <div className="form-group no-label">
            <textarea
              id="content"
              placeholder="💍당신의 소중한 결혼 준비 경험을 공유해주세요!💍
            웨딩홀, 스드메, 신혼여행까지! 결혼을 준비하면서 직접 경험한 서비스나 업체기 있으신가요?
            ✔️만족했던 부분
            ✔️아쉬웠던 점
            ✔️꿀팁까지! ✨❤️
            여러분의 솔직한 리뷰가 예비 신혼부부들에게 큰 도움이 됩니다. 🤗✨
            지금 바로 리뷰를 남겨주세요! 💌
            
            ※ 주제에 맞지 않는 글이나 커뮤니티 이용정책에 위배되는 글은 신고의 대상이 됩니다.
            ※ 일정 수 이상의 신고를 받으면 작성한 글이 숨김 및 삭제될 수 있습니다."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          {/* 사진 업로드 */}
          <div className="image-upload-container">
            <label htmlFor="imageUpload" className="image-upload-label">
              {/* 아이콘 */}
              <img src={pictureIcon} alt="사진 아이콘" className="image-icon" />
              {/* 현재 이미지 개수 / 최대 개수 */}
              <span>{images.length}/15</span>
            </label>
            <input
              type="file"
              id="imageUpload"
              multiple
              accept="image/*" // 이미지 파일만 선택 가능
              onChange={handleImageChange}
              style={{ display: "none" }} // 숨기고 label 클릭으로 트리거
            />
          </div>

          {/* 등록/취소 버튼 */}
          <div className="button-group">
            <button type="submit" className="submit-btn">
              작성하기
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => window.history.back()}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommunityWrite;
