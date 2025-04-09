import { useEffect, useState } from "react";
import axios from "axios";
import { getWeddingDate } from "./WeddingApi";

const useWeddingDate = () => {
    const [weddingDate, setWeddingDate] = useState(null); // 결혼식 날짜
    const [isLoaded, setIsLoaded] = useState(false); // 로딩 상태
    const [error, setError] = useState(null); // 오류 상태
  
    useEffect(() => {
      const fetchWeddingDate = async () => {
        try {
          // API 호출
          const data = await getWeddingDate();
  
          if (data?.reservedAt) {
            // 결혼식 날짜가 있으면 설정
            setWeddingDate(data.reservedAt);
          } else {
            // 결혼식 날짜가 없으면 null로 설정
            setWeddingDate(null);
          }
        } catch (err) {
          // 오류가 발생하면 error 상태 설정
          if (err.response) {
            // 서버 응답 오류 (ex: 500, 404)
            setError(`Error: ${err.response.data || err.response.statusText}`);
          } else {
            // 네트워크 오류 등
            setError("Network Error: Unable to fetch wedding date.");
          }
        } finally {
          setIsLoaded(true); // 데이터 로딩이 끝났음
        }
      };
  
      fetchWeddingDate();
    }, []); // 처음 한번만 실행
  
    return {
      weddingDate,
      isLoaded,
      hasWeddingDate: !!weddingDate, // 결혼식 날짜가 있는지 여부
      error,
    };
  };
  
  export default useWeddingDate;