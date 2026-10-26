function NikkahSlide({ wedding }) {
  return (
    <div className="slide-content">
      <h2 className="urdu">{wedding.brideNameUrdu}</h2>
      <p className="urdu">اور</p>
      <h2 className="urdu">{wedding.groomNameUrdu}</h2>

      <p className="mt-4 mb-0">Are going to say</p>
      <h1 className="script-title">"Qubool Hai"</h1>
    </div>
  );
}

export default NikkahSlide;