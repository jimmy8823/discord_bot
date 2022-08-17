import { Message,Client,TextChannel } from "discord.js";
import { CommandList } from "../command/_CommandList";

const prefix = "+";

export const onMessage = async(client: Client,message: Message)=>{
    if(message.channel.id==="765415955890700328"||message.channel.id==="855001141670182922"){ //retweet
        if(message.content.startsWith("http")){ // if it post a url 
            ( client.channels.cache.get('983753978141626458') as TextChannel ).send(message.content);
        }else{
            try{ // if it post a image
                const attach= message.attachments;
                let attach_url = attach.map(a=>a.url);
                console.log(attach_url);
                if(attach_url != undefined)
                    ( client.channels.cache.get('983753978141626458') as TextChannel ).send(attach_url[0]);
            }catch{
                return;
            }
        }
    }
    if (message.author.bot) { //flitter bot content
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