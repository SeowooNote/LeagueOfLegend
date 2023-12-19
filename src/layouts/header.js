import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import headerLogo from "../assets/headerLogo.png";
import { firebaseAuth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import Authentication from "../components/authentication";
export default function Header() {
  const navigator = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(firebaseAuth.currentUser);

  const onSignOutHandler = () => {
    try {
      signOut(firebaseAuth);
      alert('로그아웃 되었습니다.');
      navigator('/')
    } catch (error) {
      alert('로그아웃 실패');
    }
  }

  const onSginInHandler = () => {
    alert('로그인이 필요합니다.');
    return(<Authentication/>)
  }

  const onProfileHandler = () => {
    navigator('/mypage');
  }

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    })
  }, [])

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
                <div onClick={onProfileHandler} className=" flex gap-3 items-center text-lol-gold hover:text-lol-gold1 cursor-pointer drop-down">
                  <div className="w-14 h-14 rounded-full bg-white"></div>
                  <div>
                    <div>{firebaseAuth.currentUser.displayName}</div>
                    <div>{firebaseAuth.currentUser.email}</div>
                  </div>
                </div>
                <div onClick={onSignOutHandler} className="drop-down-content p-4 text-center bg-lol-header-black absolute z-10 text-lol-gold hover:text-lol-gold1 cursor-pointer drop-down-contents">Log Out</div>
            </div>
          ) : (
            <div>
              <Link to="/" className="hover:text-lol-gold1 text-2xl text-lol-gold" onClickCapture={onSginInHandler}>LogIn</Link>
            </div>
          )}
      </div>
    </div>
  );
}
