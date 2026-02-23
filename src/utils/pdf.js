import jsPDF from "jspdf";

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.src = src;
  });
}

export async function exportPDF(imageList = []) {
  if (!imageList.length) return;

  const pdf = new jsPDF("p", "mm", "a4");

  // === layout config ===
  const cardW = 63;     // width in mm
  const cardH = 88;     // height in mm
  const gap = 2;        // spacing
  const cols = 3;
  const rows = 3;

  const pageW = 210;
  const pageH = 297;

  const startX = (pageW - (cols * cardW + (cols - 1) * gap)) / 2;
  const startY = (pageH - (rows * cardH + (rows - 1) * gap)) / 2;

  const perPage = cols * rows;

  for (let i = 0; i < imageList.length; i++) {
    const indexInPage = i % perPage;

    // new page
    if (i !== 0 && indexInPage === 0) {
      pdf.addPage();
    }

    const col = indexInPage % cols;
    const row = Math.floor(indexInPage / cols);

    const x = startX + col * (cardW + gap);
    const y = startY + row * (cardH + gap);

    const img = await loadImage(imageList[i]);

    pdf.addImage(img, "WEBP", x, y, cardW, cardH);
  }

  pdf.save("dbs-proxies.pdf");
}