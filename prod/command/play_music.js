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
exports.seequeue = exports.getVolume = exports.setVolume = exports.toggleQueueLoop = exports.toggleLoop = exports.removeLoop = exports.stop = exports.skip = exports.playlist = exports.play = void 0;
const discord_js_1 = require("discord.js");
const index_1 = require("../index");
const discord_music_player_1 = require("discord-music-player");
exports.play = {
    name: "play",
    description: "play music",
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
    name: "playlist",
    description: "play list",
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
exports.skip = {
    name: "skip",
    description: "skip song",
    run: (message) => __awaiter(void 0, void 0, void 0, function* () {
        index_1.guildQueue.skip();
    })
};
exports.stop = {
    name: "stop",
    description: "stop song",
    run: (message) => __awaiter(void 0, void 0, void 0, function* () {
        index_1.guildQueue.stop();
    })
};
exports.removeLoop = {
    name: "removeloop",
    description: "removeLoop",
    run: (message) => __awaiter(void 0, void 0, void 0, function* () {
        yield index_1.guildQueue.setRepeatMode(discord_music_player_1.RepeatMode.DISABLED);
        const prepare_msg = new discord_js_1.MessageEmbed();
        console.log(discord_music_player_1.RepeatMode);
        prepare_msg.setTitle("turn off repeat!");
        yield message.channel.send({ embeds: [prepare_msg] });
    })
};
exports.toggleLoop = {
    name: "loop",
    description: "toggleLoop",
    run: (message) => __awaiter(void 0, void 0, void 0, function* () {
        yield index_1.guildQueue.setRepeatMode(discord_music_player_1.RepeatMode.SONG);
        console.log(discord_music_player_1.RepeatMode);
        const prepare_msg = new discord_js_1.MessageEmbed();
        prepare_msg.setTitle("toggle repeat!");
        yield message.channel.send({ embeds: [prepare_msg] });
    })
};
exports.toggleQueueLoop = {
    name: "loopqueue",
    description: "toggleLoopQueue",
    run: (message) => __awaiter(void 0, void 0, void 0, function* () {
        yield index_1.guildQueue.setRepeatMode(discord_music_player_1.RepeatMode.QUEUE);
        const prepare_msg = new discord_js_1.MessageEmbed();
        prepare_msg.setTitle("toggle repeat queue!");
        yield message.channel.send({ embeds: [prepare_msg] });
    })
};
exports.setVolume = {
    name: "setvolume",
    description: "setVolume",
    run: (message) => __awaiter(void 0, void 0, void 0, function* () {
        const prepare_msg = new discord_js_1.MessageEmbed();
        let args = message.content.trim();
        let vol = args.substring(10, args.length);
        console.log(message.author.username + "set volume :" + vol);
        yield index_1.guildQueue.setVolume(parseInt(vol));
        prepare_msg.setTitle("already set volume :" + index_1.guildQueue.volume);
        yield message.channel.send({ embeds: [prepare_msg] });
    })
};
exports.getVolume = {
    name: "volume",
    description: "print volume",
    run: (message) => __awaiter(void 0, void 0, void 0, function* () {
        const prepare_msg = new discord_js_1.MessageEmbed();
        prepare_msg.setTitle("now volume :" + index_1.guildQueue.volume);
        yield message.channel.send({ embeds: [prepare_msg] });
    })
};
exports.seequeue = {
    name: "list",
    description: "see play list",
    run: (message) => __awaiter(void 0, void 0, void 0, function* () {
        const prepare_msg = new discord_js_1.MessageEmbed();
        let queue = index_1.player.createQueue(message.guildId);
        prepare_msg.setTitle("now playiing :" + queue.nowPlaying);
        for (let i = 0; i < index_1.guildQueue.songs.length; i++) {
            let str = index_1.guildQueue.songs[i].name;
            let duration = index_1.guildQueue.songs[i].duration;
            prepare_msg.addField(str, duration);
        }
        yield message.channel.send({ embeds: [prepare_msg] });
    })
};
