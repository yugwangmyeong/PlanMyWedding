import { useEffect, useState } from "react";
import { getWeddingDate } from "./WeddingApi";

const useWeddingDate = () => {
  const [weddingDate, setWeddingDate] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasWeddingDate, setHasWeddingDate] = useState(false);

  useEffect(() => {
    const fetchWeddingData = async () => {
      try {
        const data = await getWeddingDate();
        if (data && data.reservedAt) {
          setWeddingDate(data.reservedAt);
          setHasWeddingDate(true);
        } else {
          setWeddingDate(null);
          setHasWeddingDate(false);
        }
      } catch (error) {
        //console.error("useWeddingDate 에러:", error);
        setWeddingDate(null);
        setHasWeddingDate(false);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchWeddingData();
  }, []);

  return { weddingDate, isLoaded, hasWeddingDate };
};

export default useWeddingDate;
