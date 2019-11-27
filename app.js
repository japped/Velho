const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
const queue = new Map();
const ytdl = require('ytdl-core');
const GoogleImages = require("google-images");
const { Client, Attachment } = require("discord.js");
const client = new Client;
const googleImages = new GoogleImages("ID", "API");

const exampleEmbed = {
	color: 0xE69138,
	title: 'Velhonluolan Säännöt :pushpin: ',
	author: {
		name: 'Velho',
		icon_url: 'https://i.imgur.com/921tynP.png',
		url: 'https://google.fi',
	},
	description: 'Näitä sääntöjä tulee noudattaa aina tai joudut nopeasti perikatoon (banaanisaarille, bänneille) :banana:',
	fields: [
		{
			name: ':one: **Kunnioita kaikkia!**',
			value: 'Kunnioitathan sekä Kehittäjiä sekä muita yhteisön faneja sekä seuraajia.',
		},
    {
			name: ':two: **Älä spämmi, turhat viestit pois myös!**',
			value: 'Kukaan ei jaksa jankkaavia ihmisiä eikä myöskään turhista viesteistä joilla ei ole päämäärää. Mieti siis ennenkuin kirjoitat.',
		},
    {
			name: ':three: **Bugi?? Ei hätää sinua autetaan!**',
			value: 'Bugien vuoksi olemme myös täällä Discord serverillä auttamassa, katsoppa siis #apua kanava ja sen sisältö. Käythän kuitenkin tsekkaamassa ensin #ilmoitukset ettei botti ole esimerkiksi tietystä syystä pois päältä.',
		},
    {
			name: ':four: **Älä laita yksityisviestejä Kehittäjille!**',
			value: 'Et tule saamaan yhtään sen nopeampaa (tai lainkaan) apua kuin saisit sitä yhteisöltä tai kehittäjältä #apua kanavalla. Käytä siis kyseistä kanavaa.',
		},
	],
	footer: {
		text: 'Velholuolan Viralliset Säännöt',
		icon_url: 'https://i.imgur.com/921tynP.png',
	},
};

