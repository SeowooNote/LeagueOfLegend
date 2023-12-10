import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../assets/headerLogo.png';
export default function Header() {
  return (
    <div className='flex justify-center bg-lol-header-black text-lol-header-text-color'>
      <div className='flex w-4/5 justify-between items-center'>
        <Link to="/" className='flex justify-center items-center'><img src={headerLogo} className='w-9'/></Link>
        <div className='flex gap-x-40'>
          <div className='hover:bg-zinc-700'><Link to="/">Home</Link></div>
          <div className='hover:bg-zinc-700'><Link to="/champion">Champion</Link></div>
          <div className='hover:bg-zinc-700'><Link to="/items"></Link>Items</div>
        </div>
        <div className='hover:bg-zinc-700'><Link to="/my">My</Link></div>
      </div>
    </div>
  )
}
