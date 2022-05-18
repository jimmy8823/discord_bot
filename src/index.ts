import { Client } from "discord.js";
import { connectDatabase } from "./database/connectDatabase";
import { validateEnv } from "./utils/validateEnv";
import { onMessage } from "./event/onMessage"
import { CommandList } from "./command/_CommandList";
import { Player, Queue } from "discord-music-player";

const Bot = new Client({ intents: ["GUILDS", "GUILD_MESSAGES","GUILD_VOICE_STATES"] });
export const player = new Player(Bot,{
        leaveOnEmpty: true, // This options are optional.
    });
export var guildQueue: Queue | undefined ;
(async () => {
    if(!validateEnv()) return; // 抓取不到env中的內容
    Bot.on("ready", () => console.log("Connected to Discord!"));
    Bot.on("messageCreate", async (message) =>  {
        guildQueue = player.getQueue(message.guildId as string);
        await onMessage(message)});
    await connectDatabase();
    await Bot.login(process.env.TOKEN as string);
})();   