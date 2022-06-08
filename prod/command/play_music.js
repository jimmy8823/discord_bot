"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seequeue = exports.getVolume = exports.setVolume = exports.toggleQueueLoop = exports.toggleLoop = exports.removeLoop = exports.stop = exports.skip = exports.join = exports.playlist = exports.play = void 0;
const discord_js_1 = require("discord.js");
const index_1 = require("../index");
const discord_music_player_1 = require("discord-music-player");
exports.play = {
    name: "play",
    description: "play music :musical_note: ",
    run: (message) => __awaiter(void 0, void 0, void 0, function* () {
        const { author, channel, content, guild, member } = message;
        const args = message.content.trim();
        const url = args.substring(5, args.length);
        let queue = index_1.player.createQueue(message.guildId);
        yield queue.join(message.member.voice.channel);
        let song = yield queue.play(url).catch(_ => {
            if (!index_1.guildQueue)
                queue.stop();
        });
    })
};
exports.playlist = {
    name: "lp",
    description: "play list :musical_note:",
    run: (message) => __awaiter(void 0, void 0, void 0, function* () {
        const { author, channel, content, guild, member } = message;
        const args = message.content.trim();
        const url = args.substring(4, args.length);
        console.log(url);
        let queue = index_1.player.createQueue(message.guildId);
        yield queue.join(message.member.voice.channel);
        let song = yield queue.playlist(url).catch(_ => {
            if (!index_1.guildQueue)
                queue.stop();
        });
    })
};
exports.join = {
    name: "join",
    description: "join voice channel",
    run: (message) => __awaiter(void 0, void 0, void 0, function* () {
        const { author, channel, content, guild, member } = message;
        let queue = index_1.player.createQueue(message.guildId);
        yield queue.join(message.member.voice.channel);
    })
};
exports.skip = {
    name: "skip",
    description: "skip song :fast_forward: ",
    run: (message) => __awaiter(void 0, void 0, void 0, function* () {
        const prepare_msg = new discord_js_1.MessageEmbed();
        try {
            index_1.guildQueue.skip();
            prepare_msg.setTitle(index_1.guildQueue.nowPlaying + " skipped :fast_forward: ");
            yield message.channel.send({ embeds: [prepare_msg] });
        }
        catch (error) {
            prepare_msg.setTitle("Something go wrong!");
        }
    })
};
exports.stop = {
    name: "stop",
    description: "stop song :stop_button: ",
    run: (message) => __awaiter(void 0, void 0, void 0, function* () {
        const prepare_msg = new discord_js_1.MessageEmbed();
        try {
            index_1.guildQueue.stop();
            prepare_msg.setTitle("Music stop :stop_button: ");
        }
        catch (error) {
            prepare_msg.setTitle("Something go wrong!");
        }
        yield message.channel.send({ embeds: [prepare_msg] });
    })
};
exports.removeLoop = {
    name: "rl",
    description: "removeLoop",
    run: (message) => __awaiter(void 0, void 0, void 0, function* () {
        yield index_1.guildQueue.setRepeatMode(discord_music_player_1.RepeatMode.DISABLED);
        const prepare_msg = new discord_js_1.MessageEmbed();
        console.log(discord_music_player_1.RepeatMode);
        prepare_msg.setTitle("disable repeat!");
        yield message.channel.send({ embeds: [prepare_msg] });
    })
};
exports.toggleLoop = {
    name: "loop",
    description: "toggleLoop :repeat_one:",
    run: (message) => __awaiter(void 0, void 0, void 0, function* () {
        yield index_1.guildQueue.setRepeatMode(discord_music_player_1.RepeatMode.SONG);
        console.log(discord_music_player_1.RepeatMode);
        const prepare_msg = new discord_js_1.MessageEmbed();
        prepare_msg.setTitle("toggle repeat! :repeat_one: ");
        yield message.channel.send({ embeds: [prepare_msg] });
    })
};
exports.toggleQueueLoop = {
    name: "ql",
    description: "toggleLoopQueue :repeat: ",
    run: (message) => __awaiter(void 0, void 0, void 0, function* () {
        yield index_1.guildQueue.setRepeatMode(discord_music_player_1.RepeatMode.QUEUE);
        const prepare_msg = new discord_js_1.MessageEmbed();
        prepare_msg.setTitle("toggle repeat queue! :repeat: ");
        yield message.channel.send({ embeds: [prepare_msg] });
    })
};
exports.setVolume = {
    name: "sv",
    description: "setVolume :sound: ",
    run: (message) => __awaiter(void 0, void 0, void 0, function* () {
        const prepare_msg = new discord_js_1.MessageEmbed();
        let args = message.content.trim();
        let vol = args.substring(4, args.length);
        console.log(message.author.username + "set volume :" + vol);
        yield index_1.guildQueue.setVolume(parseInt(vol));
        prepare_msg.setTitle("already set volume :sound: " + index_1.guildQueue.volume);
        yield message.channel.send({ embeds: [prepare_msg] });
    })
};
exports.getVolume = {
    name: "volume",
    description: "current volume :sound: ",
    run: (message) => __awaiter(void 0, void 0, void 0, function* () {
        const prepare_msg = new discord_js_1.MessageEmbed();
        prepare_msg.setTitle("current volume :sound: " + index_1.guildQueue.volume);
        yield message.channel.send({ embeds: [prepare_msg] });
    })
};
exports.seequeue = {
    name: "queue",
    description: "see play list ",
    run: (message) => __awaiter(void 0, void 0, void 0, function* () {
        const prepare_msg = new discord_js_1.MessageEmbed();
        let queue = index_1.player.createQueue(message.guildId);
        try {
            prepare_msg.setTitle("Now playiing :" + queue.nowPlaying);
            prepare_msg.addField('\u200b', '\u200b');
            prepare_msg.setColor("PURPLE");
            let limit = 0;
            if (index_1.guildQueue.songs.length > 10) {
                limit = 10;
            }
            else {
                limit = index_1.guildQueue.songs.length;
            }
            for (let i = 1; i <= limit; i++) {
                let str = index_1.guildQueue.songs[i].name;
                let duration = index_1.guildQueue.songs[i].duration;
                prepare_msg.addField(str, duration);
            }
        }
        catch (TypeError) {
            prepare_msg.setTitle("The queue is empty !");
        }
        prepare_msg.setTimestamp();
        yield message.channel.send({ embeds: [prepare_msg] });
    })
};
