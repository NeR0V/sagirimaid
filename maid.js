const Discord = require("discord.js");

const TOKEN = "MzkzNTQ3MzU4Mzg3ODMwNzk0.DR3XPQ.GxSHTCJ2leKtj8Z3AL7Voj-6vQk";
const PREFIX = ".";

var fortunes = [
    "Sim",
    "Nao",
    "Talvez",
    "Vai se fuder"
];

var bot = new Discord.Client();
var fs = require("fs");

var userData = JSON.parse(fs.readFileSync("Storage/userData.json", "utf8"));

function loadCmds () {

    delete require.cache[require.resolve("./commands/${f}")];

bot.on("guildMemberAdd", function (member) {
    member.guild.channels.find("name", "chat").sendEmbed(embed);
    var embed = new Discord.RichEmbed()
    .addField("Seja bem-vindo(a) ao servidor NeR0's Playground", "Leia nossas #regras ! " + "É um prazer em recebe-lo " + member.toString() + " !")
    .addField("Dono", "NeR0", true)
    .addField("Feliz natal à todos!", "Boas Festas", true)
    .setColor(0x8807df)
    .setImage("https://78.media.tumblr.com/37f88d4b8d538adf80049d5ffefad2e1/tumblr_ouqgu127i01wwga3uo1_500.gif");
});

}

loadCmds();

bot.on("ready", function () {
    console.log("Carregando...");

    bot.user.setStatus('online');

    bot.user.setGame('Peçam ajuda para mim <3');

});

    bot.on("message", function (message) {
        if (message.author.equals(bot.user)) return;

        var msg = message.content;
        var sender = message.author;
        var prefix = "."

        if (sender.id === "393547358387830794") {
            return;
        }

        if (msg.includes("buceta")) {
            message.delete();
            message.author.send("Essa palavra é banido deste servidor, não use ela!")
        }

        if (msg === prefix + "reload") {
            message.channel.send({embed:{description:"Todos os comandos foram recarregados!"}})
            message.channel.send("Todos os comandos foram recarregados!")
            loadCmds()
        }

        if(msg === prefix + "msgenviada") {
          message.channel.send("Você tem **" + userData[sender.id].messagesSent + "** mensagens enviadas!")
        }

        if (!userData[sender.id]) userData[sender.id] = {
            messagesSent: 0
        }

        userData[sender.id].messagesSent++;

        fs.writeFile("Storage/userData.json", JSON.stringify(userData), (err) => {
            if (err) console.error(err);
        });

        if (message.content === "eae") {
            message.channel.sendMessage("suave?");
        }

        if (message.content === "tudo bom?") {
            message.channel.sendMessage("tudo. e vc? " + message.author.toString());
        }

        if (message.content === "元気だったかいさぎり？") {
            message.channel.sendMessage("私わお兄ちゃんと一緒ならいつだって元気だよ。(o^▽^o)");
        }

        if (message.content === "Você é minha irmã?") {
            message.channel.sendMessage("É claro! " + message.author.toString() + " você é o meu お兄ちゃん！");
        }

        if (!message.content.startsWith(PREFIX)) return;

        var args = message.content.substring(PREFIX.length).split(" ");

        switch (args[0].toLowerCase()) {
            case "mal":
                var mel = new Discord.RichEmbed()
                    .setTitle("MyAnimeList.net")
                    .setAuthor("NeR0", "https://i.imgur.com/qXbSFYY.png")
                    .setColor(0x8807df)
                    .setDescription("Entrem na lista de animes do NeR0")
                    .setThumbnail("https://i.imgur.com/vEy5Zaq.png")
                    .setURL("https://myanimelist.net/animelist/NeR0Viado");
                message.channel.sendEmbed(mel);
                break;

            case "info":
                message.channel.sendMessage("Eu sou uma bot super かわいい criada pelo meu mestre NeR0!");
                break;

            case "dado":
                if (args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
                else message.channel.sendMessage("Não Entendi.");
                break;

            case "menota":
                message.channel.sendMessage(message.author.toString() + " Infelizmente não. Voce não é bonito.");
                break;

            case "bemvindo":
                var embed = new Discord.RichEmbed()
                    .addField("Seja bem-vindo(a) ao servidor NeR0's Playground", "Leia nossas #regras ! " + "É um prazer em recebe-lo " + message.author.toString() + " !")
                    .addField("Dono", "NeR0", true)
                    .addField("Feliz natal à todos!", "Boas Festas", true)
                    .setColor(0x8807df)
                    .setImage("https://78.media.tumblr.com/37f88d4b8d538adf80049d5ffefad2e1/tumblr_ouqgu127i01wwga3uo1_500.gif");
                message.channel.sendEmbed(embed);
                break;

const command = args.shift().toLowerCase();

                if(command === prefix + "ping") {
                  const m = await message.channel.send("Ping?");
    m.edit("Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. Seu ping é de ${Math.round(client.ping)} ms!");
  }

        }
    });

    bot.login(TOKEN);
