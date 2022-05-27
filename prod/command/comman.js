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
const discord_js_1 = require("discord.js");
const _CommandList_1 = require("./_CommandList");
const axios_1 = __importDefault(require("axios"));
const index_1 = require("../index");
exports.test = {
    name: "test",
    description: "test",
    run: (message) => __awaiter(void 0, void 0, void 0, function* () {
        const { author, channel, content } = message;
        //let targetdata = await DBmodel.findOne({ discordId: author.id });
        let text = "島民為甚麼不念台大!";
        /*if(!targetdata){
            targetdata = await DBmodel.create({
                discordId: author.id,
                count: 0
            });
            await targetdata.save();
        }*/
        const prepare_msg = new discord_js_1.MessageEmbed();
        prepare_msg.setTitle("哈兔大聯盟 哈!");
        prepare_msg.setDescription(text);
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
            prepare_msg.addField("+`" + _CommandList_1.CommandList[i].name + "`", _CommandList_1.CommandList[i].description);
        }
        prepare_msg.setThumbnail("https://i.imgur.com/9wCBpdg.jpeg");
        prepare_msg.setTimestamp();
        yield channel.send({ embeds: [prepare_msg] });
    })
};
exports.hentai = {
    name: "hentai",
    description: ":underage: usage: +hentai or +hentai tag # if want to use multi tag use +, english only",
    run: (message) => __awaiter(void 0, void 0, void 0, function* () {
        const prepare_msg = new discord_js_1.MessageEmbed();
        if (message.content.length > 7) {
            let query = message.content.substring(8);
            console.log(query);
            get_hentai_bytag(query, message);
        }
        else {
            yield get_hentai();
            const { author, channel, content } = message;
            //prepare_msg.setdDescription();
            let rnd = yield globalThis.rnd_number.pop();
            let detail_url = "https://yande.re/post/show/" + index_1.image[rnd].id;
            console.log(index_1.image[rnd].score + "    " + index_1.image[rnd].tag);
            prepare_msg.setTitle("yande.re " + index_1.image[rnd].id + ".jpg");
            //prepare_msg.setTitle(" [ Yande.re ]     :regional_indicator_i: :regional_indicator_d:   : " + image[rnd!].id);
            //prepare_msg.setURL(detail_url);
            prepare_msg.setDescription(detail_url);
            prepare_msg.setURL(index_1.image[rnd].url);
            prepare_msg.addField(" Score :", index_1.image[rnd].score.toString(), true);
            prepare_msg.addField('\u200b', '\u200b', true);
            prepare_msg.addField(" Tag :", index_1.image[rnd].tag.toString(), true);
            prepare_msg.setImage(index_1.image[rnd].url);
            prepare_msg.setFooter(author.username + "#" + author.discriminator, author.displayAvatarURL());
            prepare_msg.setTimestamp();
            const send_msg = yield channel.send({ embeds: [prepare_msg] });
            send_msg.react('♻️');
            console.log(globalThis.rnd_number.length + "  " + index_1.image.length);
            message.delete().catch((error) => {
                console.log(error);
            });
        }
    })
};
const get_hentai = () => __awaiter(void 0, void 0, void 0, function* () {
    if (index_1.image.length <= 0 || globalThis.rnd_number.length <= 0) {
        yield clear_list();
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
            }
            globalThis.rnd_number = [];
            for (let j = 0; j < 8; j++) { //get 5 different random number
                let rnd = getRndInteger(0, index_1.image.length);
                //console.log(rnd);
                if (globalThis.rnd_number.indexOf(rnd) == -1 || globalThis.rnd_number === undefined) {
                    //console.log("add" + rnd +"to list");
                    globalThis.rnd_number.push(rnd);
                }
                else {
                    j--;
                }
            }
        })
            .catch((error) => console.log(error));
    }
});
const get_hentai_bytag = (query, message) => __awaiter(void 0, void 0, void 0, function* () {
    const prepare_msg = new discord_js_1.MessageEmbed();
    const response = yield axios_1.default.get('https://yande.re/post.json?tags=' + query + '&limit=40&api_version=2')
        .then((response) => {
        console.log(response.status);
        let data = response.data; // response json file contain id,url,score,tag etc... 
        if (data.posts.length <= 0) {
            prepare_msg.setTitle(" not found from this tag !");
        }
        else {
            let rnd = getRndInteger(0, data.posts.length); // get rnd number to get pic
            let detail_url = "https://yande.re/post/show/" + data.posts[rnd].id;
            console.log(data.posts[rnd].score + "    " + data.posts[rnd].tags);
            prepare_msg.setTitle(" [ Yande.re ]     :regional_indicator_i: :regional_indicator_d:   : " + data.posts[rnd].id);
            prepare_msg.addField(" Score :", data.posts[rnd].score.toString(), true);
            prepare_msg.addField('\u200b', '\u200b', true);
            prepare_msg.addField(" Tag :", data.posts[rnd].tags.toString(), true);
            prepare_msg.setImage(data.posts[rnd].jpeg_url);
            prepare_msg.setURL(detail_url);
            prepare_msg.setFooter(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL());
            prepare_msg.setTimestamp();
        }
    })
        .catch((error) => {
        console.log(error);
        prepare_msg.setTitle(" error happened when request to yande.re!");
    });
    const send_msg = yield message.channel.send({ embeds: [prepare_msg] });
    send_msg.react('♻️');
    message.delete().catch((error) => {
        console.log(error);
    });
});
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const clear_list = () => { while (index_1.image.length > 0) {
    index_1.image.pop();
} };
