import { useCallback, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import './style.css'

function Item() {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [editingAttributeIndex, setEditingAttributeIndex] = useState(null);
  const [newAttribute, setNewAttribute] = useState("");
  
  useEffect(() => {
    const listaStorage = localStorage.getItem('itens');
    if (listaStorage) {
      const itens = JSON.parse(listaStorage);
      const itemEncontrado = itens.find((item) => item.id === parseInt(id));

      if (itemEncontrado) {
        setItem(itemEncontrado);
      }
    }
  }, [id]);

  const handleAdd = useCallback(() => {
    const textoInserido = document.querySelector('input').value;
    if (textoInserido) {
      const novoItem = { ...item, atributo: [...item.atributo, `${textoInserido}`] };
      
      setItem(novoItem);

      const listaStorage = localStorage.getItem('itens');
      if (listaStorage) {
        const itens = JSON.parse(listaStorage);
        const index = itens.findIndex((i) => i.id === parseInt(id));

        if (index !== -1) {
          itens[index] = novoItem;
          localStorage.setItem('itens', JSON.stringify(itens)); 
        }
      }

      document.querySelector('input').value = ``;
    }

  },[id, item]);
  
  const toggleEditTitle = () => {
    setIsEditingTitle(!isEditingTitle);
    setNewTitle(item.name);
  };

  const handleTitleChange = () => {
    if (newTitle) {
      setItem((i) => ({...i, name: newTitle}));

      const listaStorage = localStorage.getItem('itens');
      if (listaStorage) {
        const itens = JSON.parse(listaStorage);
        const index = itens.findIndex((i) => i.id === parseInt(id));

        if (index !== -1) {
          itens[index].name = newTitle;
          localStorage.setItem('itens', JSON.stringify(itens)); 
        }
      }
      setIsEditingTitle(false);
    }
  };

  const toggleEditAttribute = (index) => {
    setEditingAttributeIndex(index);
    setNewAttribute(item.atributo[index]);
  };

  const handleAttributeChange = (index) => {
    if (newAttribute) {
      const updatedAttributes = [...item.atributo];
      updatedAttributes[index] = newAttribute;

      const updatedItem = { ...item, atributo: updatedAttributes };
      setItem(updatedItem);

      const listaStorage = localStorage.getItem('itens');
      if (listaStorage) {
        const itens = JSON.parse(listaStorage);
        const itemIndex = itens.findIndex((i) => i.id === parseInt(id));

        if (itemIndex !== -1) {
          itens[itemIndex] = updatedItem;
          localStorage.setItem('itens', JSON.stringify(itens)); 
        }
      }

      setEditingAttributeIndex(null);
    }
  };

  return(
    <div className="item-container">

      <div>
        <div className="item-title">
          {isEditingTitle ? (
            <input
              className="title-edit"
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onBlur={handleTitleChange}
              autoFocus
            />
          ) : (
            <h1 onClick={toggleEditTitle}>{item.name}</h1>
          )}
        </div>

        <div>
          <ul>
            {item.atributo && item.atributo.map((valor, index) => (
              <li key={index}>
                {editingAttributeIndex === index ? (
                  <input
                    className="atribute-edit"
                    type="text"
                    value={newAttribute}
                    onChange={(e) => setNewAttribute(e.target.value)}
                    onBlur={() => handleAttributeChange(index)}
                    autoFocus
                  />
                ) : (
                  <span onClick={() => toggleEditAttribute(index)}>{valor}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="buttons">
          <input type="text"/>
          <button onClick={handleAdd}><IoAdd/></button>
        </div>

      </div>
    </div>
  );

}

export default Item;