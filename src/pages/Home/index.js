import { useEffect, useState} from "react";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";
import { IoSearch, IoTrashOutline, IoAdd, IoCloudUploadOutline, IoCloudDownloadOutline } from "react-icons/io5";
import './style.css'

function Home() {
  // states
  const [itens, setItens] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // state add item
  const [newItem, setNewItem] = useState('');
  const [isAddItem, setIsAddItem] = useState(false);

  // efects
  useEffect(() => {
    const listaStorage = localStorage.getItem('itens');
    if (listaStorage) setItens(JSON.parse(listaStorage));
  }, []);
  
  useEffect(() => {
    if (searchTerm) {
      const itensFiltrados = JSON.parse(localStorage.getItem('itens') || '[]').filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setItens(itensFiltrados);
    } else {
      const listaStorage = localStorage.getItem('itens');
      if (listaStorage) {
        setItens(JSON.parse(listaStorage));
      }
    }
  }, [searchTerm]);

  // functions
  const handleAddItem = () => {
    if (newItem) {
      const itemObject = {
        id: itens.length, 
        name: newItem,
        atributos: []
      };
  
      if (itemObject.name) {
        const itensAtualizado = [...itens, itemObject]
        setItens(itensAtualizado);
        localStorage.setItem('itens', JSON.stringify(itensAtualizado));
        // handleEventUpdate();
        setNewItem('');
      }
    }
    setIsAddItem(false);
  };

  const removeItem = (id) => {
    const itens = JSON.parse(localStorage.getItem('itens')) || [];
    const hasItem = itens.some(item => item.id === id);

    if (hasItem) {
      const novaLista = itens.filter(item => item.id !== id);
      localStorage.setItem('itens', JSON.stringify(novaLista));
      setItens(novaLista);
      // handleEventUpdate();
    }
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);

  return(
    <>
      <div className="home">
        <div className={`container ${itens.length === 0 && !isAddItem ? "vazio" : ""}`}>
          <div className="search">
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearch}
            />
            <IoSearch/>
          </div>

          <section className="lista">
            {itens.map(item => (
              <div key={item.id}>
                <div className="item">
                  <Link to={`/item/${item.id}`}>{item.name}</Link>

                  <div>
                    <pre>({item.atributos.length})</pre>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                    >
                      <IoTrashOutline/>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {isAddItem && (
              <div className={`item ${isAddItem ? "input":""}`}>
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onBlur={handleAddItem}
                  // biome-ignore lint/a11y/noAutofocus: <explanation>
                  autoFocus
                />
              </div>
            )}
          </section>
        </div>

        <div className="botoes">
          <div className="btn">
            <button
              type="button"
              onClick={() => setIsAddItem(true)}
            >
              <IoAdd/>
            </button>
            <pre>Adicionar</pre>
          </div>

          <div className="btn">
            <button
              type="button"
              // onClick={toggleFileUpload}
            >
              <IoCloudUploadOutline/>
            </button>
            <pre>Upload</pre>
          </div>

          <div className="btn">
            <button
              type="button"
              // onClick={handleFileDownload}
            >
              <IoCloudDownloadOutline/>
            </button>
            <pre>Download</pre>
          </div>
        </div>
      </div>

      {/* <div id="modal" onClick={closeModal}>
        <div className="container">
          <input
            type="file"
            accept=".txt"
            onChange={handleFileUpload}
          />
        </div>
      </div> */}

    </>
  );

}

export default Home;
