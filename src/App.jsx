import { useEffect, useState } from "react";
import { cards } from "./data/cards";
import { parseDeck } from "./utils/deckParser";
import { exportPDF } from "./utils/pdf";

import DeckInput from "./components/DeckInput";
import CardRow from "./components/CardRow";
import PreviewGrid from "./components/PreviewGrid";
import PrintOptions from "./components/PrintOptions";

export default function App() {
  const [text, setText] = useState("");
  const [rows, setRows] = useState([]);
  const [cards, setCards] = useState([]);
  
  const loadCards = async () => {
    const cardResponse = await fetch("https://nichobrando.github.io/Dragon-Ball-Fusion-Arena/fusionWorldCardList.json");
  
    const cardData = await cardResponse.json();
    const cardList = [];

    Object.values(cardData).forEach(c => {
      cardList.push(c);
    });

    setCards(cardList);
  }
  
  useEffect(() => {
    loadCards();
  }, []);
  
  const submitDeck = () => {
    const parsed = parseDeck(text);

    const mapped = parsed.map(p => {
      const dbCard = cards.find(c =>
        c.id.toLowerCase() === p.name.split(" ")[0].toLowerCase()
      );

      if (!dbCard) return null;

      const cardOriginalId = (() => {
        const name = (p.name.split(" ")[0] || "").split("-")

        if (name.length >= 2) {
          return `${name[0]}-${name[1]}`;
        }
      })();

      const cardVersions = cards.filter(c =>  {
        return c.id.toLowerCase().startsWith(cardOriginalId.toLowerCase());
      });      

      return {
        ...p,
        ...dbCard,
        arts: [
          dbCard?.face?.back?.image || "",
          dbCard?.face?.front?.image || ""
        ].filter(Boolean),
        cardVersions,
      };
    });

    setRows(mapped.filter(Boolean));
  };

  return (
    <div className="container">
      <div className="content">
        <h1>DBS Fusion World Proxy Printer</h1>

        <p style={{ textAlign: "center" }}>
          You can access <a href="https://tcg-arena.fr/">TCG Arena</a>, build a list of cards you want to print and export them to this site :D
          <br />After click on print proxy, it may take a time until you receive the PDF File
        </p>

        <DeckInput value={text} onChange={setText} onSubmit={submitDeck} />

        {rows.length > 0 && (
          <>
            <div className="cardsPreview">
              {rows.map((r, i) => (
                <CardRow key={i} card={r} setArt={(artId) => {
                  const card = r.cardVersions.find(c => c.id === artId);

                  card.arts = [
                    card.face?.back?.image || "",
                    card.face?.front?.image || ""
                  ].filter(Boolean);

                  setRows(rows.map((row, x) => {
                    if (x === i) {
                      return {
                        ...row,
                        ...card,
                        arts: card.arts,
                      }
                    }

                    return row;
                  }));

                  const previousText = `${r.qty} ${r.id} `;
                  const newText = `${r.qty} ${card.id} `;

                  setText(text.replace(previousText, newText));
                }} />
              ))}
            </div>
            <PrintOptions exportPDF={
              () => {
                const list = [];

                rows.forEach(r => {
                  for (let i = 0; i < r.qty; i++) list.push(r.arts);
                })

                exportPDF(list.flat());
              }} />
            </>
        )}

      </div>
    </div>
  );
}
