import Logo from "../imgs/logo.png";
import { Link, Outlet } from "react-router-dom";
import { Search, PencilLine } from "lucide-react"; // Importando os ícones do Lucide
import { useState } from "react";

const Navbar = () => {
  const [searchVisibility, setSearchVisibility] = useState(false);

  return (
    <>
      <nav className="navbar flex items-center justify-between px-4 py-2">
        <Link to="/" className="flex-none w-10">
          <img src={Logo} alt="logo" className="w-full" />
        </Link>

        <div
          className={
            "absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show " +
            (searchVisibility ? "show" : "hide")
          }
        >
          <input
            type="text"
            placeholder="Pesquisar"
            className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-grey-dark md:pl-12"
          />
          <Search
            size={24}
            className="text-dark-grey absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl"
          />
        </div>

        <div className="flex items-center gap-3 md:gap-6 ml-auto">
          {/* Botão de pesquisa para mobile */}
          <button
            className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center"
            onClick={() => setSearchVisibility((currentVal) => !currentVal)}
          >
            <Search size={20} className="text-2xl text-grey-100" />
          </button>

          {/* Link para o editor */}
          <Link to="/editor" className="hidden md:flex gap-2 link">
            <PencilLine size={20} />
            <p>Publicar</p>
          </Link>

          {/* Botões de autenticação */}
          <Link
            className="btn-dark text-white px-4 py-2 rounded-md hover:bg-opacity-80 transition"
            to="/signin"
          >
            Sign In
          </Link>
          <Link
            className="btn-light text-dark px-4 py-2 hidden md:block rounded-md hover:bg-opacity-80 transition"
            to="/signup"
          >
            Sign Up
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
