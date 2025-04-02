import React from 'react';
import Header from '../components/Header';
import './styles/Community_write.css';

const Community_write = () => {
  return (
    <div className="community-page">
      <Header /> {/* 헤더 위치 유지 */}
      <div className="write-container">
        <h2 className="title">커뮤니티</h2>
        <p className="char-count">0 / 15</p>
        
        <input type="text" className="input-title" placeholder="제목을 입력해주세요." />

        <div className="select-box">
          <select>
            <option selected disabled>(선택) 서비스</option>
            <option>웨딩홀</option>
            <option>드레스</option>
            <option>메이크업</option>
            <option>스튜디오</option>
            <option>신혼여행</option>
          </select>
          
          <select>
            <option selected disabled>(선택) 지역</option>
            <option>서울</option>
            <option>부산</option>
            <option>대구</option>
            <option>광주</option>
            <option>대전</option>
          </select>
        </div>

        <textarea className="content-box" placeholder="당신의 소중한 결혼 준비 경험을 공유해주세요!"></textarea>

        <p className="info-text">
          주제에 맞지 않는 글이나 커뮤니티 이용정책에 위배되는 글은 신고의 대상이 됩니다. <br />
          일정 수 이상의 신고를 받으면 작성한 글이 숨김 및 삭제될 수 있습니다.
        </p>

        <button className="submit-btn">등록</button>
      </div>
    </div>
  );
};

export default Community_write;