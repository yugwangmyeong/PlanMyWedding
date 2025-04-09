import { useEffect, useState } from "react";
import axios from "axios";
import { getWeddingDate } from "./WeddingApi";

const useWeddingDate = () => {
    const [weddingDate, setWeddingDate] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchWeddingDate = async () => {
        try {
          const data = await getWeddingDate();
          setWeddingDate(data?.reservedAt || null);
        } catch (err) {
          setError(err);
        } finally {
          setIsLoaded(true);
        }
      };
  
      fetchWeddingDate();
    }, []);
  
    return {
      weddingDate,
      isLoaded,
      hasWeddingDate: !!weddingDate,
      error,
    };
  };
  
  export default useWeddingDate;