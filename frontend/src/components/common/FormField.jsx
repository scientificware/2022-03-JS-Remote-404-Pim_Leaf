function FormField({ name, labels, placeholder = "" }) {
  return (
    <label htmlFor={labels} className="text-xl font-bold flex flex-col">
      {name}
      <input
        type="text"
        name={labels}
        placeholder={placeholder}
        className="bg-middleBlue bg-opacity-50 text-darkBlue p-2 mt-1 mb-3 shadow-lg placeholder-darkBlue"
      />
    </label>
  );
}

export default FormField;
