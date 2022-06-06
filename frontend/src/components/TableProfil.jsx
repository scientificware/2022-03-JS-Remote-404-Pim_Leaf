import userProfil from "../data/ClementData";

function TableProfil() {
  return (
    <div>
      {userProfil.map((user) => (
        <>
          <p>{user.name}</p>
          <p>{user.mail}</p>
          <p>{user.password}</p>
        </>
      ))}
    </div>
  );
}

export default TableProfil;
