function ButtonBlue({ action, text }) {
  return (
    <button
      type="button"
      onClick={action}
      className="py-6 w-1/4 text-white text-base bg-darkBlue hover:bg-opacity-80 rounded-full  m-auto my-12"
    >
      {text}
    </button>
  );
}

export default ButtonBlue;
