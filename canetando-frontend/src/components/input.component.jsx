import { User, AtSign } from 'lucide-react';

const InputBox = ({ name, type, id, value, placeholder, icon }) => {
  // Dynamically render the icon
  const IconComponent = icon === "User" ? User : AtSign;
  
  return (
    <div className="relative w-[100%] mb-4">
      <input
        name={name}
        type={type}
        id={id}
        defaultValue={value}
        placeholder={placeholder}
        className="input-box"
      />
      <IconComponent className="input-icon absolute right-4 top-1/2 transform -translate-y-1/2" />
    </div>
  );
};

export default InputBox;
