import { Link } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";

function Header() {
  return(
    <header>
      <div>
        <Link className='logo' to={'/'}> <IoArrowBack/> </Link>
      </div>
    </header>
  );
}

export default Header;