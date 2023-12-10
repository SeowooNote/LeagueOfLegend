import React from 'react'
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom'

export default function Main() {
  return (
    <div className='flex justify-center items-center relative'>
      <video loop autoPlay muted playsInline>
        <source src='https://www.leagueoflegends.com/static/hero-c35bd03ceaa5f919e98b20c905044a3d.webm' type="video/webm"></source>
      </video>
      <img src={logo} className='absolute w-lol-main-logo-width'></img>
      <div className='flex justify-center items-center absolute bottom-24 w-lol-main-button h-lol-main-button bg-lol-sky-blue lol-main-button cursor-pointer hover:bg-lol-sky-blue-hover'><Link to='/authentication' className='w-full flex justify-center items-center text-lol-header-text-color'>Start</Link></div>
    </div>
  )
}
