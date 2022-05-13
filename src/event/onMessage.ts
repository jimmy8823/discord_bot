import { Message } from "discord.js";

const prefix = "!";

export const onMessage = async(message: Message)=>{
    if (message.author.bot) {
        return;
    }
    if (!message.content.startsWith(prefix)) {
        return;
    }
    console.log(message.content);
}