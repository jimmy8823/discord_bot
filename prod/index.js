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
exports.guildQueue = exports.player = void 0;
const discord_js_1 = require("discord.js");
const connectDatabase_1 = require("./database/connectDatabase");
const validateEnv_1 = require("./utils/validateEnv");
const onMessage_1 = require("./event/onMessage");
const discord_music_player_1 = require("discord-music-player");
const Bot = new discord_js_1.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"] });
exports.player = new discord_music_player_1.Player(Bot, {
    leaveOnEmpty: true, // This options are optional.
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validateEnv_1.validateEnv)())
        return; // 抓取不到env中的內容
    Bot.on("ready", () => console.log("Connected to Discord!"));
    Bot.on("messageCreate", (message) => __awaiter(void 0, void 0, void 0, function* () {
        exports.guildQueue = exports.player.getQueue(message.guildId);
        yield (0, onMessage_1.onMessage)(message);
    }));
    yield (0, connectDatabase_1.connectDatabase)();
    yield Bot.login(process.env.TOKEN);
}))();
