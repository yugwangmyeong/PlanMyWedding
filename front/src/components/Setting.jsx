import React from "react";
import Header from "./Header";
import "./styles/Setting.css"; // CSS 불러오기



const Setting = () => {
  return (
    <div>
      <Header />

      <div className="container-wrapper">
        
        {/* 왼쪽 박스 */}
        <div className="left-container">
          <button className="btn1">회원정보</button><br></br>
          <button className="current-btn">설정</button>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <button className="btn2">로그아웃 하기</button><br></br>
          <button className="btn2">회원탈퇴</button>
        </div>

        {/* 오른쪽 박스 */}
        <div className="right-container">
          <div className="title">설정</div>
          <br></br>
          <br></br>

          <div className="sub-title">캘린더 설정</div>
          <br></br>
          <br></br>
          {/* 캘린더 설정 */}
          <div className="setting-section">
            <span className="setting-label">일주일 시작요일 선택</span>
            <div className="toggle-wrapper">
              <input type="checkbox" id="chk1" className="toggle-input" />
              <label htmlFor="chk1" className="toggle-label"></label>
            </div>
          </div>   



         


        </div>
      </div>

    </div>
  );
};

export default Setting;
