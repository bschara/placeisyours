const B2 = require("backblaze-b2");

const b2 = new B2({
  applicationKeyId: "003d77e3ae41db70000000004",
  applicationKey: "K003PCCnidbj0kCiy7JQeOBrSb+2rVc",
});

const bucketName = "placeisyours";

const generateShareableUrl = async (fileName) => {
  try {
    await b2.authorize();

    const bucketId = "ed67473e333a8e94910d0b17";

    const response = await b2.getDownloadAuthorization({
      bucketId: bucketId,
      fileNamePrefix: fileName,
      validDurationInSeconds: 3600,
    });
    // console.log("bucket name:   ", response.data);

    const downloadUrl = `${b2.downloadUrl}/file/placeisyours/${fileName}?Authorization=${response.data.authorizationToken}`;
    return downloadUrl;
  } catch (error) {
    console.error("Error generating shareable URL:", error);
  }
};

const uploadFileToB2 = async (fileStream, fileName) => {
  try {
    await b2.authorize();

    const bucketId = "ed67473e333a8e94910d0b17"; // Replace with your actual bucket ID

    const uploadUrlResponse = await b2.getUploadUrl({ bucketId });
    const uploadUrl = uploadUrlResponse.data.uploadUrl;
    const uploadAuthToken = uploadUrlResponse.data.authorizationToken;

    const uploadResponse = await b2.uploadFile({
      uploadUrl,
      uploadAuthToken,
      fileName,
      data: fileStream, // Use the file stream directly
      mime: "image/*",
    });

    console.log("File uploaded successfully:", uploadResponse.data);
    return uploadResponse.data.fileName;
  } catch (error) {
    console.error("Error uploading file:", error.message);
    throw error;
  }
};

module.exports = { generateShareableUrl, uploadFileToB2 };
