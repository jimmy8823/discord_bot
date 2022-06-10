import { Client, MessageReaction } from "discord.js";
import { connectDatabase } from "./database/connectDatabase";
import { validateEnv } from "./utils/validateEnv";
import { onMessage } from "./event/onMessage"
import { CommandList } from "./command/_CommandList";
import { Player, Queue } from "discord-music-player";
import { Image_data } from "./interfaces/imagestructure";
import { onReactionChange } from "./event/onReactionChange";

const Bot = new Client({ 
    intents: ["GUILDS", "GUILD_MESSAGES","GUILD_VOICE_STATES","GUILD_MESSAGE_REACTIONS","DIRECT_MESSAGES","DIRECT_MESSAGE_REACTIONS"], //gateway setting
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
export const player = new Player(Bot,{
        leaveOnEmpty: true, // setting music player option
        leaveOnStop: false,
});

export var guildQueue: Queue | undefined ;
export var image : Image_data[] =[];
declare global {
    var rnd_number: number[];
    var queue_index: string[];
}

(async () => {
    if(!validateEnv()) return; // 抓取不到env中的內容
    Bot.on("ready", async() =>{
        console.log("Connected to Discord!");
    });
    Bot.on("messageCreate", async (message) =>  {
        guildQueue = player.getQueue(message.guildId as string);
        await onMessage(message)});
    Bot.on("messageReactionAdd", async (reaction,user) =>  {
        // When a reaction is received, check if the structure is partial
        if (reaction.partial) {
            // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
            try {
                await reaction.fetch();
            } catch (error) {
                console.error('Something went wrong when fetching the message:', error);
                // Return as `reaction.message.author` may be undefined/null
                return;
            }
        }
        onReactionChange(reaction,user,true);
        // Now the message has been cached and is fully available
        console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
        // The reaction is now also fully available and the properties will be reflected accurately:
        console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
    });
    Bot.on("messageReactionRemove", async (reaction,user) =>  {
        // When a reaction is received, check if the structure is partial
        if (reaction.partial) {
            // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
            try {
                await reaction.fetch();
            } catch (error) {
                console.error('Something went wrong when fetching the message:', error);
                // Return as `reaction.message.author` may be undefined/null
                return;
            }
            //onReactionChange(reaction,user,false);
        }
        onReactionChange(reaction,user,false);
        // Now the message has been cached and is fully available
        console.log(`${reaction.message.author?.id}'s message "${reaction.emoji.name}" gained a reaction!`);
        // The reaction is now also fully available and the properties will be reflected accurately:
        console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
    });
    await connectDatabase();
    await Bot.login(process.env.TOKEN as string);
    globalThis.queue_index = [":zero:",":one:",":two:",":three:",":four:",":five:",":six:",":seven:",":eight:",":nine:",":keycap_ten:"];
})();
