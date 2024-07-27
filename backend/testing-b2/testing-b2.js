// const B2 = require("backblaze-b2");

// // Initialize B2 client
// const b2 = new B2({
//   applicationKeyId: "d77e3ae41db7",
//   applicationKey: "003129a379958dc0fa2ce47911e9b404d9944962ed",
// });

// // Function to generate a temporary download URL
// async function getTemporaryDownloadUrl(bucketName, fileName) {
//   try {
//     // Authorize with B2
//     await b2.authorize();

//     // Get download authorization
//     const fileInfo = await b2.getFileInfo({
//       bucketName,
//       fileName,
//     });

//     // Generate temporary download URL
//     const downloadUrl = await b2.getDownloadAuthorization({
//       bucketId: fileInfo.data.bucketId,
//       fileId: fileInfo.data.fileId,
//       fileName,
//     });

//     return downloadUrl.data.downloadUrl;
//   } catch (error) {
//     console.error("Error generating temporary download URL:", error);
//     throw error;
//   }
// }

// // Example usage:
// const bucketName = "placeisyours";
// const fileName = "logo.jpeg";

// getTemporaryDownloadUrl(bucketName, fileName)
//   .then((url) => console.log("Temporary download URL:", url))
//   .catch((err) =>
//     console.error("Failed to generate temporary download URL:", err)
//   );

const B2 = require("backblaze-b2");

// Initialize B2 client
const b2 = new B2({
  applicationKeyId: "d77e3ae41db7",
  applicationKey: "003129a379958dc0fa2ce47911e9b404d9944962ed",
});

// Function to generate a temporary download URL
async function getTemporaryDownloadUrl(fileName) {
  try {
    // Authorize with B2
    await b2.authorize();

    // Get download authorization
    // const fileInfo = await b2.getFileInfo({
    //   bucketName,
    //   fileName,
    // });

    // Generate temporary download URL
    const downloadUrl = await b2.getDownloadAuthorization({
      bucketId: "ed67473e333a8e94910d0b17",
      fileId:
        "4_zed67473e333a8e94910d0b17_f105253257dca6d47_d20240706_m182449_c003_v0312009_t0016_u01720290289537",
      fileName,
    });

    return downloadUrl.data.downloadUrl;
  } catch (error) {
    console.error("Error generating temporary download URL:", error);
    throw error;
  }
}

// Example usage:
const fileName = "logo.jpeg";

getTemporaryDownloadUrl(fileName)
  .then((url) => console.log("Temporary download URL:", url))
  .catch((err) =>
    console.error("Failed to generate temporary download URL:", err)
  );
