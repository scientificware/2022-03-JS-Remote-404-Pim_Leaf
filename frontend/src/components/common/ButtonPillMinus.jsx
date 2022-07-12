function ButtonPillMinus({ action, target }) {
  return (
    <button type="button" onClick={() => action(target)}>
      <img
        src="http://localhost:3000/src/assets/icon_minus.svg"
        alt="minus icon for illustration"
        className="w-9 m-2 transition duration-120 ease-out hover:scale-110"
      />
    </button>
  );
}

export default ButtonPillMinus;
