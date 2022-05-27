
import { Message, MessageReaction , PartialMessageReaction, PartialUser, User } from "discord.js";

export const onReactionChange = async(reaction : MessageReaction|PartialMessageReaction,user : User|PartialUser,add_or_remove :boolean)=>{
    console.log(`onReactionChange activated reaction name: ${reaction.emoji.name}  reaction user: ${user.username}  message author: ${reaction.message.author?.username}`);
    if(add_or_remove){// add reaction
        switch(reaction.emoji.name){
            case "♻️":
                //console.log(reaction.message.embeds.pop()?.footer?.iconURL?.toString());
                //console.log(user.displayAvatarURL().toString());
                if(!reaction.message.author?.bot) break;
                if(reaction.message.embeds.pop()?.footer?.iconURL?.toString() == user.displayAvatarURL().toString()){//if(reaction.message.author.id == "973477149401055253"&& user.id!="973477149401055253"){
                    reaction.message.delete();
                    console.log("delete embed");
                }
                break;
            case "🙈":
                if(!reaction.message.author?.bot) break;
        }
    }else{

    }
    
}