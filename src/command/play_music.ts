import { CommandInt } from "../interfaces/CommandInt";
import DBmodel from "../database/models/DBmodel";
import { MessageEmbed } from "discord.js";
import { player,guildQueue } from "../index";
import { RepeatMode } from "discord-music-player";

export const play: CommandInt = {
    name : "play",
    description : "play music :musical_note: ",
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
    description : "play list :musical_note:",
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
    description : "skip song :fast_forward: ",
    run : async (message) => {
        guildQueue!.skip();
        const prepare_msg = new MessageEmbed();
        prepare_msg.setTitle(
            guildQueue!.nowPlaying +" skipped :fast_forward: "
        );
        await message.channel.send({ embeds : [prepare_msg] });
    }
}
export const stop: CommandInt ={
    name : "stop",
    description : "stop song :stop_button: ",
    run : async (message) => {
        guildQueue!.stop();
        const prepare_msg = new MessageEmbed();
        prepare_msg.setTitle(
            "Music stop :stop_button: "
        );
        await message.channel.send({ embeds : [prepare_msg] });
    }
}
export const removeLoop: CommandInt ={
    name : "rl",
    description : "removeLoop",
    run : async (message) => {
        await guildQueue!.setRepeatMode(RepeatMode.DISABLED);
        const prepare_msg = new MessageEmbed();
        console.log(RepeatMode);
        prepare_msg.setTitle(
            "disable repeat!" 
        )
        await message.channel.send({ embeds : [prepare_msg] });
    }
}
export const toggleLoop: CommandInt ={
    name : "l",
    description : "toggleLoop :repeat_one:",
    run : async (message) => {
        await guildQueue!.setRepeatMode(RepeatMode.SONG);
        console.log(RepeatMode);
        const prepare_msg = new MessageEmbed();
        prepare_msg.setTitle(
            "toggle repeat! :repeat_one: " 
        )
        await message.channel.send({ embeds : [prepare_msg] });
    }
}
export const toggleQueueLoop: CommandInt ={
    name : "ql",
    description : "toggleLoopQueue :repeat: ",
    run : async (message) => {
        await guildQueue!.setRepeatMode(RepeatMode.QUEUE);
        const prepare_msg = new MessageEmbed();
        prepare_msg.setTitle(
            "toggle repeat queue! :repeat: " 
        )
        await message.channel.send({ embeds : [prepare_msg] });
    }
}
export const setVolume: CommandInt ={
    name : "sv",
    description : "setVolume :sound: ",
    run : async (message) => {
        const prepare_msg = new MessageEmbed();
        let args = message.content.trim();
        let vol = args.substring(10,args.length);
        console.log(message.author.username + "set volume :" + vol);
        await guildQueue!.setVolume(parseInt(vol));
            prepare_msg.setTitle(
                "already set volume :sound: " + guildQueue!.volume
        )
        await message.channel.send({ embeds : [prepare_msg] });
    }
}
export const getVolume: CommandInt ={
    name : "volume",
    description : "current volume :sound: ",
    run : async (message) => {
        const prepare_msg = new MessageEmbed();
        prepare_msg.setTitle(
            "current volume :sound: " + guildQueue!.volume
        );
        await message.channel.send({ embeds : [prepare_msg] });
    }
}
export const seequeue: CommandInt ={
    name : "queue",
    description : "see play list ",
    run : async (message) => {
        const prepare_msg = new MessageEmbed();
        let queue = player.createQueue(message.guildId as string);
        try{
            prepare_msg.setTitle(
            "Now playiing :" + queue.nowPlaying 
            );
            prepare_msg.addField('\u200b', '\u200b');
            prepare_msg.setColor("PURPLE");
            for(let i=0;i<guildQueue!.songs.length;i++){
                let str = guildQueue!.songs[i].name as string;
                let duration = guildQueue!.songs[i].duration;
                prepare_msg.addField(str,duration);
            }
        }catch(TypeError){
            prepare_msg.setTitle(
                "The queue is empty !" 
            );
        }
        prepare_msg.setTimestamp();
        await message.channel.send({ embeds : [prepare_msg] });
    }
}
