// components/Button.jsx
const Button = ({ children, onClick, type = "button" }) => (
  <button
    type={type}
    onClick={onClick}
    className="w-full py-3 font-semibold rounded-lg transition duration-200 shadow-md hover:shadow-lg text-white bg-blue-500 hover:bg-blue-600"
  >
    {children}
  </button>
);

export default Button;
