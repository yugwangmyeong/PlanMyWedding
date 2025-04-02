import React from "react";
import "./styles/Community.css";

export const Screen = () => {
  return (
    <div className="screen">
      <header className="header">
        <nav className="category-menu">
          <div>드레스</div>
          <div>메이크업</div>
          <div>스튜디오</div>
          <div>신혼여행</div>
          <div>전체</div>
          <div>웨딩홀</div>
        </nav>
      </header>

      <section className="community-section">
        <h2>커뮤니티</h2>
        <p>만족도 높은 고객님들의 최신 사진 리뷰</p>
      </section>

      <div className="post-list">
        <PostCard
          category="웨딩홀"
          title="광주 인기 웨딩홀 드메르 식장 후기"
          description="드메르는 인기가 많아서 이미 올해는 예약이 마감 되었다고 해요..."
          likes={77}
          comments={10}
        />
        <PostCard
          category="스튜디오"
          title="광주웨딩드레스 다양한 스타일 르노브해밀"
          description="최근에 결혼 준비하시는 분들을 보면 광주웨딩드레스에서 괜찮은..."
          likes={50}
          comments={12}
        />
      </div>
    </div>
  );
};

// PostCard 컴포넌트 분리
const PostCard = ({ category, title, description, likes, comments }) => {
  return (
    <div className="post-card">
      <h3>
        {category} - {title}
      </h3>
      <p>{description}</p>
      <div className="post-actions">
        <span>❤️ {likes}</span>
        <span>💬 {comments}</span>
      </div>
    </div>
  );
};

export default Screen;