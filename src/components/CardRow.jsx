export default function CardRow({ card, setArt }) {
  const selectedVersion = card.cardVersions.find(c => c.id === card.id)?.id;

  return (
    <div className="card-row">
      <img src={card.arts[0]} height={240} alt={card.name} />
      <span>{card.qty}x {card.name}</span>

      <select onChange={e => setArt(e.target.value)} value={selectedVersion}>
        {card.cardVersions.map((a, i) => (
          <option key={i} value={a.id}>
            {a.id}
          </option>
        ))}
      </select>
    </div>
  );
}
