function ButtonPillMinus({ action, target }) {
  return (
    <div>
      <button type="button" onClick={() => action(target)}>
        <img
          src="http://localhost:3000/src/assets/icon_minus.svg"
          alt="minus icon for illustration"
          className="w-12 m-4 transition duration-120 ease-out hover:scale-110"
        />
      </button>
    </div>
  );
}

export default ButtonPillMinus;
