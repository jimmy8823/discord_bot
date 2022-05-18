import { CommandInt } from "../interfaces/CommandInt";
import DBmodel from "../database/models/DBmodel";
import { MessageEmbed } from "discord.js";

export const test: CommandInt = {
    name : "test",
    description : "test",
    run : async (message) => {
        const{ author, channel, content } = message;
        let targetdata = await DBmodel.findOne({ discordId: author.id });
        let text = "島民為甚麼不念台大!";
        if(!targetdata){
            targetdata = await DBmodel.create({
                discordId: author.id,
                count: 0
            });
            await targetdata.save();
        }
        const prepare_msg = new MessageEmbed();
            prepare_msg.setTitle("哈兔大聯盟 哈!");
            prepare_msg.setTitle(text);
            prepare_msg.setAuthor(
                author.username + "#" + author.discriminator,
                author.displayAvatarURL()
            );
            prepare_msg.setImage("https://i.imgur.com/9wCBpdg.jpeg");
            await channel.send({ embeds : [prepare_msg] });
            await message.delete();
    }
}

