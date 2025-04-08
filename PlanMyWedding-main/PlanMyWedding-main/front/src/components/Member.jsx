import React from "react";
import Header from "./Header";
import "./styles/Member.css"; // CSS 불러오기



const Member = () => {
  return (
    <div>
      <Header />

      <div className="container-wrapper">
        
        {/* 왼쪽 박스 */}
        <div className="left-container">
          <button className="current-btn">회원정보</button><br></br>
          <button className="btn1">설정</button>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <button className="btn2">로그아웃 하기</button><br></br>
          <button className="btn2">회원탈퇴</button>
        </div>

        {/* 오른쪽 박스 */}
        <div className="right-container">
          <div className="title">회원정보 변경</div>
          <br></br>
          <br></br>
          
          {/* 입력 필드들 */}
          <div className="form-group-row">
            <label>이메일</label>
            <input type="email" placeholder="example@domain.com" value="wedding@naver.com" disabled />
          </div>

          <div className="form-group-row">
            <label>닉네임</label>
            <input type="text" placeholder="사용할 닉네임 입력" value="예비부부" />
          </div>

          <div className="form-group-row">
            <label>비밀번호</label>
            <input type="password" placeholder="비밀번호 입력" />
          </div>

          <div className="form-group-row">
            <label>비밀번호 확인</label>
            <input type="password" placeholder="비밀번호 다시 입력" />
          </div>

          <div className="button-wrapper">
            <button className="submit-btn">수정하기</button>
          </div>

        </div>
      </div>

      <></>

    </div>
  );
};

export default Member;
