import { useState } from "react";
import { cards } from "../data/cards";

export default function CardSelector({ addCard }) {
  const [search, setSearch] = useState("");

  const filtered = cards.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="selector">
      <input
        placeholder="Search card..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {filtered.map(card => (
        <div key={card.id} className="card-row">
          <span>{card.name}</span>

          {card.arts.map((art, i) => (
            <button key={i} onClick={() => addCard(art)}>
              Art {i + 1}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
