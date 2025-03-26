import Logo from "../imgs/logo.png";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const [searchVisibility, setSearchVisibility] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="flex-none w-10">
        <img src={Logo} alt="logo" className="w-full" />
      </Link>

      <div
        className={
          "absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto " +
          (searchVisibility ? "show" : "hide")
        }
      >
        <input
          type="text"
          placeholder="Pesquisar"
          className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-grey-dark md:pl-12"
        />
        <FaSearch
          size={24}
          className="text-dark-grey absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl"
        />
      </div>

      <div className="flex items-center gap-3 md:gap-6 ml-auto">
        <button className="md:hidden bg-grey absolute w-12 h-12 rounded-full flex items-center justify-center absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl">
          <FaSearch
            size={24}
            className="text-2xl text-grey-100"
            onClick={() => setSearchVisibility((currentVal) => !currentVal)}
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
