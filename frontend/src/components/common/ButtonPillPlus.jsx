function ButtonPillPlus({ action }) {
  return (
    <button type="button" onClick={action}>
      <img
        src="http://localhost:3000/src/assets/icon_plus.svg"
        alt="plus icon for illustration"
        className="w-9 m-2 transition duration-120 ease-out hover:scale-110"
      />
    </button>
  );
}

export default ButtonPillPlus;
