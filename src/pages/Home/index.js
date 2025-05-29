import { useEffect, useState} from "react";
import { useRef } from "react";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";
import { IoSearch, IoTrashOutline, IoAdd, IoCloudUploadOutline, IoCloudDownloadOutline } from "react-icons/io5";
import './style.css'

function Home() {
  // states
  const [itens, setItens] = useState([]);
  const [itensUpdate, setItensUpdate] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [fileContent, setFileContent] = useState('');
  // state add item
  const [newItem, setNewItem] = useState('');
  const [isAddItem, setIsAddItem] = useState(false);

  // efects
  useEffect(() => {
    console.log(`setItensUpdate? ${itensUpdate}`);
    const listaStorage = localStorage.getItem('itens');
    if (listaStorage) setItens(JSON.parse(listaStorage));
  }, [itensUpdate]);
  
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
  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleAddItem = () => {
    if (newItem) {
      const itemObject = {
        // id: itens.length,
        id: crypto.randomUUID(),
        name: newItem,
        atributos: []
      };
  
      if (itemObject.name) {
        const itensAtualizado = [...itens, itemObject]
        setItens(itensAtualizado);
        localStorage.setItem('itens', JSON.stringify(itensAtualizado));
        setItensUpdate(!itensUpdate);
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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonContent = JSON.parse(e.target.result);
          setFileContent(JSON.stringify(jsonContent, null, 2));
          setItens(jsonContent);
          localStorage.setItem('itens', JSON.stringify(jsonContent));
          setItensUpdate(!itensUpdate);
        } catch (error) {
          alert("O conteúdo do arquivo não é um JSON válido.");
        }
      };
      reader.readAsText(file);
    } else {
      alert("Por favor, selecione um arquivo .txt válido.");
    }
  };

  const handleFileDownload = () => {
    const data = new Date();
    const dataFormatada = data.toISOString().slice(0, 10);
    const blob = new Blob([JSON.stringify(itens, null, 2)], { type: "application/json" });
    saveAs(blob, `${dataFormatada}-nota-mais.txt`);
  }

  // ref
  const fileInputRef = useRef(null);

  return(
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
            <pre>Adicionar</pre>
          </button>
        </div>

        <div className="btn">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            <IoCloudUploadOutline/>
            <pre>Upload</pre>
          </button>
          
          <input
            type="file"
            accept=".txt"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
        </div>

        <div className="btn">
          <button
            type="button"
            onClick={handleFileDownload}
          >
            <IoCloudDownloadOutline/>
            <pre>Download</pre>
          </button>
        </div>
      </div>
    </div>
  );

}

export default Home;
