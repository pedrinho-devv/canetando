import { Link } from "react-router-dom";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";

const UserAuthForm = ({ type }) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <form className="w-full max-w-[400px]">
        <h1 className="text-3xl md:text-4xl font-gelasio capitalize text-center mb-12 md:mb-24">
          {type === "sign-in" ? "Bem-Vindo de Volta" : "Aproveite a Poesia"}
        </h1>

        {type !== "sign-in" && (
          <InputBox
            name="Nome Completo"
            type="text"
            placeholder="Nome Completo"
            icon="User"
          />
        )}

        <InputBox name="E-mail" type="email" placeholder="E-mail" icon="AtSign" />
        <InputBox name="Senha" type="password" placeholder="Digite sua Senha" icon="Key" />

        <button className="btn-dark w-full mt-10 py-3 text-lg rounded-lg" type="submit">
          {type === "sign-in" ? "Entrar" : "Cadastrar"}
        </button>

        <div className="relative w-full flex items-center gap-2 my-8 opacity-50 uppercase text-black font-bold">
          <hr className="w-1/2 border-black" />
          <p>Ou</p>
          <hr className="w-1/2 border-black" />
        </div>

        <button className="btn-dark flex items-center justify-center w-full max-w-[350px] mx-auto gap-2 py-3 px-4 text-sm md:text-base rounded-lg shadow-md">
          <img src={googleIcon} alt="logo google" className="w-5 h-5" />
          Continue com sua conta Google
        </button>

        <p className="mt-6 text-dark-grey text-lg text-center">
          {type === "sign-in" ? (
            <>
              Ainda não possui uma conta?{" "}
              <Link to="/signup" className="underline text-black">
                Aproveite conosco
              </Link>
            </>
          ) : (
            <>
              Já possui uma conta?{" "}
              <Link to="/signin" className="underline text-black">
                Sign In Aqui.
              </Link>
            </>
          )}
        </p>
      </form>
    </section>
  );
};

export default UserAuthForm;
