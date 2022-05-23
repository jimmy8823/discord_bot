
import { Message, MessageReaction , PartialMessageReaction, PartialUser, User } from "discord.js";

export const onReactionChange = async(reaction : MessageReaction|PartialMessageReaction,user : User|PartialUser,add_or_remove :boolean)=>{
    console.log(`onReactionChange activated reaction name: ${reaction.emoji.name}  reaction user: ${user.id}  message author: ${reaction.message.author?.id}`);
    if(add_or_remove){// add reaction
        switch(reaction.emoji.name){
            case "♻️":
                if(!reaction.message.author?.bot) break;
                if(reaction.message.author.id=="973477149401055253"&&user.id!="973477149401055253"){
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