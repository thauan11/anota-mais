import { useEffect, useState} from "react";
import { Link, useLocation } from 'react-router-dom';
import { PiNotepadFill, PiNoteFill } from "react-icons/pi";
import './style.css'

function Header() {
  const [itens, setItens] = useState([]);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const loadItemsFromStorage = () => {
      const listaStorage = localStorage.getItem("itens");
      if (listaStorage) {
        setItens(JSON.parse(listaStorage));
      } else {
        setItens([]);
      }
    };

    loadItemsFromStorage();

    window.addEventListener("localStorageUpdate", loadItemsFromStorage);

    return () => {
      window.removeEventListener("localStorageUpdate", loadItemsFromStorage);
    };
  }, []);

  return(
    <nav className={`menu-lateral ${currentPath == '/' ? 'raiz':''}`}>

      <div className='logo'>
        <Link to={'/'}>
          <PiNoteFill/>
        </Link>
      </div>

      {currentPath == '/' ? (
        <div className="borda-raiz"></div>
      ) : (
        itens.length > 0 ? (
          <div className="lista">
            <ul>
            {itens.map(item => (
              <li key={item.id}>
                <Link to={'/item/'+item.id} >{item.name}</Link>
              </li>
            ))}
            </ul>
          </div>
        ) : ``
      )}

    </nav>
  );
}

export default Header;