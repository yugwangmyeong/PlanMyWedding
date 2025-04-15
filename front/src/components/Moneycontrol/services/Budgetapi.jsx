import api from "./Api"; // Axios 인스턴스 (토큰 포함된)

export const updateBudgetItem = async (item) => {
  if (!item.bgIdx) {
    //console.warn("❌ bgIdx 없음 - 업데이트 요청 생략");
    return;
  }
  //console.log("📦 보내는 item (PUT):", item); // 디버깅용
  return await api.put(`/budget/update/${item.bgIdx}`, item); // ← 여기도 /update 붙이기
};


export const deleteBudgetItem = async (bgIdx) => {
  //console.log("🧨 삭제 요청 bgIdx:", bgIdx);
  return await api.delete(`/budget/deletebudget/${bgIdx}`);
};

export const getBudgetList = async () => {
  return await api.get("/budget/list");
};

export const createBudgetItem = async (item) => {
  return await api.post("/budget/createbudget", item);
};
