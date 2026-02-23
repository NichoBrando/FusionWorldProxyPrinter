const PER_PAGE = 9;

export default function PreviewGrid({ images }) {
  
  const pages = [];

  for (let i = 0; i < images.length; i += PER_PAGE) {
    pages.push(images.slice(i, i + PER_PAGE));
  }

  return (
    <>
      {pages.map((page, p) => (
        <div key={p} className="print-page">
          {page.map((img, i) => (
            <img key={i} src={img} height={238.11023622} width={332.5984252} className="proxy" />
          ))}
        </div>
      ))}
    </>
  );
}
