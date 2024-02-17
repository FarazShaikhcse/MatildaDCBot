const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("project is running!");
})

app.get("/", (req, res) => {
  res.send("Hello world!");
})

const Discord = require("discord.js");

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const fs = require("fs");

const prefix = "+"

client.commands = new Discord.Collection();

const commands = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"))

for (file of commands) {

  const commandName = file.split(".")[0]

  const command = require(`./Commands/${commandName}`)

  client.commands.set(commandName, command)

}



client.on("messageCreate", message => {
  if (message.author.id != "1059260042072838235") {
    if (message.content.startsWith(prefix)) {
      const args = message.content.slice(prefix.length).trim().split(/ +/g)
      const commandName = args.shift()

      const command = client.commands.get(commandName)

      if (!command) return

      command.run(client, message, args)

    } else {
      const str = message.content.toLowerCase();
      switch (str) {
        case "ping": message.channel.send("pong");
          break;
        case "ding": message.channel.send("dong");
          break;
        case "hi matilda":
          message.channel.send("hi " + message.author.username + ", how are you doing today?");
          break;
        case "how are you?": message.channel.send("i'm good, how about you?");
          break;
      }
    }
  }
})

client.login(process.env.token);