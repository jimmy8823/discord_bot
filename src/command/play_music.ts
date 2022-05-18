import { CommandInt } from "../interfaces/CommandInt";
import DBmodel from "../database/models/DBmodel";
import { MessageEmbed } from "discord.js";
import { player,guildQueue } from "../index";
import { RepeatMode } from "discord-music-player";


export const play: CommandInt = {
    name : "play",
    description : "play music",
    run : async (message) => {
        const{ author, channel, content ,guild , member} = message;
        const args = message.content.trim();
        const url = args.substring(5,args.length);
        let queue = player.createQueue(message.guildId as string);
        await queue.join(message.member!.voice.channel!);
        let song = await queue.play(url).catch(_=> {
            if(!guildQueue)
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
    }
}
export const playlist: CommandInt ={
    name : "playlist",
    description : "play list",
    run : async (message) => {
        const{ author, channel, content ,guild , member} = message;
        const args = message.content.trim();
        const url = args.substring(5,args.length);
        let queue = player.createQueue(message.guildId as string);
        await queue.join(message.member!.voice.channel!);
        let song = await queue.play(url).catch(_=> {
            if(!guildQueue)
                queue.stop();
        });
    }
}
export const skip: CommandInt ={
    name : "skip",
    description : "skip song",
    run : async (message) => {
        guildQueue!.skip();
    }
}
export const stop: CommandInt ={
    name : "stop",
    description : "stop song",
    run : async (message) => {
        guildQueue!.stop();
    }
}
export const removeLoop: CommandInt ={
    name : "removeloop",
    description : "removeLoop",
    run : async (message) => {
        guildQueue!.setRepeatMode(RepeatMode.DISABLED);
    }
}
export const toggleLoop: CommandInt ={
    name : "loop",
    description : "toggleLoop",
    run : async (message) => {
        guildQueue!.setRepeatMode(RepeatMode.SONG);
    }
}
export const toggleQueueLoop: CommandInt ={
    name : "loopqueue",
    description : "toggleLoopQueue",
    run : async (message) => {
        guildQueue!.setRepeatMode(RepeatMode.QUEUE);
    }
}
export const setVolume: CommandInt ={
    name : "setvolume",
    description : "setVolume",
    run : async (message) => {
        let args = message.content.trim();
        let vol = args.substring(9,args.length);
        guildQueue!.setVolume(parseInt(vol));;
    }
}