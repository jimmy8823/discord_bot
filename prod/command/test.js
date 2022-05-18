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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
const DBmodel_1 = __importDefault(require("../database/models/DBmodel"));
const discord_js_1 = require("discord.js");
exports.test = {
    name: "test",
    description: "test",
    run: (message) => __awaiter(void 0, void 0, void 0, function* () {
        const { author, channel, content } = message;
        let targetdata = yield DBmodel_1.default.findOne({ discordId: author.id });
        let text = "島民為甚麼不念台大!";
        if (!targetdata) {
            targetdata = yield DBmodel_1.default.create({
                discordId: author.id,
                count: 0
            });
            yield targetdata.save();
        }
        const prepare_msg = new discord_js_1.MessageEmbed();
        prepare_msg.setTitle("哈兔大聯盟 哈!");
        prepare_msg.setDescription(text);
        prepare_msg.setAuthor(author.username + "#" + author.discriminator, author.displayAvatarURL());
        prepare_msg.setImage("https://i.imgur.com/9wCBpdg.jpeg");
        yield channel.send({ embeds: [prepare_msg] });
        yield message.delete();
    })
};
