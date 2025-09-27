const ImageKit = require("imagekit");



const imagekit = new ImageKit({
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT
}) 

async function uploadFile(file, fileName) {
    try {
        const result = await imagekit.upload({
            file: file, // base64 string, URL, or Buffer
            fileName: fileName, // name to save the file as
        });
        return result; // uploaded file details
    } catch (error) {
        console.error("ImageKit upload error:", error);
        throw error; // propagate error to the calling function
    }
}


 module.exports = {
    uploadFile
 }