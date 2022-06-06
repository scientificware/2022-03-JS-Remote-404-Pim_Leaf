import TableProfil from "../components/TableProfil";
import IconEdit from "../assets/icon_edit.svg";

function Profil() {
  return (
    <main>
      <h1 className="flex justify-center">Mon Profil</h1>
      <div className="flex justify-end">
        <button type="button" onClick={() => console.warn("edit button")}>
          <img src={IconEdit} alt="icon-edit" className="w-16 mr-16" />
        </button>
      </div>
      <TableProfil />
      <div className="flex justify-center">
        <button
          type="button"
          className="py-2 w-28 text-center text-white text-base bg-darkBlue hover:bg-opacity-90 rounded-full mt-12"
        >
          Enregistrer
        </button>
      </div>
    </main>
  );
}

export default Profil;
