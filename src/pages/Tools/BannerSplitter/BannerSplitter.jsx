import { useEffect, useRef, useState } from "react";
import exampleBanner from "../../../assets/sunny-rocco.webp";
import { POST, ROW_WIDTH, STEP, measureBanner, splitBanner } from "./splitBanner";

const loadImage = (src) => new Promise((resolve, reject) => {
  const image = new Image();
  image.onload = () => resolve(image);
  image.onerror = reject;
  image.src = src;
});
const withUrls = (tiles) => tiles.map((tile) => ({ ...tile, url: URL.createObjectURL(tile.blob) }));
const revokeTiles = (banner) => banner?.tiles.forEach((tile) => URL.revokeObjectURL(tile.url));
// Non-breaking spaces keep a size like 6208 × 2700 on one line.
const size = (width, height) => `${width}\u00a0×\u00a0${height}`;

function save(href, filename) {
  const link = document.createElement("a");
  link.href = href;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
}

function BannerSplitter() {
  const [example, setExample] = useState(null);
  const [upload, setUpload] = useState(null);
  const [status, setStatus] = useState({ busy: false, error: "" });
  const [dragging, setDragging] = useState(false);
  const latestFile = useRef(0);

  // The example is a scaled-down banner, so it skips the size check.
  useEffect(() => {
    let cancelled = false;
    let banner;
    loadImage(exampleBanner)
      .then((image) => splitBanner(image, { scale: image.naturalWidth / ROW_WIDTH, rows: 1 }))
      .then((tiles) => {
        if (cancelled) return;
        banner = { src: exampleBanner, rows: 1, tiles: withUrls(tiles) };
        setExample(banner);
      });
    return () => {
      cancelled = true;
      revokeTiles(banner);
    };
  }, []);

  useEffect(() => () => {
    if (!upload) return;
    URL.revokeObjectURL(upload.src);
    revokeTiles(upload);
  }, [upload]);

  const openFile = async (file) => {
    if (!file) return;
    // Only the most recent pick wins if an earlier one finishes later.
    const attempt = ++latestFile.current;
    setStatus({ busy: true, error: "" });
    const src = URL.createObjectURL(file);
    try {
      const image = await loadImage(src);
      const layout = measureBanner(image.naturalWidth, image.naturalHeight);
      if (layout.error) throw new Error(layout.error);
      const tiles = withUrls(await splitBanner(image, layout));
      if (attempt !== latestFile.current) {
        URL.revokeObjectURL(src);
        revokeTiles({ tiles });
        return;
      }
      setUpload({ name: file.name, base: file.name.replace(/\.[^.]+$/, ""), src, rows: layout.rows, tiles });
      setStatus({ busy: false, error: "" });
    } catch (error) {
      URL.revokeObjectURL(src);
      if (attempt !== latestFile.current) return;
      setUpload(null);
      setStatus({ busy: false, error: error instanceof Error ? error.message : "That file couldn’t be opened as an image." });
    }
  };

  // Numbered by posting order, so sorting by name gives the order to post in.
  const filename = (tile) => `${upload.base}-${String(tile.order).padStart(String(upload.tiles.length).length, "0")}.png`;
  const inPostingOrder = () => upload.tiles.toSorted((a, b) => a.order - b.order);

  const downloadZip = async () => {
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();
    inPostingOrder().forEach((tile) => zip.file(filename(tile), tile.blob));
    const url = URL.createObjectURL(await zip.generateAsync({ type: "blob" }));
    save(url, `${upload.base}-posts.zip`);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const downloadEach = () => inPostingOrder().forEach((tile) => save(tile.url, filename(tile)));

  const shown = upload ?? example;

  return (
    <div className="splitter">
      <div className="splitter-main">
        <label
          className="tool-drop"
          data-dragging={dragging || undefined}
          onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => { event.preventDefault(); setDragging(false); openFile(event.dataTransfer.files[0]); }}
        >
          <input className="visually-hidden" type="file" accept="image/*" onChange={(event) => { openFile(event.target.files[0]); event.target.value = ""; }} />
          {upload ? (
            <>
              <strong>{upload.name}</strong>
              <span>{upload.rows === 1 ? "1 row" : `${upload.rows} rows`}, {upload.tiles.length} posts · <u>choose another</u></span>
            </>
          ) : (
            <>
              <strong>Drop your banner here</strong>
              <span>or <u>choose a file</u></span>
            </>
          )}
          <small>PNG or JPG, {size(ROW_WIDTH, POST.height)} per row</small>
        </label>
        {status.busy && <p className="tool-status" role="status">Cutting it up…</p>}
        {status.error && <p className="tool-status tool-status--error" role="alert">{status.error}</p>}

        {shown && (
          <>
            <figure className="splitter-figure">
              <figcaption><h2>How it gets cut</h2><span>{upload ? upload.name : "Example banner"}</span></figcaption>
              <div className="splitter-banner" style={{ "--rows": shown.rows, "--slice": POST.width / ROW_WIDTH }}>
                <img src={shown.src} alt={upload ? `Your banner, ${upload.name}` : "Example banner: an illustrated character with floppy ears beside the words Sunny Rocco"} />
                {shown.tiles.map((tile) => <span key={tile.order} aria-hidden="true" style={{ "--row": tile.row, "--left": (STEP * tile.column) / ROW_WIDTH }} />)}
              </div>
            </figure>
            <figure className="splitter-figure">
              <figcaption><h2>On your profile</h2><span>Post them in order, 1 first.</span></figcaption>
              <ol className="splitter-grid">
                {shown.tiles.map((tile) => (
                  <li key={tile.order}><img src={tile.url} alt={`Post ${tile.order}`} /><span aria-hidden="true">{tile.order}</span></li>
                ))}
              </ol>
            </figure>
          </>
        )}

        {upload && (
          <div className="tool-actions">
            <button className="tool-button tool-button--primary" type="button" onClick={downloadZip}>Download all (.zip)</button>
            <button className="tool-button" type="button" onClick={downloadEach}>Download separately</button>
          </div>
        )}
      </div>

      <aside className="tool-notes" aria-labelledby="splitter-sizes">
        <h2 id="splitter-sizes">The sizes</h2>
        <dl>
          <div><dt>Banner</dt><dd>{size(ROW_WIDTH, POST.height)} per row, or a multiple like {size(ROW_WIDTH * 2, POST.height * 2)}</dd></div>
          <div><dt>Each post</dt><dd>{size(POST.width, POST.height)}, which is 4:5</dd></div>
          <div><dt>Shown in the grid</dt><dd>The middle {size(STEP, POST.height)} or so, which is 3:4</dd></div>
          <div><dt>Overlap</dt><dd>{POST.width - STEP}px between neighboring posts</dd></div>
        </dl>
        <p>Instagram puts your newest post at the top left, so the last tile goes up first. Downloads are numbered in that order.</p>
        <p>It all happens in your browser. Your banner isn’t uploaded anywhere.</p>
      </aside>
    </div>
  );
}

export default BannerSplitter;
