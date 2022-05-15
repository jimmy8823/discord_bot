import { Message } from "discord.js";
import { CommandList } from "../command/_CommandList";

const prefix = "-";

export const onMessage = async(message: Message)=>{
    if (message.author.bot) {
        return;
    }
    for (const Command of CommandList) {
        if (message.content.startsWith(prefix + Command.name)) {
          await Command.run(message);
          break;
        }
    }
    console.log(message.content);
}