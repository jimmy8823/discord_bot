import { CommandInt } from "../interfaces/CommandInt";
import DBmodel from "../database/models/DBmodel";
import { MessageEmbed } from "discord.js";
import { CommandList } from "./_CommandList";
import { RequestInfo, RequestInit } from 'node-fetch';
import * as cheerio from 'cheerio';
import axios from "axios";
import { image } from "../index";
import { Image_data } from "../interfaces/imagestructure"

export const test: CommandInt = {
    name : "test",
    description : "test",
    run : async (message) => {
        const{ author, channel, content } = message;
        let targetdata = await DBmodel.findOne({ discordId: author.id });
        let text = "島民為甚麼不念台大!";
        if(!targetdata){
            targetdata = await DBmodel.create({
                discordId: author.id,
                count: 0
            });
            await targetdata.save();
        }
        const prepare_msg = new MessageEmbed();
            prepare_msg.setTitle("哈兔大聯盟 哈!");
            prepare_msg.setdDescription(text);
            prepare_msg.setAuthor(
                author.username + "#" + author.discriminator,
                author.displayAvatarURL()
            );
            prepare_msg.setImage("https://i.imgur.com/9wCBpdg.jpeg");
            await channel.send({ embeds : [prepare_msg] });
    }
}
export const help: CommandInt = {
    name : "help",
    description : "see command",
    run : async (message) => {
        const{ author, channel, content } = message;
        const prepare_msg = new MessageEmbed();
            prepare_msg.setTitle("Command list");
            prepare_msg.addField('\u200b', '\u200b');
            for(let i=0;i<CommandList.length;i++){
                prepare_msg.addField(CommandList[i].name,CommandList[i].description);
            }
            prepare_msg.setThumbnail("https://i.imgur.com/9wCBpdg.jpeg")
            prepare_msg.setTimestamp();
            await channel.send({ embeds : [prepare_msg] });
    }
}
export const hentai: CommandInt = {
    name : "hentai",
    description : "see hentai",
    run : async (message) => {
        await get_hentai();
        const{ author, channel, content } = message;
        const prepare_msg = new MessageEmbed();
        //prepare_msg.setdDescription();
        let rnd = getRndInteger(0,image.length);
        console.log(image[rnd].score +"    "+image[rnd].tag);
        prepare_msg.setTitle(" [ Yande.re ]     Id  : " + image[rnd].id);
        prepare_msg.addField(" Score :", image[rnd].score.toString() ,true);
        prepare_msg.addField('\u200b', '\u200b',true);
        prepare_msg.addField(" Tag :", image[rnd].tag.toString() ,true);
        prepare_msg.setImage(image[rnd].url as string);
        
        prepare_msg.setURL(image[rnd].url as string);
        prepare_msg.setFooter(
            author.username + "#" + author.discriminator,
            author.displayAvatarURL()
        );
        prepare_msg.setTimestamp();
        await channel.send({ embeds : [prepare_msg] });
        globalThis.h_count += 1;
        console.log(globalThis.h_count);
    }
}
const get_hentai = async()=>{
    if(image.length<=0 || globalThis.h_count>=20){
        const response = await axios.get('https://yande.re/post/popular_recent.json?api_version=2')
        .then( (response) => {
            console.log("request to yande.re");
            let data = response.data;
            for(let i=0;i<40;i++){
                const img : Image_data = {
                    id: data[i].id,
                    url: data[i].jpeg_url,
                    score : data[i].score,
                    tag : data[i].tags,
                };
                image.push(img);
                globalThis.h_count = 0;
            }
        })
        .catch( (error) => console.log(error)) 
    }
}

function getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}