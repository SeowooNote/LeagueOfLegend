import React from "react";

export default function LikeList() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-24 flex items-center">
        <div className="text-2xl ml-10 text-lol-gold">좋아요를 누른 챔피언</div>
      </div>
      <div className="w-full h-full">
        <div className="w-20 h-20 ml-10">
          <img
            src="https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Garen.png"
            alt="대충 챔피언 초상화"
          ></img>
        </div>
      </div>
    </div>
  );
}
