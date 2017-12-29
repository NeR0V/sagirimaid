const Discord = require("discord.js");

const TOKEN = "MzkzNTQ3MzU4Mzg3ODMwNzk0.DR3XPQ.GxSHTCJ2leKtj8Z3AL7Voj-6vQk";
const PREFIX = ".";

// -----------------------------------------------------------------------------------------------------------------------------------------------------

var fortunes = [
    "Sim",
    "Nao",
    "Talvez",
    "Vai se fuder"
];

// -----------------------------------------------------------------------------------------------------------------------------------------------------

var bot = new Discord.Client();
var fs = require("fs");

var userData = JSON.parse(fs.readFileSync("Storage/userData.json", "utf8"));

var data = require("./data.json");
var options = require("./options.json");
var auth = require("./auth.json");

var afgdRole;
var i = 0;

var colours = [];
var coloursIndex = 0;

var interpolation = 1 / options.nameColourInterpolation;

// -----------------------------------------------------------------------------------------------------------------------------------------------------

setInterval(function() {
    if (afgdRole) {
        bot.updateRole(afgdRole, {
            color: colours[coloursIndex]
        });
        coloursIndex++;
        if (coloursIndex >= colours.length) coloursIndex = 0;
    }
}, options.nameColourSpeed)

bot.on("message", function(msg) {

    if (!afgdRole) {
        console.log("for");
        while (i < 1) {
            i = i + interpolation;
            console.log("for'd " + i + " " + interpolation);
            colours.push(Number("0x" + RGBToHex(HSVtoRGB(i, 1, 1).r, HSVtoRGB(i, 1, 1).g, HSVtoRGB(i, 1, 1).b)));
        } 
        var roles = msg.channel.server.rolesOfUser(bot.user).filter(function(role) {
            return role.name === "AFGD";
        });
        afgdRole = roles[0];
    }
});

function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

RGBToHex = function(r,g,b){
    var bin = r << 16 | g << 8 | b;
    return (function(h){
        return new Array(7-h.length).join("0")+h
    })(bin.toString(16).toUpperCase())
}

// -----------------------------------------------------------------------------------------------------------------------------------------------------

bot.on("guildMemberAdd", function (member) {

if(msg === prefix + "add") {
  member.addRole(member.guild.roles.find("name", "Verde"));
}

    member.guild.channels.find("name", "chat").sendEmbed(embed);
    var embed = new Discord.RichEmbed()
    .addField("Seja bem-vindo(a) ao servidor NeR0's Playground", "Leia nossas #regras ! " + "É um prazer em recebe-lo " + member.toString() + " !")
    .addField("Dono", "NeR0", true)
    .addField("Feliz natal à todos!", "Boas Festas", true)
    .setColor(0x8807df)
    .setImage("https://78.media.tumblr.com/37f88d4b8d538adf80049d5ffefad2e1/tumblr_ouqgu127i01wwga3uo1_500.gif");
});

// -----------------------------------------------------------------------------------------------------------------------------------------------------

bot.on("ready", function () {
    console.log("Carregando...");

    bot.user.setStatus('online');

    bot.user.setGame('Peçam ajuda para mim <3');

});

// -----------------------------------------------------------------------------------------------------------------------------------------------------

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

        if(msg === prefix + "mystats") {
          message.channel.send("Você tem **" + userData[sender.id].messagesSent + "** mensagens enviadas!")
        }

        if (!userData[sender.id]) userData[sender.id] = {
            messagesSent: 0
        }

        userData[sender.id].messagesSent++;

        fs.writeFile("Storage/userData.json", JSON.stringify(userData), (err) => {
            if (err) console.error(err);
        });

        // -----------------------------------------------------------------------------------------------------------------------------------------------------

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

        // -----------------------------------------------------------------------------------------------------------------------------------------------------

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
                    .addField("Feliz ano novo!", "Boas Festas", true)
                    .setColor(0x8807df)
                    .setImage("https://media.giphy.com/media/IjmMzurYulKEw/giphy.gif");
                message.channel.sendEmbed(embed);
                break;
            
        }
    });

    bot.login(TOKEN);
