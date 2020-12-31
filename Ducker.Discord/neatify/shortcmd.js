module.exports = {
  Log(msg){
    console.log(`\n\x1b[36mMessage: \x1b[33m${msg}\n\x1b[36mOccured: \x1b[33m${Date()}\n\x1b[0m`);
  },
  Error(msg) {
    console.log(`\n\x1b[31mError: \x1b[33m${msg}\n\x1b[31mOccured: \x1b[33m${Date()}\n\x1b[0m`);
  }    
}