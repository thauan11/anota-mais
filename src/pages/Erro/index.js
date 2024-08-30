import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import './style.css'

function Erro() {
  return(
    <div className="erro-container">
      <div>
        <h1>404!</h1>
        <p>Página não encontrada</p>
        <Link to={'/'}> <IoArrowBack/> Voltar para o início</Link>
      </div>
    </div>
  );
}

export default Erro;