import React from 'react'
import { Link } from 'react-router-dom';
import  Logonetflix from '../../Logonetflix.png';
import { IoSearch } from 'react-icons/io5';
const Header = () => {
  return (
    <>
    <nav className='header'>
        <img src={Logonetflix} alt="logo" />
        <div>
            <Link to= "/tvshows">TV Shows</Link>
            <Link to= "/movies"> Movies</Link>
            <Link to= "/add"> Recently Added</Link>
            <Link to= "/list"> Mylist</Link>
        </div>
        <IoSearch />
    </nav>
    </>
  )
}

export default Header;