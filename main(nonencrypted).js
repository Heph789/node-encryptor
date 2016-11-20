//Loads the readline module in
const readline = require('readline');
const denc = require('./Dencrypt.js');

//Creats the readline interface for receiving and prompting information
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
//asks for the password
rl.question('What is the password? ', function checkPass(pass) {
  //if the password is correct
  if (pass == 'PUTYOURPASSWORDHERE') {
    //asks another question
    rl.question('Type "r" if you are retrieving password and "a" if you are adding password: ', function (rora) {
      main(rora.toUpperCase());
    });
  }
  //throws an error and kills the program if the password is wrong
  else {
    console.log('The password is wrong');
    rl.close();
  }
});
function main(proc) {
  //if they want to retrieve a password
  if (proc == 'R') {
    rl.question('What is your password for? ', function (where) {
      denc.decrypt(where);
      rl.close();
    });
  }
  //if they want to add a password
  else if (proc == 'A') {
    rl.question('What is your password for? ', function (where) {
      rl.question('What is your password? ', function (pass2) {
        denc.encrypt(where, pass2);
        rl.close();
      });
    });
  }
  else {
    console.log('Not valid');
    rl.close();
  }
}
