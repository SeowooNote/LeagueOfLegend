import React, { useState } from "react";
import LikeList from "./likeList";
import CommentsList from "./commentsList";
import settings from "../../assets/settings.png";

export default function MyPage() {
  const [likeList, setLikeList] = useState(true);
  const [commentsList, setCommentsList] = useState(false);

  const onLikeListHandler = () => {
    setLikeList(true);
    setCommentsList(false);
  };

  const onCommentsListHandler = () => {
    setCommentsList(true);
    setLikeList(false);
  };

  return (
    <div className="w-full h-screen">
      <div className="w-full h-full">
        <img
          src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Garen_0.jpg"
          alt="대충 아트록스 이미지"
          className="w-full h-full profile-champion-image-brightness"
        ></img>
        <div className="left-[50%] transform translate-x-[-50%] top-[120px] bg-lol-dark-blue bg-opacity-50 h-4/5 w-4/5 absolute border-4 border-lol-gold1 flex flex-col">
          <div className="bg-lol-dark-blue bg-opacity-50 w-full h-2/6">
            <img
              src={settings}
              alt="edit"
              className="w-4 h-4 absolute right-5 top-5"
            ></img>
            <div className="h-28 w-28 rounded-full absolute top-2.5 left-9">
              <img
                src="https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/6.png"
                alt="대충 아이콘 이미지"
                className="rounded-full"
              ></img>
              <img
                src={settings}
                alt="edit"
                className="w-4 h-4 absolute right-0 top-0"
              ></img>
            </div>
            <div className="w-52 text-lol-gold1 text-3xl absolute top-12 left-44">
              롤로노아 이동윤
              <img
                src={settings}
                alt="edit"
                className="w-3 h-3 absolute right-0 top-0"
              ></img>
            </div>
            <div className="text-lol-gold text-lg absolute top-20 left-44">
              dongyoon7212@naver.com
            </div>
          </div>
          <div className="w-full h-1/6 bg-lol-dark-blue bg-opacity-50 flex border-y-4 border-lol-gold1">
            <div
              className="text-xl text-lol-gold my-auto ml-10"
              onClick={onLikeListHandler}
            >
              좋아요 List
            </div>
            <div
              className="text-xl text-lol-gold my-auto ml-10"
              onClick={onCommentsListHandler}
            >
              댓글 List
            </div>
          </div>
          <div className="w-full h-full bg-lol-dark-blue bg-opacity-50">
            {likeList && <LikeList />}
            {commentsList && <CommentsList />}
          </div>
        </div>
      </div>
    </div>
  );
}
