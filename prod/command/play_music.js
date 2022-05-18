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
exports.setVolume = exports.toggleQueueLoop = exports.toggleLoop = exports.removeLoop = exports.stop = exports.skip = exports.playlist = exports.play = void 0;
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
        /*
        const prepare_msg = new MessageEmbed();
            prepare_msg.setTitle("哈兔大聯盟 哈!");
            prepare_msg.setDescription(text);
            prepare_msg.setAuthor(
                author.username + "#" + author.discriminator,
                author.displayAvatarURL()
            );
            prepare_msg.setImage("https://i.imgur.com/9wCBpdg.jpeg");
            await channel.send({ embeds : [prepare_msg] });
            await message.delete();*/
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
        index_1.guildQueue.setRepeatMode(discord_music_player_1.RepeatMode.DISABLED);
    })
};
exports.toggleLoop = {
    name: "loop",
    description: "toggleLoop",
    run: (message) => __awaiter(void 0, void 0, void 0, function* () {
        index_1.guildQueue.setRepeatMode(discord_music_player_1.RepeatMode.SONG);
    })
};
exports.toggleQueueLoop = {
    name: "loopqueue",
    description: "toggleLoopQueue",
    run: (message) => __awaiter(void 0, void 0, void 0, function* () {
        index_1.guildQueue.setRepeatMode(discord_music_player_1.RepeatMode.QUEUE);
    })
};
exports.setVolume = {
    name: "setvolume",
    description: "setVolume",
    run: (message) => __awaiter(void 0, void 0, void 0, function* () {
        let args = message.content.trim();
        let vol = args.substring(9, args.length);
        index_1.guildQueue.setVolume(parseInt(vol));
        ;
    })
};
