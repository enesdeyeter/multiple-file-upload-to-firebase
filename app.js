var admin = require("firebase-admin");
const uuid = require('uuid-v4');
const path = require('path');
const fs = require('fs');

var serviceAccount = require("./<YOUR-FIREBASE-SERVICES-ACCOUNT-JSON-FILE.json>");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "<YOUR-FIREBASE-BUCKET-NAME>.appspot.com"
});

var bucket = admin.storage().bucket();

let i = 0;

const directoryPath = path.join(__dirname, 'pp');

fs.readdir(directoryPath, function (err, files) {
  files.forEach(function (file) {
      //console.log(file); 

      setTimeout(function(){
        uploadFile("./pp/" + file);
      }, i*3000); //3000->3 second
      i++;
  });
});


async function uploadFile(filename) {

  const metadata = {
    metadata: {
      firebaseStorageDownloadTokens: uuid()
    },
    contentType: 'image/png',
    cacheControl: 'public, max-age=31536000',
  };

  await bucket.upload(filename, {
    gzip: true,
    metadata: metadata,
  });

console.log(`${filename} upload ok -> ` + new Date());
}

uploadFile().catch(console.error);