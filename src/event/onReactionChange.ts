import { Message, MessageReaction , User } from "discord.js";

export const onReactionChange = async(reaction :MessageReaction ,user : User,add_or_remove :boolean)=>{
    if(add_or_remove)
    console.log(`${reaction.message.author!.username} added  ${reaction.emoji}  by ${user.id}`);
}