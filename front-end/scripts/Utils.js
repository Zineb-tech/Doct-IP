import CryptoJS from 'crypto-js';


const SECRET_KEY = 'bXVzdGJlMTZieXRlc2tleQ==';
var parsedBase64Key = CryptoJS.enc.Base64.parse(SECRET_KEY);

export const encrypt = (data) => {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
  };
  
export const decrypt = (msg) => {
    try{
    var decryptedData = CryptoJS.AES.decrypt( msg, parsedBase64Key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
      } );
      // this is the decrypted data as a string
      var decryptedText = decryptedData.toString( CryptoJS.enc.Utf8 );
      return decryptedText;
    }catch(error){
      window.location = '/'
    }
}