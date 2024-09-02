import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Menu from './components/Menu';
import Erro from './pages/Erro';
import Item from './pages/Item';

function RoutesApp() {
  return(
    <BrowserRouter>
      <Menu/>
      <Routes>
        <Route path="*" element={<Erro/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/item/:id" element={<Item/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;