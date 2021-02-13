const imagesUtilities = require('../utilities/images');
const QRCode = require('easyqrcodejs-nodejs');

exports.generateQRByUrl = async (url) => {
  return new Promise((resolve) => {
    try {
      // Options
      const options = {
        text: url
      };
      // New instance with options
      const qrcode = new QRCode(options);
      const dataQR = await qrcode.toDataURL()

      return resolve({
        dataQR
      })
    } catch (error) {
      return resolve({ error });
    }
  })
}