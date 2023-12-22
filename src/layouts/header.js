import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import headerLogo from "../assets/headerLogo.png";
import { firebaseAuth, firebaseDataBase } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Header({ setShowPopup }) {
  const navigator = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [userNickName, setUserNickName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(firebaseAuth.currentUser);

  const onSignOutHandler = () => {
    try {
      signOut(firebaseAuth);
      alert("로그아웃 되었습니다.");
      navigator("/");
    } catch (error) {
      alert("로그아웃 실패");
    }
  };

  const onSginInHandler = () => {
    setShowPopup(true);
  };

  const onProfileHandler = () => {
    navigator("/mypage");
  };

  useEffect(() => {
    const handleAuthStateChanged = (user) => {
      if (user) {
        const userUID = firebaseAuth.currentUser.uid;
        setIsLoggedIn(true);
        const userDocRef = doc(firebaseDataBase, "users", userUID);
        getDoc(userDocRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              const userData = docSnap.data();
              const profileImage = userData.profileImage;
              const userNickName = userData.nickname;
              const userEmail = userData.email;
              setProfileImage(profileImage);
              setUserNickName(userNickName);
              setUserEmail(userEmail);
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

    const unsubscribe = firebaseAuth.onAuthStateChanged(handleAuthStateChanged);
    return () => {
      unsubscribe();
    };
  });

  return (
    <div className="flex justify-center bg-lol-header-black text-lol-header-text-color">
      <div className="flex w-4/5 justify-between items-center">
        <Link to="/" className="flex justify-center items-center">
          <img src={headerLogo} alt="lol logo" className="w-16 h-16" />
        </Link>
        <div className="flex gap-x-40">
          <div className="hover:text-lol-gold1 text-2xl text-lol-gold">
            <Link to="/">Home</Link>
          </div>
          <div className="hover:text-lol-gold1 text-2xl text-lol-gold">
            <Link to="/champion">Champion</Link>
          </div>
          <div className="hover:text-lol-gold1 text-2xl text-lol-gold">
            <Link to="/items">Items</Link>
          </div>
        </div>
        {isLoggedIn ? (
          <div className="realtive drop-down">
            <div
              onClick={onProfileHandler}
              className="flex gap-3 items-center text-lol-gold hover:text-lol-gold1 cursor-pointer drop-down"
            >
              <div className="w-14 h-14 rounded-full">
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/${profileImage}.png`}
                  alt="대충 아이콘 이미지"
                  className="rounded-full border-2 border-lol-gold1"
                ></img>
              </div>
              <div>
                <div>{userNickName}</div>
                <div>{userEmail}</div>
              </div>
            </div>
            <div
              onClick={onSignOutHandler}
              className="drop-down-content p-4 text-center bg-lol-header-black absolute z-10 text-lol-gold hover:text-lol-gold1 cursor-pointer drop-down-contents"
            >
              Log Out
            </div>
          </div>
        ) : (
          <div>
            <Link
              to="/"
              className="hover:text-lol-gold1 text-2xl text-lol-gold"
              onClickCapture={onSginInHandler}
            >
              LogIn
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
