import React, { useState } from "react";
import { images } from "../../utils/preloadimages";
import { motion } from "framer-motion";

function Splitter() {
  const banner = images["suneri.png"];

  const [file, setFile] = useState(null);
  const [croppedImages, setCroppedImages] = useState([]);
  const [rows, setRows] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // When a file is selected, store it in state
  const handleFileChange = (event) => {
    const selected = event.target.files[0];
    if (selected) {
      setFile(selected);
      setErrorMessage("");
      setSuccessMessage("");
      setCroppedImages([]); // Clear any previous results
    }
  };

  // Triggered when the "Split!" button is clicked
  const handleSplit = () => {
    if (!file) {
      setErrorMessage("Please select a file first.");
      return;
    }
    if (rows < 1) {
      setErrorMessage("Rows must be a positive integer.");
      return;
    }

    // Read the file as a Data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const { width, height } = img;
        const baseWidth = 3104; // Base total width for 3 columns
        const baseHeight = 1350; // Base height for one row

        // Determine scale factor from the width
        if (width % baseWidth !== 0) {
          setErrorMessage("Image width must be an integer multiple of 3104.");
          return;
        }
        const k = width / baseWidth;

        // For multi-row banners the total expected height is (baseHeight * rows * k)
        if (height !== baseHeight * rows * k) {
          setErrorMessage(
            `For ${rows} row(s), the image height must be ${
              baseHeight * rows * k
            } (i.e. each row is ${baseHeight * k}px tall).`
          );
          return;
        }

        // Define base crop parameters for one row:
        // Crop 1: (0, 0, 1080, 1350)
        // Crop 2: (1012, 0, 1080, 1350)
        // Crop 3: (2024, 0, 1080, 1350)
        const baseCropWidth = 1080; // Width of one crop in the base image
        const baseOffset = 1012; // Horizontal offset for subsequent crops in the base image

        // Scale crop parameters according to the scale factor k
        const scaledCropWidth = baseCropWidth * k;
        const scaledOffset = baseOffset * k;
        const scaledCropHeight = baseHeight * k; // Height for one row

        // Generate the cropped images for each row and each of the 3 columns
        const results = [];
        for (let r = 0; r < rows; r++) {
          const yOffset = r * scaledCropHeight;
          // Loop for each column (3 columns)
          for (let c = 0; c < 3; c++) {
            let x = 0;
            if (c === 0) {
              x = 0;
            } else if (c === 1) {
              x = scaledOffset;
            } else if (c === 2) {
              x = scaledOffset * 2;
            }
            const canvas = document.createElement("canvas");
            canvas.width = scaledCropWidth;
            canvas.height = scaledCropHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(
              img,
              x,
              yOffset,
              scaledCropWidth,
              scaledCropHeight, // Source rectangle for this crop
              0,
              0,
              scaledCropWidth,
              scaledCropHeight // Destination rectangle
            );
            results.push({
              dataUrl: canvas.toDataURL("image/png"),
              filename: `split_r${r + 1}_c${c + 1}_${file.name}`,
            });
          }
        }

        // Update state and set success message
        setCroppedImages(results.map((res) => res.dataUrl));
        setSuccessMessage(
          "Image split successfully! Download should start right now :D"
        );
        setErrorMessage("");

        // Automatically download each cropped image with a row/column prefix
        results.forEach((result) => {
          const link = document.createElement("a");
          link.href = result.dataUrl;
          link.download = result.filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      };

      img.onerror = () => {
        setErrorMessage("Failed to load the image.");
      };

      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content md:text-center">
          <div className="md:w-xl sm:w-sm w-xs p-8 glass bg-black/20 rounded-2xl shadow-2xl">
            <h1 className="mb-5 md:text-6xl text-5xl font-bold text-center">
              IG Banner Splitter
            </h1>
            <p className="mb-5">
              A tool for splitting banner posts for the new Instagram Ratio.{" "}
              <br />
              Made because while the new post ratio is 4:5, the grid preview is
              3:4; bleeding is needed to make the banner look right without
              cutoff/cropping.
              <br />
              <span className="font-bold">
                Supports multi-row banners now (each row is split into 3 parts).
              </span>
            </p>
            <div className="flex flex-col space-y-4 items-center justify-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={`file-input file-input-bordered w-full max-w-xs bg-neutral ${
                  errorMessage
                    ? "file-input-error"
                    : file
                    ? "file-input-success"
                    : "file-input-primary"
                }`}
              />
              <input
                type="number"
                placeholder="Rows"
                min={1}
                onChange={(e) => setRows(parseInt(e.target.value, 10) || 1)}
                className="input input-bordered input-accent text-base-content max-w-xs w-full"
              />
              <button
                className="btn btn-secondary max-w-xs w-full hovergrow"
                onClick={handleSplit}
              >
                Split!
              </button>
              {errorMessage && (
                <p className="max-w-xs text-error">{errorMessage}</p>
              )}
              {successMessage && (
                <p className="max-w-xs text-success">{successMessage}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {errorMessage && (
        <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
      )}
    </motion.div>
  );
}

export default Splitter;