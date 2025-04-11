import React from "react";
import pictureDataList from "./pictureData";
import "../styles/minihomesection.css";

const MinihomeSection = () => {
  const pictureData = pictureDataList.find(item => item.miniItem === "대기화면");

  return (
    <div className="minihome-wrapper">
      <h3 className="minihome-title">미니홈</h3>
      <div className="minihome-section">
        <div className={`minihome-content ${pictureData?.miniLoc}`}>
          {pictureData ? (
            <>
              <img
                className="minihome-image"
                src={pictureData.miniImg}
                alt={pictureData.miniItem}
              />
              <p className="minihome-text">{pictureData.miniArticle}</p>
            </>
          ) : (
            <p className="minihome-text">준비 중입니다 😊</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MinihomeSection;
