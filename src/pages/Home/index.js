import { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { IoAdd, IoTrashOutline } from "react-icons/io5";
import './style.css'

function Home() {
  const [itens, setItens] = useState([]);
  
  const [isAddItem, setIsAddItem] = useState(false);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    const listaStorage = localStorage.getItem('itens');
    if (listaStorage) {
      setItens(JSON.parse(listaStorage));
    }
  }, []);

  const toggleAddItem = () => {
    setIsAddItem(!isAddItem);
    setNewItem('');
  };

  const handleAddItem = () => {
    if (newItem) {
      const itemObject = {
        id: itens.length, 
        name: newItem,
        atributo: []
      };
  
      if (itemObject.name) {
        const itensAtualizado = [...itens, itemObject]
        setItens(itensAtualizado);
        localStorage.setItem('itens', JSON.stringify(itensAtualizado));
        setNewItem('');
      }
    }
    setIsAddItem(false);
  }

  function removeItem(id) {
    const itens = JSON.parse(localStorage.getItem('itens')) || [];
    const hasItem = itens.some(item => item.id === id);

    if (hasItem) {
      const novaLista = itens.filter(item => item.id !== id);
      localStorage.setItem('itens', JSON.stringify(novaLista));
      setItens(novaLista);
    }
    
  }

  return(
    <div className="main-container">

      <div>

        <div className="main-title">
          {itens.length > 0 ? (
            <div>Sua lista:</div>
          ) : (
            <div>Sua lista está vazia!</div>
          )}
        </div>

        <div className="main-item-list">
          {itens.map(item => (
            <article key={item.id}>
              <div className="article-title">
                <Link to={'/item/'+item.id} >{item.name}</Link>
              </div>

              <span>({item.atributo.length})</span>

              <button onClick={() => removeItem(item.id)}><IoTrashOutline/></button>
            </article>
          ))}
        </div>

        <div className="buttons">
          {isAddItem ? (
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onBlur={handleAddItem}
              autoFocus
            />
          ) : (
            <div className="buttons-div">
              <button onClick={toggleAddItem}><IoAdd/></button>
            </div>
          )}
        </div>

      </div>

    </div>
  );

}

export default Home;