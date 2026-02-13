import CardItem from "./CardItem";

export default function PrintGrid({ list }) {
  return (
    <div id="print-area" className="grid">
      {list.map((img, i) => (
        <CardItem key={i} image={img} />
      ))}
    </div>
  );
}
