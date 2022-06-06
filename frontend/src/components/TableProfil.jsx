import userProfil from "../data/ClementData";

function TableProfil() {
  return (
    <div className="ml-20 mr-20">
      {userProfil.map((user) => (
        <div>
          Mon nom :
          <p
            key={user.id}
            className="bg-middleBlue bg-opacity-50 text-darkBlue p-2"
          >
            {user.name}
          </p>
          <p>{user.company}</p>
          Adresse email :
          <p className="bg-middleBlue bg-opacity-50 text-darkBlue p-2">
            {user.mail}
          </p>
          Ancien mot de passe :
          <p className="bg-middleBlue bg-opacity-50 text-darkBlue p-2">
            {user.password}
          </p>
        </div>
      ))}
    </div>
  );
}

export default TableProfil;
