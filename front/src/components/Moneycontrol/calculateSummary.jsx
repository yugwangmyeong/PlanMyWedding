// calculateSummary.js

export const calculateSummary = (items) => {
    const totalBudget = items.reduce((sum, item) => sum + Number(item.budget || 0), 0);
    const totalSpent = items.reduce((sum, item) => sum + Number(item.spent || 0), 0);
  
    const groomSpent = items
      .filter((item) => item.manager === "신랑")
      .reduce((sum, item) => sum + Number(item.spent || 0), 0);
  
    const brideSpent = items
      .filter((item) => item.manager === "신부")
      .reduce((sum, item) => sum + Number(item.spent || 0), 0);
  
    const togetherSpent = items
      .filter((item) => item.manager === "함께")
      .reduce((sum, item) => sum + Number(item.spent || 0), 0);
  
    return {
      totalBudget,
      totalSpent,
      groomSpent,
      brideSpent,
      togetherSpent,
    };
  };
  