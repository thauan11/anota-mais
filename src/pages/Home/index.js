import {useCallback, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { IoAdd, IoBrush } from "react-icons/io5";
import './style.css'

function Home() {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    const listaStorage = localStorage.getItem('itens');
    if (listaStorage) {
      setItens(JSON.parse(listaStorage));
    }
  }, []);

  const handleAdd = useCallback(() => {
    const textoInserido = {
      id: itens.length, 
      name: document.querySelector('input').value,
      atributo: []
    };

    if (textoInserido.name) {
      const itensAtualizado = [...itens, textoInserido]
      setItens(itensAtualizado);
      localStorage.setItem('itens', JSON.stringify(itensAtualizado));
      document.querySelector('input').value = '';
    }
  },[itens]);

  return(
    <div className="main-container">

      <div>
        <ul>
          {itens.map(item => (
            <li key={item.id}>
              <Link to={'/comodo/'+item.id} >{item.name}</Link>
            </li>
          ))}
        </ul>

        <div className="buttons">
          <input type="text"/>
          <button onClick={handleAdd}><IoAdd/></button>
        </div>

      </div>

    </div>
  );

}

export default Home;