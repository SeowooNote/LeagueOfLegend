import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { firebaseAuth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

export default function Authentication() {
  // email(ID)
  const[email, setEmail] = useState("");
  // password(PW)
  const[password, setPassword] = useState("");

  const navigator = useNavigate();

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

  const onLoginHandler = async() => {
    try{
      const currentUserInfo = await signInWithEmailAndPassword(firebaseAuth, email, password);
      alert('로그인 성공');
      navigator('/');
    } catch(e) {
      alert('로그인 실패');
    }
  }

  return (
    <div className='flex justify-center'>
      <div className='flex justify-center items-center w-4/5'>
        <div className='w-1/5'>
          <div>라이엇</div>
          <div>
            <div>
              <label>Email address</label>
            </div>
            <div>
              <input id='email' name='email' type='email' autoComplete='email' value={email} onChange={onEmailHandler} required className='className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-donga-light-blue sm:text-sm sm:leading-6'/>
            </div>
          </div>
          <div>
            <div>
              <label>Password</label>
            </div>
            <div>
              <input id='password' name='password' type='password' autoComplete='current-password' value={password} onChange={onPasswordHandler} onKeyDown={onKeyDownHandler} required className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-donga-light-blue sm:text-sm sm:leading-6'/>
            </div>
          </div>
          <div>
            <button type='submit' onClick={onLoginHandler} className='className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-donga-light-blue sm:text-sm sm:leading-6'>Sign In</button>
          </div>
        </div>

        <div className='w-4/5'>
          <video loop autoPlay muted playsInline>
            <source src='https://assets.contentstack.io/v3/assets/blt731acb42bb3d1659/blte5d5ac96b514d502/5f495971a21dbd47faf26c0b/ss2020_kaisa_1920x1080.mp4' type='video/webm'></source>
          </video>
        </div>
      </div>
    </div>
  )
}
