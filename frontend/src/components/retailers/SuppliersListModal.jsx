function SuppliersListModal({ name, domaine }) {
  return (
    <tr className="odd:bg-lightBlue/10 even:bg-middleBlue/30">
      <td className="pr-32 pl-5 border-y-8 border-darkBlue/95">{name}</td>
      <td className="p-1 border-y-8 border-darkBlue/95">{domaine}</td>
      <td className="pl-20 pr-20 border-y-8 border-darkBlue/95">
        <button
          type="button"
          className="bg-white text-darkBlue p-1 rounded-2xl flex transition duration-120 ease-out hover:bg-middleBlue"
        >
          Se Connecter
        </button>
      </td>
    </tr>
  );
}

export default SuppliersListModal;
