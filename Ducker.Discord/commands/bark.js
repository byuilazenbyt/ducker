
module.exports = {

  name: 'Bark',
  description: 'Not a duck, but a dog!',

  // Main command function
  async run(message, args){
    message.reply('Woof! Woof! I am a doggy!');
  }
}
