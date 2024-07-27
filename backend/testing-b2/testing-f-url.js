// const B2 = require("backblaze-b2");

// const b2 = new B2({
//   applicationKeyId: "003d77e3ae41db70000000003",
//   applicationKey: "K0033kVlFFpsftXVFAgs7CCWWZnJGQM",
// });

// async function getFriendlyLink(fileName) {
//   try {
//     // Authorize B2
//     await b2.authorize();

//     // Create a download authorization
//     const bucketId = "ed67473e333a8e94910d0b17";
//     const validDurationInSeconds = 3600; // 1 hour
//     const filePath = `/${fileName}`; // file path in the bucket

//     const downloadAuthResponse = await b2.getDownloadAuthorization({
//       bucketId: bucketId,
//       fileNamePrefix: filePath,
//       validDurationInSeconds: validDurationInSeconds,
//     });

//     const authorizationToken = downloadAuthResponse.data.authorizationToken;

//     // Construct the friendly share link
//     const downloadUrl = await b2.downloadFileByName({
//       bucketName: "placeisyours",
//       fileName: fileName,
//       authorization: authorizationToken,
//     });

//     console.log("Friendly share link:", downloadUrl);
//   } catch (error) {
//     console.error("Error getting friendly link:", error);
//   }
// }

// // Replace 'your-file.txt' with the actual file name
// getFriendlyLink("download.jpg");
const B2 = require("backblaze-b2");

const b2 = new B2({
  applicationKeyId: "003d77e3ae41db70000000003",
  applicationKey: "K0033kVlFFpsftXVFAgs7CCWWZnJGQM",
});

async function getFriendlyLink(fileName) {
  try {
    // Authorize B2
    await b2.authorize();

    // Verify bucket details
    const bucketId = "ed67473e333a8e94910d0b17";
    const bucketName = "placeisyours";
    const validDurationInSeconds = 3600; // 1 hour
    const filePath = fileName; // file path in the bucket

    // Check if the bucket exists
    const buckets = await b2.listBuckets();
    const bucketExists = buckets.data.buckets.some(
      (bucket) =>
        bucket.bucketId === bucketId && bucket.bucketName === bucketName
    );

    if (!bucketExists) {
      throw new Error(
        `Bucket with name ${bucketName} and ID ${bucketId} does not exist.`
      );
    }

    // Create a download authorization
    const downloadAuthResponse = await b2.getDownloadAuthorization({
      bucketId: bucketId,
      fileNamePrefix: filePath,
      validDurationInSeconds: validDurationInSeconds,
    });

    const authorizationToken = downloadAuthResponse.data.authorizationToken;

    // Construct the friendly share link manually
    const downloadUrl = `https://f000.backblazeb2.com/file/${bucketName}/${fileName}?Authorization=${authorizationToken}`;

    console.log("Friendly share link:", downloadUrl);
  } catch (error) {
    console.error("Error getting friendly link:", error);
  }
}

// Replace 'your-file.txt' with the actual file name
getFriendlyLink("download.jpg");
