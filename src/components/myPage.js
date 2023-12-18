import React from "react";

export default function MyPage() {
  return (
    <div className="w-full h-screen">
      <div className="w-full h-full">
        <img
          src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg"
          alt="대충 아트록스 이미지"
          className="w-full h-full profile-champion-image-brightness"
        ></img>
        {/* <div className="profile-champion-image-blur bg-slate-400 h-3/5 w-4/5 absolute top-0">
          사용자 이름
        </div> */}
      </div>
    </div>
  );
}
