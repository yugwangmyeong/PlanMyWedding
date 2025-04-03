import React from "react";
import "./styles/Community_write.css";

const text_wrapper = 
<div className="text-wrapper">
          (선택) 서비스 ▼
        </div>
const Community_write = () => {
  return (
    <div className="screen">
      <div className="overlap">
        

        <div className="div">
          (선택) 지역 ▼
        </div>

        <div className="rectangle" />

        <p className="p">
          💍 당신의 소중한 결혼 준비 경험을 공유해주세요! <br />
          💍 웨딩홀, 스드메, 신혼여행까지! <br />
          결혼을 준비하면서 직접 경험한 서비스나 업체가 있으신가요? <br />
          √ 만족했던 부분 <br />
          √ 아쉬웠던 점 <br />
          √ 꿀팁까지! <br />
          여러분의 솔직한 리뷰가 예비 신혼부부들에게 큰 도움이 됩니다. 😊✨ <br />
          지금 바로 리뷰를 남겨주세요! 💌<br />
          ※ 주제에 맞지 않는 글이나 커뮤니티 이용정책에 위배되는 글은 신고의 대상이 됩니다. <br />
          ※ 일정 수 이상의 신고를 받으면 작성한 글이 숨김 및 삭제될 수 있습니다.
        </p>
      </div>

      <div className="text-wrapper-3">커뮤니티</div>
      <div className="register-button">등록</div> {/* 🔹 버튼 추가 */}

      <div className="text-wrapper-4">제목을 입력해주세요.</div>

      <div className="rectangle-2" />
      <div className="rectangle-3" />

      <div className="group">
        <div className="text-wrapper-5">마이페이지 커뮤니티</div>

        <div className="overlap-group-2">
          <div className="OO"> 차OO 님</div>
        </div>

        <p className="plan-my-wedding-d">
          <span className="span">Plan my wedding<br /></span>
          <span className="text-wrapper-6">D - 240</span>
        </p>
      </div>
    </div>
  );
};

export default Community_write;