const inputFile = document.getElementById("input-file");
const qualityInput = document.getElementById("quality");
const compressBtn = document.getElementById("compress-btn");
const downloadBtn = document.getElementById("download-btn");
const output = document.getElementById("output");

compressBtn.addEventListener("click", function () {
  if (inputFile.files.length > 0) {
    const file = inputFile.files[0];
    const reader = new FileReader();

    reader.onload = function () {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set canvas dimensions to the dimensions of the image
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image onto the canvas
        ctx.drawImage(img, 0, 0);

        // Get the compressed data URL of the image
        const compressedDataURL = canvas.toDataURL("image/jpeg", qualityInput.value / 100);

        // Create a new image element with the compressed data URL
        const compressedImg = document.createElement("img");
        compressedImg.src = compressedDataURL;
        compressedImg.alt = "Compressed Image";

        // Clear the output div and append the compressed image
        output.innerHTML = "";
        output.appendChild(compressedImg);

        // Set the download link
        downloadBtn.href = compressedDataURL;
        downloadBtn.download = "compressed-image.jpg";
        downloadBtn.style.display = "block";
      };

      // Set the source of the image to the file data URL
      img.src = reader.result;
    };

    // Read the file as a data URL
    reader.readAsDataURL(file);
  }
});
