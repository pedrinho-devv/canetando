import { useRef, useState, useEffect } from "react";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import AnimationWrapper from "../common/page-animation";

const UserAuthForm = () => {
  const [type, setType] = useState("sign-in");
  const authForm = useRef(null); // Inicializa corretamente com null

  // Para garantir que a referência do formulário seja acessada corretamente após o componente ser montado
  useEffect(() => {
    console.log("Formulário montado:", authForm.current);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Referência do formulário:", authForm.current);

    if (!authForm.current) {
      console.error("Erro: O formulário não foi encontrado.");
      return;
    }

    const form = new FormData(authForm.current);
    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    let { email, password, fullName } = formData;

    // Expressões regulares para validação
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    // Validação do Nome Completo (apenas no signup)
    if (type === "signup" && (!fullName || fullName.trim().length < 3)) {
      console.error("Erro: O nome completo deve ter pelo menos 3 caracteres.");
      return;
    }

    // Validação de Email
    if (!email || !email.trim().length) {
      console.error("Erro: O campo de e-mail é obrigatório.");
      return;
    }

    if (!emailRegex.test(email)) {
      console.error("Erro: E-mail inválido!");
      return;
    }

    // Validação de Senha
    if (!passwordRegex.test(password)) {
      console.error(
        "Erro: A senha deve ter entre 6 a 20 caracteres, incluindo pelo menos um número, uma letra minúscula e uma maiúscula."
      );
      return;
    }

    console.log("Formulário válido:", formData);
  };

  return (
    <AnimationWrapper keyValue={type}>
      <section className="min-h-screen flex items-center justify-center px-6">
        {/* Adicionado "noValidate" para evitar a validação automática do HTML */}
        <form ref={authForm} className="w-full max-w-[400px]" onSubmit={handleSubmit} noValidate>
          <h1 className="text-3xl md:text-4xl font-gelasio capitalize text-center mb-12 md:mb-24">
            {type === "sign-in" ? "Bem-Vindo de Volta" : "Aproveite a Poesia"}
          </h1>

          {type === "signup" && (
            <InputBox name="fullName" type="text" placeholder="Nome Completo" icon="User" />
          )}

          <InputBox name="email" type="email" placeholder="E-mail" icon="AtSign" />
          <InputBox name="password" type="password" placeholder="Digite sua Senha" icon="Key" />

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
                <button
                  className="underline text-black"
                  onClick={(e) => {
                    e.preventDefault();
                    setType("signup");
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
                    setType("sign-in");
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
