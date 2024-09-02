import { useEffect, useState} from "react";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";
import { IoSearch, IoTrashOutline, IoAdd, IoCloudUploadOutline, IoCloudDownloadOutline } from "react-icons/io5";
import './style.css'

function Home() {
  const [itens, setItens] = useState([]);
  const [fileContent, setFileContent] = useState("");
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isAddItem, setIsAddItem] = useState(false);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    const listaStorage = localStorage.getItem('itens');
    if (listaStorage) {
      setItens(JSON.parse(listaStorage));
    }
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleAddItem = () => {
    setIsAddItem(!isAddItem);
    setNewItem('');
  };

  function handleEventUpdate() {
    const event = new Event("localStorageUpdate");
    window.dispatchEvent(event);
  };

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
        handleEventUpdate();
        setNewItem('');
      }
    }
    setIsAddItem(false);
  };

  function removeItem(id) {
    const itens = JSON.parse(localStorage.getItem('itens')) || [];
    const hasItem = itens.some(item => item.id === id);

    if (hasItem) {
      const novaLista = itens.filter(item => item.id !== id);
      localStorage.setItem('itens', JSON.stringify(novaLista));
      setItens(novaLista);
      handleEventUpdate();
    }
  };

  function closeModal(e) {
    const modal = document.getElementById('modal');
    if (e.target == modal) {
      modal.classList.remove('ativo');
    }
  };

  function toggleFileUpload() {
    const modal = document.getElementById('modal');
    modal.classList.toggle('ativo');
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
          handleEventUpdate();
          toggleFileUpload();
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
    const blob = new Blob([JSON.stringify(itens, null, 2)], { type: "application/json" });
    saveAs(blob, "notas.txt");
  };

  return(
    <>
      <div className="home">
        
        <div className="container">
          
          <div className='title'>
            {itens.length > 0 ? (
              <div>Sua lista</div>
            ) : (
              <div>Sua lista está vazia</div>
            )}
          </div>

          <div className="search">
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearch}
            />
            <IoSearch/>
          </div>

          <div className="lista">
            {itens.map(item => (
              <div key={item.id}>
                <button onClick={() => removeItem(item.id)}><IoTrashOutline/></button>

                <div className="item">
                  <Link to={'/item/'+item.id} >{item.name}</Link>
                </div>

              </div>
            ))}

            <div className={`item ${isAddItem ? `input`:``}`}>
              {isAddItem ? (
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onBlur={handleAddItem}
                  autoFocus
                />
              ) : ``}
            </div>

          </div>

        </div>

      </div>

      <div className="botoes">
        <div className="btn">
          <button onClick={toggleAddItem}><IoAdd/></button>
          <pre>Adicionar</pre>
        </div>

        <div className="btn">
          <button onClick={toggleFileUpload}><IoCloudUploadOutline/></button>
          <pre>Upload</pre>
        </div>

        <div className="btn">
          <button onClick={handleFileDownload}><IoCloudDownloadOutline/></button>
          <pre>Download</pre>
        </div>

      </div>

      <div id="modal" onClick={closeModal}>
        <div className="container">
          <input
            type="file"
            accept=".txt"
            onChange={handleFileUpload}
          />
        </div>
      </div>

    </>
  );

}

export default Home;
