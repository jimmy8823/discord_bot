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
exports.image = exports.guildQueue = exports.player = void 0;
const discord_js_1 = require("discord.js");
const connectDatabase_1 = require("./database/connectDatabase");
const validateEnv_1 = require("./utils/validateEnv");
const onMessage_1 = require("./event/onMessage");
const discord_music_player_1 = require("discord-music-player");
const onReactionChange_1 = require("./event/onReactionChange");
const Bot = new discord_js_1.Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS"],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
exports.player = new discord_music_player_1.Player(Bot, {
    leaveOnEmpty: true,
    leaveOnStop: false,
});
exports.image = [];
(() => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validateEnv_1.validateEnv)())
        return; // 抓取不到env中的內容
    Bot.on("ready", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Connected to Discord!");
    }));
    Bot.on("messageCreate", (message) => __awaiter(void 0, void 0, void 0, function* () {
        exports.guildQueue = exports.player.getQueue(message.guildId);
        yield (0, onMessage_1.onMessage)(message);
    }));
    Bot.on("messageReactionAdd", (reaction, user) => __awaiter(void 0, void 0, void 0, function* () {
        // When a reaction is received, check if the structure is partial
        if (reaction.partial) {
            // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
            try {
                yield reaction.fetch();
            }
            catch (error) {
                console.error('Something went wrong when fetching the message:', error);
                // Return as `reaction.message.author` may be undefined/null
                return;
            }
        }
        (0, onReactionChange_1.onReactionChange)(reaction, user, true);
        // Now the message has been cached and is fully available
        console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
        // The reaction is now also fully available and the properties will be reflected accurately:
        console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
    }));
    Bot.on("messageReactionRemove", (reaction, user) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        // When a reaction is received, check if the structure is partial
        if (reaction.partial) {
            // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
            try {
                yield reaction.fetch();
            }
            catch (error) {
                console.error('Something went wrong when fetching the message:', error);
                // Return as `reaction.message.author` may be undefined/null
                return;
            }
            //onReactionChange(reaction,user,false);
        }
        (0, onReactionChange_1.onReactionChange)(reaction, user, false);
        // Now the message has been cached and is fully available
        console.log(`${(_a = reaction.message.author) === null || _a === void 0 ? void 0 : _a.id}'s message "${reaction.emoji.name}" gained a reaction!`);
        // The reaction is now also fully available and the properties will be reflected accurately:
        console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
    }));
    yield (0, connectDatabase_1.connectDatabase)();
    yield Bot.login(process.env.TOKEN);
    globalThis.queue_index = [":zero:", ":one:", ":two:", ":three:", ":four:", ":five:", ":six:", ":seven:", ":eight:", ":nine:", ":keycap_ten:"];
}))();
