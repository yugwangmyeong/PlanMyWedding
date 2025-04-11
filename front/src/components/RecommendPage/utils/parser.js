// "50만원" → 500000 같은 변환
export const parseWon = (str) => {
    if (typeof str === "string" && str.includes("만원")) {
      return parseInt(str.replace("만원", "").trim()) * 10000;
    }
    return parseInt(str.replace(/[^0-9]/g, ""));
  };
  
  // "300명 이상", "750대 이상" 같은 값에서 숫자만 추출 → 300, 750
  export const parseNumber = (str) => {
    const num = str.match(/\d+/); // 숫자만 뽑음
    return num ? parseInt(num[0]) : 0;
  };
  