const crypto = require('crypto');
const fs = require('fs');
const key = 'PUTYOURKEYHERE';
const cipher = crypto.createCipher('aes192', key);
const decipher = crypto.createDecipher('aes192', key);
exports.encrypt = function (where, pass) {
  var encrypted = cipher.update(pass, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  var datset = {
    place: where,
    passwd: encrypted
  };
  var datfull = [];
  fs.readFile('/Users/angiebarrington-jeter/Desktop/Code/JS/SP/stor.json', 'utf8', function (err, data) {
    if (err) throw err;
    datfull = JSON.parse(data);
    datfull.push(datset);
    fs.writeFile('/Users/angiebarrington-jeter/Desktop/Code/JS/SP/stor.json', JSON.stringify(datfull), function (err) {
      if(err) throw err;
      console.log('Completed');
    });
  });
};

exports.decrypt = function (where) {
  var encryptedDat = '';
  fs.readFile('/Users/angiebarrington-jeter/Desktop/Code/JS/SP/stor.json', 'utf8', function (err, data) {
    if (err) throw err;
    var parsedDat = JSON.parse(data);
    for (i=0; i < parsedDat.length; i++) {
      if (parsedDat[i].place == where) {
        encryptedDat += parsedDat[i].passwd;
        break;
      }
    }
    var decrypted = decipher.update(encryptedDat, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    console.log('Your password is: ' + decrypted);
  });
};
