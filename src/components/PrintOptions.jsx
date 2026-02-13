export default function PrintOptions({ exportPDF }) {
  return (
    <div className="options">
      <button onClick={exportPDF}>Print PDF</button>
    </div>
  );
}
