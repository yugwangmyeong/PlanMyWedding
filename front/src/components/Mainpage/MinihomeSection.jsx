import React from "react";
import pictureDataList from "./pictureData";
import "./minihomesection.css";
import MinihomeSlider from "./MinihomeSlider";
const MinihomeSection = ({ templates }) => {
  const pictureData = pictureDataList.find(
    (item) => item.miniItem === "대기화면"
  );

  return (
    <div className="minihome-wrapper">
      <h3 className="minihome-title">미니홈</h3>
      <div className="minihome-section">
        <div className={`minihome-content ${pictureData?.miniLoc}`}>
          {/* ✅ 템플릿 슬라이더 컴포넌트로 교체 */}
          <MinihomeSlider templates={templates} />
        </div>
      </div>
    </div>
  );
};

export default MinihomeSection;
