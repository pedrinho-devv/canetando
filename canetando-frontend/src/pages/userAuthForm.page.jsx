import InputBox from "../components/input.component";

const UserAuthForm = ({ type }) => {
  return (
    <section className="h-cover flex items-center justify-center">
      <form className="w-[80%] max-w-[400px]">
        <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
          {type === "sign-in" ? "Bem-Vindo" : "Aproveite a Poesia"}
        </h1>
        {type !== "sign-in" && (
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
      </form>
    </section>
  );
};

export default UserAuthForm;
