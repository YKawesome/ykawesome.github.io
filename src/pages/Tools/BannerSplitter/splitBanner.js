// Instagram posts are 1080 × 1350 (4:5), but the profile grid shows only the
// middle 3:4 of each one. Neighboring posts therefore overlap by 68px, and a
// row of three is 1012 + 1012 + 1080 = 3104px wide.
export const POST = { width: 1080, height: 1350 };
export const STEP = 1012;
export const ROW_WIDTH = STEP * 2 + POST.width;
export const COLUMNS = 3;

// Banners may be any whole multiple of the base size, with any number of rows.
export function measureBanner(width, height) {
  const size = `This one is ${width} × ${height}.`;
  if (width % ROW_WIDTH) {
    return { error: `${size} Banners need to be ${ROW_WIDTH}px wide, or a multiple like ${ROW_WIDTH * 2}.` };
  }
  const scale = width / ROW_WIDTH;
  const rowHeight = POST.height * scale;
  const rows = height / rowHeight;
  if (!Number.isInteger(rows) || rows < 1) {
    return { error: `${size} At ${width}px wide, each row is ${rowHeight}px tall, so the height should be ${rowHeight}, ${rowHeight * 2}, and so on.` };
  }
  return { scale, rows };
}

const toBlob = (canvas) => new Promise((resolve) => canvas.toBlob(resolve, "image/png"));

// Resolves to one PNG per post in reading order. `order` is when to post it:
// the newest post sits top left, so the bottom-right tile goes up first.
export async function splitBanner(image, { scale, rows }) {
  const width = POST.width * scale;
  const height = POST.height * scale;
  const tiles = [];
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < COLUMNS; column++) {
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(width);
      canvas.height = Math.round(height);
      canvas.getContext("2d").drawImage(image, STEP * scale * column, height * row, width, height, 0, 0, canvas.width, canvas.height);
      tiles.push({ row, column, order: (rows - 1 - row) * COLUMNS + (COLUMNS - column), blob: await toBlob(canvas) });
    }
  }
  return tiles;
}
