import React from 'react';
import Header from '../components/Header';
import './styles/Community.css';

function Community() {
    return (
        <div className="community-page">
            <Header />
            <div className="community-container">
                {/* 사이드바 */}
                <aside className="sidebar">
                    <ul>
                        <li className="active">전체</li>
                        <li>웨딩홀</li>
                        <li>드레스</li>
                        <li>메이크업</li>
                        <li>스튜디오</li>
                        <li>신혼여행</li>
                    </ul>
                </aside>

                {/* 메인 컨텐츠 */}
                <div className="main-content">
                    {/* 검색창과 글작성 버튼 */}
                    <header className="header">
                        <input type="text" placeholder="관심있는 내용을 검색해보세요!" className="search-bar" />
                        <button className="write-button">글작성</button>
                    </header>

                    {/* 이미지 갤러리 */}
                    <section className="image-gallery">
                        <h2>고객님들의 최신 사진 리뷰</h2>
                        <div className="images">
                            <img src="image1.jpg" alt="웨딩홀" />
                            <img src="image2.jpg" alt="드레스" />
                        </div>
                    </section>

                    {/* 게시글 목록 */}
                    <section className="post-list">
                        {[
                            {
                                category: '웨딩홀 - 드메르웨딩홀 광주',
                                title: '광주 인기 웨딩홀 드메르 식장 후기',
                                description: '드메르는 인기가 많아서 이미 올해는 예약이 마감 되었다고 해요...',
                                likes: 77,
                                comments: 10,
                            },
                            {
                                category: '스튜디오 - 르노브해밥 웨딩스튜디오',
                                title: '광주웨딩드레스 다양한 스타일 르노브해밥',
                                description: '최근에 결혼 준비하시는 분들은 르노브해밥을 찾는 추세입니다...',
                                likes: 89,
                                comments: 14,
                            },
                        ].map((post, index) => (
                            <article key={index} className="post-item">
                                <h3>{post.category}</h3>
                                <h2>{post.title}</h2>
                                <p>{post.description}</p>
                                <div className="post-meta">
                                    <span>👍 {post.likes}</span>
                                    <span>💬 {post.comments}</span>
                                </div>
                            </article>
                        ))}
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Community;