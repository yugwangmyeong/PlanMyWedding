import './styles/BbbbFrame.css';


function BbbbFrame() {
  return (
    <div className="bbbb-frame">
      <div className="rect-bg" />
      <div className="rect-bar" />
      <span className="percent">0%</span>
      <span className="title">웨딩홀</span>
      <div className="rect-card" />
      <span className="question">웨딩홀을 예약 하셨나요?</span>
      
      <div className="option-group">
        <div className="option-circle" />
        <span className="option-text">네</span>
      </div>
      <div className="option-group">
        <div className="option-circle" />
        <span className="option-text">아니요</span>
      </div>

      <div className="divider" />

      <div className="header-group">
        <span className="header-title">마이페이지 커뮤니티</span>
        <span className="header-nickname">닉네임</span>
        <span className="header-plan">
          Plan my wedding<br />D - 240
        </span>
      </div>
    </div>
  );
}

export default BbbbFrame;
