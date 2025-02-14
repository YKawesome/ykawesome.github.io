import React, { useState } from "react";
import { images } from "../../utils/preloadimages";

function Splitter() {
  const banner = images["shetrbanner.png"];

  const [file, setFile] = useState(null);
  const [croppedImages, setCroppedImages] = useState([]);
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

    // Read the file as a Data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const { width, height } = img;
        const baseWidth = 3104;
        const baseHeight = 1350;

        // Validate that the image is an integer multiple of the base dimensions
        if (width % baseWidth !== 0 || height % baseHeight !== 0) {
          setErrorMessage(
            "Image dimensions must be an integer multiple of 3104×1350."
          );
          return;
        }
        const scaleW = width / baseWidth;
        const scaleH = height / baseHeight;
        if (scaleW !== scaleH) {
          setErrorMessage(
            "Width and height scale factors do not match. Please use a properly scaled image."
          );
          return;
        }
        const k = scaleW; // Scale factor (e.g., 2 for a 2× image)

        // Define base crop parameters:
        // Crop 1: (0, 0, 1080, 1350)
        // Crop 2: (1012, 0, 2092, 1350)
        // Crop 3: (2024, 0, 3104, 1350)
        const baseCropWidth = 1080; // Width of the crop in the base image
        const baseOffset = 1012; // Horizontal offset between crops in the base image

        // Scale crop parameters according to k
        const scaledCropWidth = baseCropWidth * k;
        const scaledOffset = baseOffset * k;
        const scaledCropHeight = baseHeight * k;

        // Define the three crop rectangles (x, y, width, height)
        const cropRects = [
          { x: 0, y: 0, width: scaledCropWidth, height: scaledCropHeight },
          {
            x: scaledOffset,
            y: 0,
            width: scaledCropWidth,
            height: scaledCropHeight,
          },
          {
            x: scaledOffset * 2,
            y: 0,
            width: scaledCropWidth,
            height: scaledCropHeight,
          },
        ];

        // Generate the cropped images
        const results = cropRects.map((rect) => {
          const canvas = document.createElement("canvas");
          canvas.width = rect.width;
          canvas.height = rect.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(
            img,
            rect.x,
            rect.y,
            rect.width,
            rect.height, // Source rectangle
            0,
            0,
            rect.width,
            rect.height // Destination rectangle
          );
          return canvas.toDataURL("image/png");
        });
        setCroppedImages(results);
        setSuccessMessage("Image split successfully! Download should start right now :D");
        setErrorMessage("");

        // Automatically download each cropped image with the prefix "split_"
        results.forEach((dataUrl, index) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `split_${index + 1}_${file.name}`;
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
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <div className="hero-overlay bg-opacity-95"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="lg:max-w-lg max-w-md">
            <h1 className="mb-5 lg:text-6xl text-5xl font-bold">
              IG Banner Splitter
            </h1>
            <p className="mb-5">
              A tool for splitting banner posts for the new Instagram Ratio.{" "}
              <br />
              Made because while the new post ratio is 4:5, the grid preview is
              3:4; bleeding is needed to make the banner look right without
              cutoff/cropping.
              <br />
              <span className="font-bold">Currently only supports 3x1 banners.</span>
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
    </>
  );
}

export default Splitter;
