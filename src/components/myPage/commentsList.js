import React from "react";

export default function CommentsList() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-1/5 flex items-center">
        <div className="text-2xl ml-10 text-lol-gold">남긴 댓글</div>
      </div>
      <div className="w-full h-fit">
        <div className="w-full h-16 flex flex-row">
          <div className="w-16 h-16 ml-10">
            <img
              src="https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Garen.png"
              alt="대충 챔피언 초상화"
            ></img>
          </div>
          <div className="text-xl text-lol-gold my-auto ml-10">
            "님들 이거 개꿀딱임"
          </div>
          <div className="w-1/6 h-16 absolute right-0 flex flex-row">
            <div className="text-lg text-lol-gold my-auto ml-10">수정</div>
            <div className="text-lg text-red-500 my-auto ml-5">삭제</div>
          </div>
        </div>
      </div>
      <div className="w-full h-fit">
        <div className="w-full h-16 flex flex-row">
          <div className="w-16 h-16 ml-10">
            <img
              src="https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Garen.png"
              alt="대충 챔피언 초상화"
            ></img>
          </div>
          <div className="text-xl text-lol-gold my-auto ml-10">
            "가붕이쉑 ㄹㅇㅋㅋ"
          </div>
          <div className="w-1/6 h-16 absolute right-0 flex flex-row">
            <div className="text-lg text-lol-gold my-auto ml-10">수정</div>
            <div className="text-lg text-red-500 my-auto ml-5">삭제</div>
          </div>
        </div>
      </div>
      <div className="w-full h-fit">
        <div className="w-full h-16 flex flex-row">
          <div className="w-16 h-16 ml-10">
            <img
              src="https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Aatrox.png"
              alt="대충 챔피언 초상화"
            ></img>
          </div>
          <div className="text-xl text-lol-gold my-auto ml-10">
            "개씹사기 챔 ㅎㄷㄷ"
          </div>
          <div className="w-1/6 h-16 absolute right-0 flex flex-row">
            <div className="text-lg text-lol-gold my-auto ml-10">수정</div>
            <div className="text-lg text-red-500 my-auto ml-5">삭제</div>
          </div>
        </div>
      </div>
    </div>
  );
}
