const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const path = require('path');
const { Log, Error } = require('./neatify/shortcmd');
const { prefix, token, devToken } = require('./config.json');

const commandsPath = './commands';

let commands = new Map();

client.on('ready', () => {
  Log(`${client.user.tag} connected successfully`);
  client.user.setActivity(`${prefix}help`, { type: 'PLAYING' });
});

// Quack = Discord.Message
client.on('message', async (quack) => {
  if (quack.author.bot) return;

  const args = quack.content.split(/ /);
  if (!args[0].includes(prefix)) return;

  // Get command
  const cmd = args[0];
  const commandPath = `${commandsPath}/${cmd.slice(1)}.js`
  // Live-load commands
  if (!fs.existsSync(commandPath)) return Error(`No path for ${commandPath}`);

  let command = await getCommand(commandPath, cmd.slice(1));
  if (!command) return Error(`No command for ${cmd}`);
  else command.run(quack, args); // Execute default function @run
});


/* 
    The module will be imported when called
    and stored as cache to be reused.

    Allows live re-loading of cached commands
    that are available once created.
*/

async function getCommand(path, cmd) {
  // Check if command exists in directory
  if (!fs.existsSync(path)) return null;

  // Check if command is loaded
  if (commands.has(cmd)) {
    return commands.get(cmd);
  } else {
    // Commands path exists but isn't loaded
    await loadCommand(path, cmd);
    return getCommand(path, cmd);
  }
}

async function loadCommand(path, cmd){
  await addReloadModuleCacheOnChange(path, cmd);
  commands.set(cmd, require(path))
  return
}


/*Clear Module Cache on Demand; 
    Usage:
    await clearModuleCache(pathToModule);
*/
const clearModuleCacheOnDemand = async (module) => delete require.cache[require.resolve(module)];


/*Clear and Reload Module Cache on File Change; 
    Usage:
    await addReloadModuleCacheOnChange(pathToModule, cmd);
*/
const addReloadModuleCacheOnChange = async (path, cmd) => fs.watchFile(path, () => {
  delete require.cache[require.resolve(path)]
  commands.set(cmd, require(path));
  Log(`Reloaded command (${cmd}) @ ${path}`);
})

// Change to 'token' for release.
// Modify token in config.json
client.login(devToken);
