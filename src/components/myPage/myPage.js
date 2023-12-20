import React, { useState, useEffect } from "react";
import LikeList from "./likeList";
import CommentsList from "./commentsList";
import settings from "../../assets/settings.png";
import IconChange from "./iconChange";
import BgChange from "./bgChange";
import { firebaseAuth, firebaseDataBase } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function MyPage() {
  const [likeList, setLikeList] = useState(true);
  const [commentsList, setCommentsList] = useState(false);
  const [iconChangeShow, setIconChangeShow] = useState(false);
  const [bgChangeShow, setBgChangeShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const onLikeListHandler = () => {
    setLikeList(true);
    setCommentsList(false);
  };

  const onCommentsListHandler = () => {
    setCommentsList(true);
    setLikeList(false);
  };

  const showIconChangeHandler = () => {
    setIconChangeShow(true);
  };

  const toggleIconChange = () => {
    setIconChangeShow(!iconChangeShow);
  };

  const showBgChangeHandler = () => {
    setBgChangeShow(true);
  };

  const toggleBgChange = () => {
    setBgChangeShow(!bgChangeShow);
  };

  useEffect(() => {
    // 로그인 상태가 변경될 때 호출되는 콜백
    const handleAuthStateChanged = (user) => {
      if (user) {
        setIsLoggedIn(true);
        const userDocRef = doc(
          firebaseDataBase,
          "users",
          "FZaC6K6x3Hh1wiqUV9hZ"
        );
        getDoc(userDocRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              const userData = docSnap.data();
              const backgroundImage = userData.backgroundImage;
              const profileImage = userData.profileImage;
              setProfileImage(profileImage);
              setBackgroundImage(backgroundImage);
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.error("Error getting document:", error);
          });
      } else {
        setIsLoggedIn(false);
      }
    };

    // 콜백을 등록하고, 리턴된 함수로 등록 해제
    const unsubscribe = firebaseAuth.onAuthStateChanged(handleAuthStateChanged);

    return () => {
      unsubscribe(); // 컴포넌트가 언마운트될 때 등록을 해제
    };
  }, []);

  // isLoggedIn이 false이거나 null인 경우 로딩 화면 또는 로그인 화면을 표시
  if (isLoggedIn === null || !isLoggedIn) {
    return <div>Loading...</div>; // 또는 로그인 화면으로 리다이렉트 등의 처리
  }

  return (
    <div className="w-full h-screen">
      <div className="w-full h-full">
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${backgroundImage}.jpg`}
          alt="대충 아트록스 이미지"
          className="w-full h-full profile-champion-image-brightness"
        ></img>
        <div className="left-[50%] transform translate-x-[-50%] top-[120px] bg-lol-dark-blue bg-opacity-50 h-4/5 w-4/5 absolute border-4 border-lol-gold1 flex flex-col">
          <div className="bg-lol-dark-blue bg-opacity-50 w-full h-2/6">
            <img
              src={settings}
              alt="edit"
              className="w-4 h-4 absolute right-5 top-5"
              onClick={showBgChangeHandler}
            ></img>
            <div className="h-28 w-28 rounded-full absolute top-2.5 left-9">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/${profileImage}.png`}
                alt="대충 아이콘 이미지"
                className="rounded-full border-2 border-lol-gold1"
              ></img>
              <img
                src={settings}
                alt="edit"
                className="w-4 h-4 absolute right-0 top-0"
                onClick={showIconChangeHandler}
              ></img>
            </div>
            <div className="w-52 text-lol-gold1 text-3xl absolute top-12 left-44">
              {firebaseAuth.currentUser.displayName}
              <img
                src={settings}
                alt="edit"
                className="w-3 h-3 absolute right-0 top-0"
              ></img>
            </div>
            <div className="text-lol-gold text-lg absolute top-20 left-44">
              {firebaseAuth.currentUser.email}
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
      {iconChangeShow && (
        <IconChange closeIconChange={() => toggleIconChange()} />
      )}
      {bgChangeShow && <BgChange closeBgChange={() => toggleBgChange()} />}
    </div>
  );
}
