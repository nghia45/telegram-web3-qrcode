import "./index.css";

type Props = {
  onClick: () => void;
};

const MenuButton = ({ onClick }: Props) => {
  return (
    <button id="menu--button" onClick={onClick}>
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

export default MenuButton;
