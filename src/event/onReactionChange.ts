
import { Message, MessageReaction , PartialMessageReaction, PartialUser, User } from "discord.js";

export const onReactionChange = async(reaction : MessageReaction|PartialMessageReaction,user : User|PartialUser,add_or_remove :boolean)=>{
    //console.log(`onReactionChange activated reaction name: ${reaction.emoji.name}  reaction user: ${user.username}  message author: ${reaction.message.author?.username}`);
    if(add_or_remove){// add reaction
        switch(reaction.emoji.name){
            case "♻️":
                if(user.bot) break;
                let iconURL = await reaction.message.embeds.pop()?.footer?.iconURL;
                console.log(typeof iconURL + "  "+iconURL);
                console.log(typeof user.displayAvatarURL()+ "  "+user.displayAvatarURL());
                if(!reaction.message.author?.bot) break;
                if(iconURL === user.displayAvatarURL()){
                    reaction.message.delete().catch((error)=>{
                        console.log(error);
                    });
                    console.log("delete embed");
                }
                break;
            case "🙈":
                if(!reaction.message.author?.bot) break;
        }
    }else{

    }
    
}