import { useRef, useState } from "react";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import AnimationWrapper from "../common/page-animation";

const UserAuthForm = () => {
  const [type, setType] = useState("sign-in"); // Estado inicial como "sign-in"


  const authForm = useRef()
  const handleSubmit = (e) =>{
    e.preventDefault()

    let form = new FormData(authForm.current)
  }

  return (
    <AnimationWrapper keyValue={type}>
      <section className="min-h-screen flex items-center justify-center px-6">
        <form ref={authForm} className="w-full max-w-[400px]">
          <h1 className="text-3xl md:text-4xl font-gelasio capitalize text-center mb-12 md:mb-24">
            {type === "sign-in" ? "Bem-Vindo de Volta" : "Aproveite a Poesia"}
          </h1>

          {/* Exibe o campo "Nome Completo" apenas se for signup */}
          {type === "signup" && (
            <InputBox
              name="Nome Completo"
              type="text"
              placeholder="Nome Completo"
              icon="User"
            />
          )}

          <InputBox
            name="E-mail"
            type="email"
            placeholder="E-mail"
            icon="AtSign"
          />
          <InputBox
            name="Senha"
            type="password"
            placeholder="Digite sua Senha"
            icon="Key"
          />

          <button
            className="btn-dark w-full mt-10 py-3 text-lg rounded-lg"
            type="submit"
            onClick={handleSubmit}
          >
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
                <button
                  className="underline text-black"
                  onClick={(e) => {
                    e.preventDefault();
                    setType("signup"); // Muda para signup
                  }}
                >
                  Aproveite conosco
                </button>
              </>
            ) : (
              <>
                Já possui uma conta?{" "}
                <button
                  className="underline text-black"
                  onClick={(e) => {
                    e.preventDefault();
                    setType("sign-in"); // Muda para sign-in
                  }}
                >
                  Sign In Aqui.
                </button>
              </>
            )}
          </p>
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;
