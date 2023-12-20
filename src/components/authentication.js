import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import {
  firebaseAuth,
  firebaseAuthGithub,
  firebaseAuthGoogle,
  firebaseDataBase,
} from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";

import googleLogo from "../assets/googleLogo.png";
import githubLogo from "../assets/githubLogo.png";
import logo from "../assets/logo.png";

export default function Authentication() {
  // navigation
  const navigator = useNavigate();
  // view
  const [view, setView] = useState("sign-in");

  // 로그인 Card
  const SignIn = () => {
    // email(ID)
    const [email, setEmail] = useState("");
    // password(PW)
    const [password, setPassword] = useState("");

    const onEmailHandler = (e) => {
      setEmail(e.currentTarget.value);
    };
    const onPasswordHandler = (e) => {
      setPassword(e.currentTarget.value);
    };

    const onKeyDownHandler = (e) => {
      if (e.key !== "Enter") return;
      onLoginHandler();
    };

    const onGoogleHandler = async (e) => {
      firebaseAuthGoogle();
    };
    const onGithubHandler = async (e) => {
      firebaseAuthGithub();
    };

    const onLoginHandler = async () => {
      try {
        setPersistence(firebaseAuth, browserSessionPersistence).then(
          async () => {
            const currentUserInfo = await signInWithEmailAndPassword(
              firebaseAuth,
              email,
              password
            );
            return currentUserInfo;
          }
        );
        alert("로그인 성공");
        navigator("/mypage");
      } catch (e) {
        alert("로그인 실패");
      }
    };

    const onSignUpHandler = () => {
      setView("sign-up");
    };

    return (
      <div className="w-2/5 flex-col justify-center p-4">
        <div className="mb-20px">
          <img src={logo} alt="logo" />
        </div>
        <div className="mb-10px">
          <div>
            <label className="text-lol-gold">Email address</label>
          </div>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={onEmailHandler}
              required
              className='className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lol-sky-blue-hover sm:text-sm sm:leading-6'
              placeholder="email을 입력해주세요."
            />
          </div>
        </div>
        <div className="mb-15px">
          <div>
            <label className="text-lol-gold">Password</label>
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={onPasswordHandler}
              onKeyDown={onKeyDownHandler}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lol-sky-blue-hover sm:text-sm sm:leading-6"
              placeholder="password를 입력해주세요."
            />
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-lol-gold">계정이 없으신가요?</p>
          <p
            onClick={onSignUpHandler}
            className="cursor-pointer hover:underline text-lol-gold"
          >
            회원가입
          </p>
        </div>
        <div>
          <button
            type="submit"
            onClick={onLoginHandler}
            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-donga-light-blue sm:text-sm sm:leading-6 text-lol-header-text-color hover:bg-lol-sky-blue-hover"
          >
            Sign In
          </button>
        </div>

        <div>
          <p className="text-lol-gold mt-3">연동 로그인</p>
          <button
            onClick={onGoogleHandler}
            className="flex justify-center items-center w-full h-9 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-gray-300 hover:bg-lol-sky-blue-hover"
          >
            <img
              src={googleLogo}
              alt="gooleLogo"
              className="h-full rounded-full"
            />
          </button>
        </div>
        <div>
          <button
            onClick={onGithubHandler}
            className="flex justify-center items-center mt-1 w-full h-9 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-gray-300 hover:bg-lol-sky-blue-hover"
          >
            <img
              src={githubLogo}
              alt="githubLogo"
              className="h-full rounded-full bg-white"
            />
          </button>
        </div>
      </div>
    );
  };

  // 회원가입 Card
  const SignUp = () => {
    // email(ID)
    const [email, setEmail] = useState("");
    // password(PW)
    const [password, setPassword] = useState("");
    // nickname(NN)
    const [nickname, setNickname] = useState("");
    // profileImage(PI)
    const [profileImage] = useState(null);
    // backgroundImage(BI)
    const [backgroundImage] = useState(null);

    const onEmailHandler = (e) => {
      setEmail(e.currentTarget.value);
    };
    const onPasswordHandler = (e) => {
      setPassword(e.currentTarget.value);
    };
    const onNicknameHandler = (e) => {
      setNickname(e.currentTarget.value);
    };

    const onKeyDownHandler = (e) => {
      if (e.key !== "Enter") return;
      onSignUpHandler();
    };

    const onSginInHandler = () => {
      setView("sign-in");
    };

    const onSignUpHandler = async () => {
      try {
        // 1. email, password로  createUser를 만든다
        const user = await createUserWithEmailAndPassword(
          firebaseAuth,
          email,
          password
        );
        // 2. 가입한 user에 nickname, profileImage, backgroundImage 정보를 저장
        await updateProfile(firebaseAuth.currentUser, {
          displayName: nickname,
          profileImage,
          backgroundImage,
        });

        // 회원가입한 user의 정보 firestore users 컬렉션에 저장
        addDoc(collection(firebaseDataBase, "users"), {
          email: email,
          nickname: nickname,
          profileImage: profileImage,
          backgroundImage: backgroundImage,
        });

        alert("회원가입 완료, 이제 로그인을 해주세요.");
        setView("sign-in");
        console.log(user);
        return user;
      } catch (e) {
        alert("회원가입 실패");
      }
    };

    return (
      <div className="w-2/5 p-4 h-full">
        <div className="mb-20px">
          <img src={logo} alt="logo" />
        </div>
        <p className="mb-10px text-lol-gold">회원가입</p>
        <div className="mb-10px">
          <div>
            <label className="text-lol-gold">Email address</label>
          </div>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={onEmailHandler}
              required
              className='className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lol-sky-blue-hover sm:text-sm sm:leading-6'
              placeholder="사용할 email을 입력해주세요."
            />
          </div>
        </div>
        <div className="mb-15px">
          <div>
            <label className="text-lol-gold">Password</label>
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={onPasswordHandler}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lol-sky-blue-hover sm:text-sm sm:leading-6"
              placeholder="사용할 password를 입력해주세요."
            />
          </div>
        </div>
        <div className="mb-15px">
          <div>
            <label className="text-lol-gold">Nickname</label>
          </div>
          <div>
            <input
              id="nickname"
              name="nickname"
              type="text"
              autoComplete="nickname"
              value={nickname}
              onChange={onNicknameHandler}
              onKeyDown={onKeyDownHandler}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lol-sky-blue-hover sm:text-sm sm:leading-6"
              placeholder="사용할 nickname을 입력해주세요."
            />
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-lol-gold">계정이 있으신가요?</p>
          <p
            onClick={onSginInHandler}
            className="cursor-pointer hover:underline text-lol-gold"
          >
            로그인
          </p>
        </div>
        <div>
          <button
            type="submit"
            onClick={onSignUpHandler}
            className='className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-donga-light-blue sm:text-sm sm:leading-6 text-lol-header-text-color hover:bg-lol-sky-blue-hover'
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-center">
      <div className="flex justify-center items-center border-2 border-lol-gold1 bg-lol-dark-blue">
        {view === "sign-in" ? <SignIn /> : <SignUp />}

        <div className="w-full p-4">
          <video loop autoPlay muted playsInline>
            <source
              src="https://assets.contentstack.io/v3/assets/blt731acb42bb3d1659/blt755ed452ae53c9a2/5f49597270ca0f65ba10a439/ss2020_sylas_garen_lux_1920x1080.mp4"
              type="video/webm"
            ></source>
          </video>
        </div>
      </div>
    </div>
  );
}
