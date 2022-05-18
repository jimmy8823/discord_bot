import { CommandInt } from "../interfaces/CommandInt";
import DBmodel from "../database/models/DBmodel";
import { MessageEmbed } from "discord.js";
import { player,guildQueue } from "../index";
import { RepeatMode } from "discord-music-player";
import { channel } from "diagnostics_channel";


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
        await guildQueue!.setRepeatMode(RepeatMode.DISABLED);
        const prepare_msg = new MessageEmbed();
        console.log(RepeatMode);
        prepare_msg.setTitle(
            "turn off repeat!" 
        )

        await message.channel.send({ embeds : [prepare_msg] });
    }
}
export const toggleLoop: CommandInt ={
    name : "loop",
    description : "toggleLoop",
    run : async (message) => {
        await guildQueue!.setRepeatMode(RepeatMode.SONG);
        console.log(RepeatMode);
        const prepare_msg = new MessageEmbed();
        prepare_msg.setTitle(
            "toggle repeat!" 
        )
        await message.channel.send({ embeds : [prepare_msg] });
    }
}
export const toggleQueueLoop: CommandInt ={
    name : "loopqueue",
    description : "toggleLoopQueue",
    run : async (message) => {
        await guildQueue!.setRepeatMode(RepeatMode.QUEUE);
        const prepare_msg = new MessageEmbed();
        prepare_msg.setTitle(
            "toggle repeat queue!" 
        )
        await message.channel.send({ embeds : [prepare_msg] });
    }
}
export const setVolume: CommandInt ={
    name : "setvolume",
    description : "setVolume",
    run : async (message) => {
        const prepare_msg = new MessageEmbed();
        let args = message.content.trim();
        let vol = args.substring(10,args.length);
        console.log(message.author.username + "set volume :" + vol);
        await guildQueue!.setVolume(parseInt(vol));
            prepare_msg.setTitle(
                "already set volume :" + guildQueue!.volume
        )
        await message.channel.send({ embeds : [prepare_msg] });
    }
}
export const getVolume: CommandInt ={
    name : "volume",
    description : "print volume",
    run : async (message) => {
        const prepare_msg = new MessageEmbed();
        prepare_msg.setTitle(
            "now volume :" + guildQueue!.volume
        );
        await message.channel.send({ embeds : [prepare_msg] });
    }
}
export const seequeue: CommandInt ={
    name : "list",
    description : "see play list",
    run : async (message) => {
        const prepare_msg = new MessageEmbed();
        let queue = player.createQueue(message.guildId as string);
        prepare_msg.setTitle(
            "now playiing :" + queue.nowPlaying 
        );
        for(let i=0;i<guildQueue!.songs.length;i++){
            let str = guildQueue!.songs[i].name as string;
            let duration = guildQueue!.songs[i].duration;
            prepare_msg.addField(str,duration);
        }
        await message.channel.send({ embeds : [prepare_msg] });
    }
}
