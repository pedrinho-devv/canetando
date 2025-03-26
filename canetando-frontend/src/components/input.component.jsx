import { User, AtSign, Key, EyeClosed, Eye } from 'lucide-react';
import { useState } from 'react';

const InputBox = ({ name, type, id, value, placeholder, icon }) => {
  let IconComponent;

  if (icon === "User") {
    IconComponent = User;
  } else if (icon === "AtSign") {
    IconComponent = AtSign;
  } else if (icon === "Key") {
    IconComponent = Key;
  } else {
    IconComponent = () => <span>Invalid Icon</span>;
  }

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (
    <div className="relative w-full mb-4">
      <IconComponent className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />

      <input
        name={name}
        type={type === "password" ? (passwordVisibility ? "text" : "password") : type}
        id={id}
        defaultValue={value}
        placeholder={placeholder}
        className="input-box pl-16 pr-10"
      />

      {type === "password" && (
        <button
          type="button"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={() => setPasswordVisibility((prev) => !prev)}
        >
          {passwordVisibility ? <Eye size={20} /> : <EyeClosed size={20} />}
        </button>
      )}
    </div>
  );
};

export default InputBox;
