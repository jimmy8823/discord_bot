import { Client } from "discord.js";
import { connectDatabase } from "./database/connectDatabase";
import { validateEnv } from "./utils/validateEnv";
import { onMessage } from "./event/onMessage"

(async () => {
    if(!validateEnv()) return; // 抓取不到env中的內容
    const Bot = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
    Bot.on("ready", () => console.log("Connected to Discord!"));
    Bot.on("message", async (message) => await onMessage(message));
    await connectDatabase();
    await Bot.login(process.env.TOKEN as string);
})();