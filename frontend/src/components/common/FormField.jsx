function FormField({ name, label, placeholder = "", changeInfos }) {
  return (
    <label htmlFor={name} className="text-xl font-bold flex flex-col">
      {label}
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        onChange={(e) => changeInfos(e)}
        className="bg-middleBlue bg-opacity-50 text-darkBlue p-2 mt-1 mb-3 shadow-lg placeholder-darkBlue"
      />
    </label>
  );
}

export default FormField;
