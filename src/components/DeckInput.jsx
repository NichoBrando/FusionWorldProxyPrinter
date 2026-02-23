export default function DeckInput({ value, onChange, onSubmit }) {
  return (
    <div className="deckRegisterContainer">
      <div className="deck-box">
        <textarea
          className="deckinput"
          placeholder="1 FB01-001 Son Goku&#10;2 FB09-121 Gogeta : BR"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </div>
      <button className="submitButtn" onClick={onSubmit}>Add cards</button>
    </div>
  );
}
