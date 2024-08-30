import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Header from './components/header';
import Erro from './pages/Erro';
import Item from './pages/Item';

function RoutesApp() {
  return(
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="*" element={<Erro/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/item/:id" element={<Item/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;