export const questionList = [
  {
    id: 1,
    name: "리뷰",
    type: "single",
    question: "예식장 하면 떠오르는 키워드를 작성해 주세요.",
    options: [],
  },
  {
    id: 2,
    name: "대관료",
    type: "single",
    question: "생각하는 대관료를 선택해주세요.",
    options: ["50만원", "100만원", "150만원", "200만원", "250만원", "300만원"],
  },
  {
    id: 3,
    type: "importance",
    question: "대관료에 대해 얼마나 중요하게 생각하는지 선택해주세요. (1일수록 낮음, 10일수록 높음)",
    options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], // 1~10
    weightKey: "rental_fee_weight"
  },
  {
    id: 4,
    name: "식대",
    type: "single",
    question: "생각하는 식대를 선택해주세요.",
    options: ["5만원", "6만원", "7만원", "8만원", "9만원"],
  },
  {
    id: 5,
    type: "importance",
    question: "식대에 대해 얼마나 중요하게 생각하는지 선택해주세요. (1일수록 낮음, 10일수록 높음)",
    options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], // 1~10
    weightKey: "food_price_weight"
  },
  {
    id: 6,
    name: "최소수용인원",
    type: "single",
    question: "예상하는 최소 하객수를 선택해주세요.",
    options: ["50명 이상", "100명 이상", "150명 이상", "200명 이상", "250명 이상"],
  },
  {
    id: 7,
    type: "importance",
    question: "최소 하객수에 대해 얼마나 중요하게 생각하는지 선택해주세요. (1일수록 낮음, 10일수록 높음)",
    options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], // 1~10
    weightKey: "mini_hc_weight"
  },
  {
    id: 8,
    name: "최대수용인원",
    type: "single",
    question: "예상하는 최대 하객수를 선택해주세요.",
    options: ["250명 정도", "500명 정도", "750명 정도", "1000명 정도"],
  },
  {
    id: 9,
    type: "importance",
    question: "최대 하객수에 대해 얼마나 중요하게 생각하는지 선택해주세요. (1일수록 낮음, 10일수록 높음)",
    options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], // 1~10
    weightKey: "limit_hc_weight"
  },
  {
    id: 10,
    name: "주차장",
    type: "single",
    question: "주차장은 어느정도 크기면 좋은지 선택해주세요.",
    options: ["150대 이상", "300대 이상", "450대 이상", "600대 이상", "750대 이상", "900대 이상"],
  },
  {
    id: 11,
    type: "importance",
    question: "주차장의 크기에 대해 얼마나 중요하게 생각하는지 선택해주세요. (1일수록 낮음, 10일수록 높음)",
    options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], // 1~10
    weightKey: "car_park_weight"
  },
];
