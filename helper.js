module.exports = {
    checkPassword: function(correctPassword, inputPassword) {
    if(correctPassword.localeCompare(inputPassword) === 0 ){
      return 0;
    }
    else {
      return 1;
    }
  }
}