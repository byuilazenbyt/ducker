
module.exports = {

  name: 'Quack',
  description: 'Your duck is here for you',

  // Main command function
  async run(message, args){
    message.reply('Quack! Quack!!');
  }
}
