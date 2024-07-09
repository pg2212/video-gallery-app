const CryptoJS = require("crypto-js");
// object encryption
exports.encrypt = (Obj) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(Obj),
    process.env.REACT_APP_SECRET
  ).toString();
};
// decrypt cipher text
exports.decrypt = (cipherText) => {
  return JSON.parse(
    CryptoJS.AES.decrypt(cipherText, process.env.REACT_APP_SECRET).toString(
      CryptoJS.enc.Utf8
    )
  );
};