const express = require("express");
const B2 = require("backblaze-b2");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

const b2Config = {
  applicationKeyId: "d77e3ae41db7",
  applicationKey: "003129a379958dc0fa2ce47911e9b404d9944962ed",
};

// Function to download and save the image locally
const downloadAndSaveImage = async () => {
  const b2 = new B2(b2Config);

  try {
    await b2.authorize();

    const fileUrl = await b2.downloadFileById({
      fileId:
        "4_zed67473e333a8e94910d0b17_f105253257dca6d47_d20240706_m182449_c003_v0312009_t0016_u01720290289537",
    });

    const fileName = "logo.jpeg"; // Replace with your file name
    const localFilePath = path.join(__dirname, fileName);

    // Download the file and save locally
    const response = await axios({
      url: fileUrl,
      method: "GET",
      responseType: "stream",
    });

    response.data.pipe(fs.createWriteStream(localFilePath));

    console.log(`File downloaded and saved locally: ${localFilePath}`);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Route to serve the HTML page with the image
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Route to serve the image file
app.get("/image", (req, res) => {
  const fileName = "logo.jpeg"; // Replace with your file name
  const filePath = path.join(__dirname, fileName);

  res.sendFile(filePath);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://192.168.1.9:${port}`);
});

// Uncomment to download and save the image locally
// downloadAndSaveImage();
