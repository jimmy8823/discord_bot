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
exports.hentai = exports.help = exports.test = void 0;
const DBmodel_1 = __importDefault(require("../database/models/DBmodel"));
const discord_js_1 = require("discord.js");
const _CommandList_1 = require("./_CommandList");
const axios_1 = __importDefault(require("axios"));
const index_1 = require("../index");
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
        prepare_msg.setdDescription(text);
        prepare_msg.setAuthor(author.username + "#" + author.discriminator, author.displayAvatarURL());
        prepare_msg.setImage("https://i.imgur.com/9wCBpdg.jpeg");
        yield channel.send({ embeds: [prepare_msg] });
    })
};
exports.help = {
    name: "help",
    description: "see command",
    run: (message) => __awaiter(void 0, void 0, void 0, function* () {
        const { author, channel, content } = message;
        const prepare_msg = new discord_js_1.MessageEmbed();
        prepare_msg.setTitle("Command list");
        prepare_msg.addField('\u200b', '\u200b');
        for (let i = 0; i < _CommandList_1.CommandList.length; i++) {
            prepare_msg.addField(_CommandList_1.CommandList[i].name, _CommandList_1.CommandList[i].description);
        }
        prepare_msg.setThumbnail("https://i.imgur.com/9wCBpdg.jpeg");
        prepare_msg.setTimestamp();
        yield channel.send({ embeds: [prepare_msg] });
    })
};
exports.hentai = {
    name: "hentai",
    description: "see hentai",
    run: (message) => __awaiter(void 0, void 0, void 0, function* () {
        yield get_hentai();
        const { author, channel, content } = message;
        const prepare_msg = new discord_js_1.MessageEmbed();
        //prepare_msg.setdDescription();
        let rnd = getRndInteger(0, index_1.image.length);
        console.log(index_1.image[rnd].score + "    " + index_1.image[rnd].tag);
        prepare_msg.setTitle(" [ Yande.re ]     Id  : " + index_1.image[rnd].id);
        prepare_msg.addField(" Score :", index_1.image[rnd].score.toString(), true);
        prepare_msg.addField('\u200b', '\u200b', true);
        prepare_msg.addField(" Tag :", index_1.image[rnd].tag.toString(), true);
        prepare_msg.setImage(index_1.image[rnd].url);
        prepare_msg.setURL(index_1.image[rnd].url);
        prepare_msg.setFooter(author.username + "#" + author.discriminator, author.displayAvatarURL());
        prepare_msg.setTimestamp();
        yield channel.send({ embeds: [prepare_msg] });
        globalThis.h_count += 1;
        console.log(globalThis.h_count);
    })
};
const get_hentai = () => __awaiter(void 0, void 0, void 0, function* () {
    if (index_1.image.length <= 0 || globalThis.h_count >= 20) {
        const response = yield axios_1.default.get('https://yande.re/post/popular_recent.json?api_version=2')
            .then((response) => {
            console.log("request to yande.re");
            let data = response.data;
            for (let i = 0; i < 40; i++) {
                const img = {
                    id: data[i].id,
                    url: data[i].jpeg_url,
                    score: data[i].score,
                    tag: data[i].tags,
                };
                index_1.image.push(img);
                globalThis.h_count = 0;
            }
        })
            .catch((error) => console.log(error));
    }
});
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
