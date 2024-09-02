import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { IoAdd, IoCloseSharp, IoImageOutline } from "react-icons/io5";
import validator from 'validator'
import './style.css'

function Item() {
  const { id } = useParams();
  const [item, setItem] = useState([]);

  const [isAddAttribute, setIsAddAttribute] = useState(false);
  const [newAttribute, setNewAttribute] = useState('');
  const [newAttributeImageURL, setNewAttributeImageURL] = useState('');

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [updateTitle, setUpdateTitle] = useState('');

  const [editingAttributeIndex, setEditingAttributeIndex] = useState(null);
  const [updateAttribute, setUpdateAttribute] = useState('');
  const [updateAttributeImageURL, setUpdateAttributeImageURL] = useState('');
  
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
    setNewAttributeImageURL('');
  };

  const handleAddAttribute = () => {
    const attributeObject = {
      texto: newAttribute,
      imageURL: newAttributeImageURL,
    };

    if (attributeObject.texto.length > 0) {
      const atributosAtualizado = {
        ...item, 
        atributos: [...item.atributos, attributeObject]
      }

      setItem(atributosAtualizado);

      const listaStorage = localStorage.getItem('itens');
      if (listaStorage) {
        const itens = JSON.parse(listaStorage);
        const index = itens.findIndex((i) => i.id === parseInt(id));

        if (index !== -1) {
          itens[index] = atributosAtualizado;
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
    setUpdateAttribute(item.atributos[index].texto);
    setUpdateAttributeImageURL(item.atributos[index].imageURL);
  };
  
  const handleAttributeChange = (index) => {
    if (updateAttribute) {
      const updatedAttributes = [...item.atributos];
      updatedAttributes[index] = {texto: updateAttribute, imageURL: updateAttributeImageURL};

      const updatedItem = { ...item, atributos: updatedAttributes };
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

  function handleAttributeChangeCancel() {
    setUpdateAttribute('');
    setUpdateAttributeImageURL('');
    setEditingAttributeIndex(null);
  };

  const handleRemoveAttribute = (index) => {
    const updatedAttributes = [...item.atributos];
    updatedAttributes.splice(index, 1);

    const updatedItem = { ...item, atributos: updatedAttributes };
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
  
  const validate = (value) => { 
    if (validator.isURL(value)) { 
      return true
    } else { 
      return false
    } 
  } 

  return(
    <>
      <div className="item-page">

        <div className="container">

          <div className="title">
            {isEditingTitle ? (
              <input
                className="input"
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

          <div className="atributos">
            {item.atributos && item.atributos.map((atributo, index) => (
              <div key={index} className="atributo">
                {editingAttributeIndex === index ? (
                  <div className="atributo-edit">
                    <div>
                      <p>URL da imagem: </p>
                      <input
                        type="text"
                        value={updateAttributeImageURL}
                        onChange={(e) => setUpdateAttributeImageURL(e.target.value)}
                      />
                    </div>

                    <div>
                      <p>Texto: </p>
                      <textarea
                        type="text"
                        value={updateAttribute}
                        onChange={(e) => setUpdateAttribute(e.target.value)}
                        onInput={handleTextareaInput}
                        onFocus={handleTextareaInput}
                        autoFocus
                      />
                    </div>
                    
                    <div className="atributo-edit-buttons">
                      <button onClick={() => handleAttributeChange(index)}> Salvar </button>
                      <button onClick={handleAttributeChangeCancel}> Cancelar </button>
                    </div>
                  </div>
                ) : (
                  <div onClick={() => toggleEditAttribute(index)} className="content">
                    {atributo.imageURL ? (
                      <div className="image">
                        {validate(atributo.imageURL) ? (
                          <img src={atributo.imageURL} alt={`Imagem ${index}`} />
                        ) : (
                          <IoImageOutline/>
                        )}
                      </div>
                    ) : ``}

                    <div className="texto">
                      <span>{atributo.texto}</span>
                    </div>
                  </div>
                )}

                <button
                  className="btn-close"
                  onClick={() => handleRemoveAttribute(index)}
                >
                  <IoCloseSharp />
                </button>

              </div>

            ))}

            {isAddAttribute && (
              <div className="atributo-new">
                <div>
                  <p>URL da imagem: </p>
                  <input
                    type="text"
                    value={newAttributeImageURL}
                    onChange={(e) => setNewAttributeImageURL(e.target.value)}
                  />
                </div>

                <div>
                  <p>Texto: </p>
                  <textarea
                    type="text"
                    value={newAttribute}
                    onChange={(e) => setNewAttribute(e.target.value)}
                    autoFocus
                  />
                </div>
                
                <div className="atributo-new-buttons">
                  <button onClick={handleAddAttribute}> Salvar </button>
                  <button onClick={toggleAddAttribute}> Cancelar </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      <div className="botoes">
        <div className="btn">
          <button onClick={toggleAddAttribute}><IoAdd/></button>
          <pre>Adicionar</pre>
        </div>
      </div>

    </>
  );

}

export default Item;