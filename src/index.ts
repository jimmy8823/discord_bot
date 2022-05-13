import { Client } from "discord.js";
import { connectDatabase } from "./database/connectDatabase";

(async () => {
    const Bot = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
    Bot.on("ready", () => console.log("Connected to Discord!"));
    await connectDatabase();
    await Bot.login(process.env.BOT_TOKEN);
})();