import React, { useState, useEffect } from "react";

export default function BgChange({ closeBgChange }) {
  const [bgData, setBgData] = useState([]);
  const closeBgChangeHandler = () => {
    closeBgChange();
  };

  const fetchBgData = async () => {
    try {
      const response = await fetch(
        "https://ddragon.leagueoflegends.com/cdn/13.24.1/data/ko_KR/champion.json"
      );

      if (response.ok) {
        const data = await response.json();
        setBgData(Object.values(data.data));
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.log("Error fetching champion data: ", error);
    }
  };

  useEffect(() => {
    fetchBgData();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div
            className="absolute index-0 inset-0 bg-gray-900 opacity-75"
            onClick={() => closeBgChange()}
          ></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div className="inline-block w-full h-[500px] text-left transform transition-all sm:my-8 sm:align-middle sm:w-4/5">
          <div className="w-full h-full bg-lol-dark-blue flex flex-col border-4 border-lol-gold1">
            {/* Title and Close Button */}
            <div className="w-full h-1/6 border-b-4 border-lol-gold1 bg-lol-dark-blue flex justify-between items-center">
              <div className="text-3xl mt-1 ml-5 text-lol-gold">
                배경화면 변경
              </div>
              <div
                className="close absolute cursor-pointer right-0 top-0"
                onClick={closeBgChangeHandler}
              ></div>
            </div>
            {/* 배경화면 리스트 */}
            <div className="w-full h-5/6 overflow-y-scroll p-4">
              <div className="flex flex-wrap">
                {bgData.map((champion) => (
                  <img
                    key={champion.id}
                    src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`}
                    alt={`${champion.name} Splash`}
                    className="w-1/4 transition hover:scale-110"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
