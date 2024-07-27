const B2 = require("backblaze-b2");

const b2 = new B2({
  applicationKeyId: "003d77e3ae41db70000000004",
  applicationKey: "K003PCCnidbj0kCiy7JQeOBrSb+2rVc",
});

const generateShareableUrl = async (fileName) => {
  try {
    await b2.authorize();

    const bucketId = "ed67473e333a8e94910d0b17";

    const response = await b2.getDownloadAuthorization({
      bucketId: bucketId,
      fileNamePrefix: fileName,
      validDurationInSeconds: 3600,
    });
    console.log("bucket name:   ", response.data);

    const downloadUrl = `${b2.downloadUrl}/file/placeisyours/${fileName}?Authorization=${response.data.authorizationToken}`;

    console.log("Shareable URL:", downloadUrl);
  } catch (error) {
    console.error("Error generating shareable URL:", error);
  }
};

generateShareableUrl("download.jpg");
