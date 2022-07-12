function ButtonPillDownload({ action }) {
  return (
    <button type="button" onClick={action}>
      <img
        src="http://localhost:3000/src/assets/icon_download.svg"
        alt="download icon for illustration"
        className="w-10 m-4 transition duration-120 ease-out hover:scale-110"
      />
    </button>
  );
}

export default ButtonPillDownload;
