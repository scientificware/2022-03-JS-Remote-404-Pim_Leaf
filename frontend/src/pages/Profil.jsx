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
    </main>
  );
}

export default Profil;
