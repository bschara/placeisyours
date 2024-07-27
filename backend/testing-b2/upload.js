const B2 = require("backblaze-b2");
const fs = require("fs");
const path = require("path");

const b2 = new B2({
  applicationKeyId: "003d77e3ae41db70000000004",
  applicationKey: "K003PCCnidbj0kCiy7JQeOBrSb+2rVc",
});
const bucketName = "placeisyours";

// Replace with the path to the file you want to upload
const filePath = path.resolve(__dirname, "./zabre.txt");

// Function to upload a file to B2
const uploadFileToB2 = async () => {
  // Initialize the B2 client

  try {
    // Authorize the B2 client
    await b2.authorize();

    // Get the list of buckets
    const bucketsResponse = await b2.listBuckets();
    const bucket = bucketsResponse.data.buckets.find(
      (b) => b.bucketName === bucketName
    );

    if (!bucket) {
      throw new Error(`Bucket with name "${bucketName}" not found.`);
    }

    const bucketId = bucket.bucketId;

    // Get the upload URL and authorization token
    const uploadUrlResponse = await b2.getUploadUrl({ bucketId });
    const uploadUrl = uploadUrlResponse.data.uploadUrl;
    const uploadAuthToken = uploadUrlResponse.data.authorizationToken;

    // Read the file
    const fileBuffer = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);

    // Upload the file
    const uploadResponse = await b2.uploadFile({
      uploadUrl,
      uploadAuthToken,
      fileName,
      data: fileBuffer,
      mime: "text/plain", // Adjust the MIME type as needed
    });

    console.log("File uploaded successfully:", uploadResponse.data);
  } catch (error) {
    console.error("Error uploading file:", error.message);
  }
};

// Call the upload function
uploadFileToB2();