bot.on('message', message => {


      // Muuttujalistaa:
      let msg = message.content.toUpperCase(); // Casesensitive VEKS!
      let sender = message.author; // Komennon käyttäjä
      let cont = message.content.slice(config.prefix.length).split(" "); // Leikkaa config.prefix pois komennosta
      let args = cont.slice(1); // Leikkaa pois commennon, jättäen argumentit



      if (msg === config.prefix + 'PING') { //Komento

        message.channel.send('PimpeliPOM!'); //vastaus komentoon
      }

      if (msg.startsWith(config.prefix + 'MASSAPOISTO')) {

        async function purge() {
          message.delete(); // Poistaa komennon

          if (!message.member.hasPermission('MANAGE_MESSAGES')) { // Jos käyttäjällä on MANAGE_MESSAGES permission.
            message.channel.send(':x: :dizzy: **Sinulla ei riitä taikavoimat tähän.**')
            return;
          }

          if (isNaN(args[0])) {
            message.channel.send('Numeroita kaipailen, paljonko poistetaan? \n Käyttö: ' + config.prefix + 'massapoisto <määrä>');
            return;
          }

          const fetched = await message.channel.fetchMessages({limit: args[0]});
          console.log(fetched.size + ' viestiä löydetty, poistetaan...');


          // Viestien poisto
          message.channel.bulkDelete(fetched)
              .catch(error => message.channel.send(`Error: ${error}`));
          message.reply(' **Tsimsalapim, työni tehty on!** :dizzy:');

        }

        purge();

      }

      if (msg === config.prefix + 'KUTSU') {

        message.delete();
        message.reply('**Hellanlettas olet ehaaana...!** :heart: \n Velhon discord serveri: https://discord.gg/4qEaQNm \n Botin kutsulinkki: https://discordapp.com/api/oauth2/authorize?client_id=648543696794419200&permissions=8&scope=bot')
      }

      if (msg === config.prefix + 'PATREON') {
        message.delete();
        message.reply(' <:patreon:648611456304152576> **Oih! Patreoniin pääset käsiksi täältä:** https://www.patreon.com/velho')
      }

      if (msg === config.prefix + 'MAINOSVIESTIMAINOS') {
        message.delete();
        message.channel.send('**Tervetuloa Velhon luolaan!** <:velhobot:648611262472912907> \n*Jos tämä ei ole Velhonluola serveri, pääset mukaan täältä:* https://discord.gg/4qEaQNm \n\nMinut on aivopesty auttamaan Discord servereitä eri taikakeinoin ja tulen myös auttamaan tulevaisuudessa uusilla taikavoimilla kun niitä opin ajankanssa. Ylhäältä löytyvän linkin kautta pääset Discord serverilleni jossa autamme sinua ongelmissa botin (lue: minun) kanssa! \n <:velhobot:648611262472912907> **Kutsulinkkini:** <tulossa> \n <:patreon:648611456304152576> **Patreon:** https://www.patreon.com/velho');

      }

      if (msg === config.prefix + 'VELHOSÄÄNNÖT') {
        message.delete();
        message.channel.send({ embed: exampleEmbed });
      }
			if (msg === prefix + 'TISUT') {
				async function onMessage(message) {
				try {
					const results = await googleImages.search("Boobs");
    			const reply = !results.length ?
      		"No results" :
      		new Attachment(results[Math.floor(Math.random() * results.length)].url);
    			message.channel.send(reply);
				}
				catch (e) {
    		console.error(e);
    			message.channel.send("Error happened, see the console");
  }
}
			}
      if (msg.startsWith(config.prefix + 'POTKI')) {
        message.delete();
        const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member.kick('Potkittiin servulta komennolla.').then(() => {
          // We let the message author know we were able to kick the person
          message.reply(`${user.tag} Sai todella kovan potkun persuksilleeen! :boot: :joy:`);
        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to kick the member,
          // either due to missing permissions or role hierarchy
          message.reply('**HUH??!**, jostain syystä potkaisin itseäni...');
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        message.reply(`:x: Henkilö ${user.tag} ei ole servulla!!`);
      }
    // Otherwise, if no user was mentioned
    } else {
      message.reply('Täh? Kenet minun pitäisi potkia?? :tired_face: ');
      return;
    }
  }

	const serverQueue = queue.get(message.guild.id);
	if (msg.startsWith(config.prefix + 'PLAY')) {
		message.delete();
		execute(message, serverQueue);
		return;
	}
	if (msg.startsWith(config.prefix + 'SKIP')) {
		message.delete();
		skip(message, serverQueue);
		return;
	}
	if (msg.startsWith(config.prefix + 'STOP')) {
		message.delete();
	}
	if (msg.startsWith(config.prefix + 'POTKI')) {
		message.delete();
	}

});

async function execute(message, serverQueue) {
	const args = message.content.split(' ');

	const voiceChannel = message.member.voiceChannel;
	if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');
	const permissions = voiceChannel.permissionsFor(message.client.user);
	if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
		return message.channel.send('I need the permissions to join and speak in your voice channel!');
	}

	const songInfo = await ytdl.getInfo(args[1]);
	const song = {
		title: songInfo.title,
		url: songInfo.video_url,
	};

	if (!serverQueue) {
		const queueContruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true,
		};

		queue.set(message.guild.id, queueContruct);

		queueContruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueContruct.connection = connection;
			play(message.guild, queueContruct.songs[0]);
		} catch (err) {
			console.log(err);
			queue.delete(message.guild.id);
			return message.channel.send(err);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		return message.channel.send(`${song.title} has been added to the queue!`);
	}

}
se
function skip(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
	if (!serverQueue) return message.channel.send('There is no song that I could skip!');
	serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', () => {
			console.log('Music ended!');
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => {
			console.error(error);
		});
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}
});

bot.on('ready', () => {

  console.log('Bot started.')


  bot.user.setActivity('with mushrooms 🍄');


});


bot.login(config.token);
