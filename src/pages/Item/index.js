import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { IoAdd, IoCloseSharp } from "react-icons/io5";
import './style.css'

function Item() {
  const { id } = useParams();
  const [item, setItem] = useState([]);

  const [isAddAttribute, setIsAddAttribute] = useState(false);
  const [newAttribute, setNewAttribute] = useState('');

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [updateTitle, setUpdateTitle] = useState('');

  const [editingAttributeIndex, setEditingAttributeIndex] = useState(null);
  const [updateAttribute, setUpdateAttribute] = useState('');
  
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

  const toggleAddAttribute = () => {
    setIsAddAttribute(!isAddAttribute);
    setNewAttribute('');
  };

  const handleAddAttribute = () => {
    if (newAttribute) {
      const novoItem = {
        ...item, 
        atributo: [...item.atributo, `${newAttribute}`] 
      };
      
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
    }
    setIsAddAttribute(false);
  }
  
  const toggleEditTitle = () => {
    setIsEditingTitle(!isEditingTitle);
    setUpdateTitle(item.name);
  };

  const handleTitleChange = () => {
    if (updateTitle) {
      setItem((i) => ({...i, name: updateTitle}));

      const listaStorage = localStorage.getItem('itens');
      if (listaStorage) {
        const itens = JSON.parse(listaStorage);
        const index = itens.findIndex((i) => i.id === parseInt(id));

        if (index !== -1) {
          itens[index].name = updateTitle;
          localStorage.setItem('itens', JSON.stringify(itens)); 
        }
      }
      setIsEditingTitle(false);
    }
  };

  const toggleEditAttribute = (index) => {
    setEditingAttributeIndex(index);
    setUpdateAttribute(item.atributo[index]);
  };

  const handleAttributeChange = (index) => {
    if (updateAttribute) {
      const updatedAttributes = [...item.atributo];
      updatedAttributes[index] = updateAttribute;

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

  const handleRemoveAttribute = (index) => {
    const updatedAttributes = [...item.atributo];
    updatedAttributes.splice(index, 1);

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
  };
  
  const handleTextareaInput = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return(
    <div className="item-container">

      <div>
        <div className="item-title">
          {isEditingTitle ? (
            <input
              className="title-edit"
              type="text"
              value={updateTitle}
              onChange={(e) => setUpdateTitle(e.target.value)}
              onBlur={handleTitleChange}
              autoFocus
            />
          ) : (
            <h3 onClick={toggleEditTitle}>{item.name}</h3>
          )}
        </div>

        <div className="item-list">
          <ul>
            {item.atributo && item.atributo.map((valor, index) => (
              <li key={index}>
                {editingAttributeIndex === index ? (
                  <textarea
                    type="text"
                    value={updateAttribute}
                    onChange={(e) => setUpdateAttribute(e.target.value)}
                    onBlur={() => handleAttributeChange(index)}
                    onInput={handleTextareaInput}
                    autoFocus
                  />
                ) : (
                  <span onClick={() => toggleEditAttribute(index)}>{valor}</span>
                )}
                <button onClick={() => handleRemoveAttribute(index)}>
                  <IoCloseSharp />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="buttons">
          {isAddAttribute ? (
            <input
              type="text"
              value={newAttribute}
              onChange={(e) => setNewAttribute(e.target.value)}
              onBlur={handleAddAttribute}
              autoFocus
            />
          ) : (
            <div className="buttons-div">
              <button onClick={toggleAddAttribute}><IoAdd/></button>
            </div>
          )}
        </div>

      </div>
    </div>
  );

}

export default Item;