function FormField({
  name,
  label,
  placeholder = "",
  changeInfos,
  type = "text",
}) {
  return (
    <label htmlFor={name} className="text-xl font-bold flex flex-col">
      {label}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={(e) => changeInfos(e)}
        className="bg-middleBlue bg-opacity-50 text-dark p-2 mt-1 mb-3 shadow-lg placeholder-darkBlue"
      />
    </label>
  );
}

export default FormField;
