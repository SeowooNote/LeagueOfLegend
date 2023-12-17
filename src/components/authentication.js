import { GithubAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react'
import { firebaseAuth, firebaseAuthGithub } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

import githubLogo from '../assets/githubLogo.png';
import logo from '../assets/logo.png';

export default function Authentication() {
  // navigation
  const navigator = useNavigate();
  // view
  const[view, setView] = useState("sign-in");

  // 로그인 Card
  const SignIn = () => {

    // email(ID)
    const[email, setEmail] = useState("");
    // password(PW)
    const[password, setPassword] = useState("");

    const onEmailHandler = (e) => {
      setEmail(e.currentTarget.value);
    }
    const onPasswordHandler = (e) => {
      setPassword(e.currentTarget.value)
    }

    const onKeyDownHandler = (e) => {
      if(e.key !== 'Enter') return;
      onLoginHandler();
    }

    const onGithubHandler = async (e) => {
      firebaseAuthGithub();
    }

    const onLoginHandler = async() => {
      try{
        const currentUserInfo = await signInWithEmailAndPassword(firebaseAuth, email, password);
        alert('로그인 성공');
        navigator('/');
      } catch(e) {
        alert('로그인 실패');
      }
    }

    const onSignUpHandler = () => {
      setView('sign-up');
    }

    return(
      <div className='w-1/5 flex-col justify-center p-4'>
        <div className='mb-20px'><img src={logo}/></div>
        <div className='mb-10px'>
          <div>
            <label className='text-lol-header-text-color'>Email address</label>
          </div>
          <div>
            <input id='email' name='email' type='email' autoComplete='email' value={email} onChange={onEmailHandler} required className='className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lol-sky-blue-hover sm:text-sm sm:leading-6' placeholder='email을 입력해주세요.'/>
          </div>
        </div>
        <div className='mb-15px'>
          <div>
            <label className='text-lol-header-text-color'>Password</label>
          </div>
          <div>
            <input id='password' name='password' type='password' autoComplete='current-password' value={password} onChange={onPasswordHandler} onKeyDown={onKeyDownHandler} required className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lol-sky-blue-hover sm:text-sm sm:leading-6' placeholder='password를 입력해주세요.'/>
          </div>
        </div>
        <div className='flex justify-between'>
          <p className='text-lol-header-text-color'>계정이 없으신가요?</p>
          <p onClick={onSignUpHandler} className='cursor-pointer hover:underline text-lol-header-text-color'>회원가입</p>
        </div>
        <div>
          <button type='submit' onClick={onLoginHandler} className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-donga-light-blue sm:text-sm sm:leading-6 text-lol-header-text-color hover:bg-lol-sky-blue-hover'>Sign In</button>
        </div>
        <div>
          <button onClick={onGithubHandler} className='flex justify-center items-center mt-6 block w-full h-9 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-donga-light-blue sm:text-sm sm:leading-6 text-lol-header-text-color hover:bg-white'><img src={githubLogo} className='h-full bg-white rounded-full'/></button>
        </div>
      </div>
    );
  }

  // 회원가입 Card
  const SignUp = () => {
    // email(ID)
    const[email, setEmail] = useState("");
    // password(PW)
    const[password, setPassword] = useState("");

    const onEmailHandler = (e) => {
      setEmail(e.currentTarget.value);
    }
    const onPasswordHandler = (e) => {
      setPassword(e.currentTarget.value)
    }

    const onKeyDownHandler = (e) => {
      if(e.key !== 'Enter') return;
      onSignUpHandler();
    }

    const onSignUpHandler = async() => {
      try{
        const createdUser = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        alert('회원가입 성공');
        setView('sign-in');
      } catch(e) {
          alert("회원가입 실패");
      }
    }

    return(
      <div className='w-1/5 p-1'>
        <div className='mb-20px'><img src={logo}/></div>
        <p className='mb-10px text-lol-header-text-color'>회원가입</p>
        <div className='mb-10px'>
            <div>
              <label className='text-lol-header-text-color'>Email address</label>
            </div>
            <div>
              <input id='email' name='email' type='email' autoComplete='email' value={email} onChange={onEmailHandler} required className='className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lol-sky-blue-hover sm:text-sm sm:leading-6' placeholder='사용할 email을 입력해주세요.'/>
            </div>
        </div>
        <div className='mb-15px'>
          <div>
            <label className='text-lol-header-text-color'>Password</label>
          </div>
          <div>
            <input id='password' name='password' type='password' autoComplete='current-password' value={password} onChange={onPasswordHandler} onKeyDown={onKeyDownHandler} required className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lol-sky-blue-hover sm:text-sm sm:leading-6' placeholder='사용할 password를 입력해주세요.'/>
          </div>
        </div>
        <div>
          <button type='submit' onClick={onSignUpHandler} className='className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-donga-light-blue sm:text-sm sm:leading-6 text-lol-header-text-color hover:bg-lol-sky-blue-hover'>Sign Up</button>
        </div>
      </div>
    );
  }

  return (
    <div className='flex justify-center'>
      <div className='flex justify-center items-center border-2 border-lol-gold1 bg-lol-dark-blue'>
        {view === 'sign-in' ? (<SignIn/>) : (<SignUp/>)}
        
        <div className='w-4/5'>
          <video loop autoPlay muted playsInline>
            <source src='https://assets.contentstack.io/v3/assets/blt731acb42bb3d1659/blt755ed452ae53c9a2/5f49597270ca0f65ba10a439/ss2020_sylas_garen_lux_1920x1080.mp4' type='video/webm'></source>
          </video>
        </div>
      </div>
    </div>
  )
}
