import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../assets/headerLogo.png';
export default function Header() {
  return (
    <div className='flex justify-center bg-lol-header-black text-lol-header-text-color'>
      <div className='flex w-4/5 justify-between items-center'>
        <Link to="/" className='flex justify-center items-center'><img src={headerLogo} className='w-16 h-16'/></Link>
        <div className='flex gap-x-40'>
          <div className='hover:text-lol-gold1 text-2xl text-lol-gold'><Link to="/">Home</Link></div>
          <div className='hover:text-lol-gold1 text-2xl text-lol-gold'><Link to="/champion">Champion</Link></div>
          <div className='hover:text-lol-gold1 text-2xl text-lol-gold'><Link to="/items">Items</Link></div>
        </div>
        <div className='hover:text-lol-gold1 text-2xl text-lol-gold'><Link to="/my">My</Link></div>
      </div>
    </div>
  )
}
