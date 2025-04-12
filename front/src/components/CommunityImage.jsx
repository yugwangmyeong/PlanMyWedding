import React, { useState, useEffect } from 'react';

const CommunityImage = ({ postId }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [hasError, setHasError] = useState(false);  // 오류 상태

  useEffect(() => {
    if (!postId) {
      setIsLoading(false);  // postId가 없으면 로딩 종료
      setHasError(true);    // 오류 상태로 처리
      return; // 더 이상 진행하지 않음
    }

    const loadImage = async () => {
      try {
        const response = await fetch(`http://localhost:8081/boot/api/community/image/${postId}`);
        if (!response.ok) {
          throw new Error('이미지 로드 실패');
        }

        const contentType = response.headers.get('Content-Type');
        if (!contentType.startsWith('image/')) {
          throw new Error('이미지가 아닙니다');
        }

        const blob = await response.blob();
        const reader = new FileReader();

        reader.onloadend = () => {
          setImageSrc(reader.result);
          setIsLoading(false); // 이미지 로딩 완료
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("이미지 로드 오류:", error);
        setHasError(true);  // 오류 발생 시 상태 변경
        setIsLoading(false); // 로딩 중단
      }
    };

    loadImage();
  }, [postId]);

  if (isLoading) {
    return <div className="loading-spinner">이미지 로딩 중...</div>; // 로딩 중일 때 보여주는 메시지
  }

  if (hasError) {
    return <div className="error-message">이미지를 불러오는 데 실패했습니다.</div>; // 오류 발생 시 보여주는 메시지
  }

  return <img src={imageSrc} alt="Post Image" className="post-image" />;
};

export default CommunityImage;
