import FieldsProfil from "../components/FieldsProfil";
import FieldsEdit from "../components/FieldsEdit";
import EditButton from "../components/EditButton";

function Profil() {
  return (
    <main>
      <h1 className="flex justify-center">Mon Profil</h1>
      <div className="flex justify-end">
        <EditButton />
      </div>
      <FieldsProfil />
      <FieldsEdit />
    </main>
  );
}

export default Profil;
