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
exports.onMessage = void 0;
const _CommandList_1 = require("../command/_CommandList");
const prefix = "+";
const onMessage = (client, message) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.channel.id === "765415955890700328" || message.channel.id === "855001141670182922") { //retweet
        if (message.content.startsWith("http")) { // if it post a url 
            client.channels.cache.get('983753978141626458').send(message.content);
        }
        else {
            try { // if it post a image
                const attach = message.attachments;
                let attach_url = attach.map(a => a.url);
                console.log(attach_url);
                if (attach_url != undefined)
                    client.channels.cache.get('983753978141626458').send(attach_url[0]);
            }
            catch (_a) {
                return;
            }
        }
    }
    if (message.author.bot) { //flitter bot content
        return;
    }
    for (const Command of _CommandList_1.CommandList) {
        if (message.content.startsWith(prefix + Command.name)) {
            yield Command.run(message);
            break;
        }
    }
    console.log(message.content);
});
exports.onMessage = onMessage;
