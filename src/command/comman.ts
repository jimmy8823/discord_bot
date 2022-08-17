import { CommandInt } from "../interfaces/CommandInt";
import DBmodel from "../database/models/DBmodel";
import { Message, MessageEmbed } from "discord.js";
import { CommandList } from "./_CommandList";
import axios from "axios";
import { image } from "../index";
import { Image_data } from "../interfaces/imagestructure"

export const test: CommandInt = {
    name : "test",
    description : "test",
    run : async (message) => {
        const{ author, channel, content } = message;
        //let targetdata = await DBmodel.findOne({ discordId: author.id });
        let text = "島民為甚麼不念台大!";
        /*if(!targetdata){
            targetdata = await DBmodel.create({
                discordId: author.id,
                count: 0
            });
            await targetdata.save();
        }*/
        const prepare_msg = new MessageEmbed();
            prepare_msg.setTitle("哈兔大聯盟 哈!");
            prepare_msg.setDescription(text);
            prepare_msg.setAuthor(
                author.username + "#" + author.discriminator,
                author.displayAvatarURL()
            );
            prepare_msg.setImage("https://i.imgur.com/9wCBpdg.jpeg");
            await channel.send({ embeds : [prepare_msg] });
    }
}
export const help: CommandInt = {
    name : "help",
    description : "see command",
    run : async (message) => {
        const{ author, channel, content } = message;
        const prepare_msg = new MessageEmbed();
            prepare_msg.setTitle("Command list");
            prepare_msg.addField('\u200b', '\u200b');
            for(let i=0;i<CommandList.length;i++){
                prepare_msg.addField("+`"+CommandList[i].name+"`",CommandList[i].description);
            }
            prepare_msg.setThumbnail("https://i.imgur.com/9wCBpdg.jpeg")
            prepare_msg.setTimestamp();
            await channel.send({ embeds : [prepare_msg] });
    }
}

export const hentai: CommandInt = {
    name : "hentai",
    description : ":underage: usage: +hentai or +hentai tag # if want to use multi tag use +, english only",
    run :async (message) => {
        const prepare_msg = new MessageEmbed();
        if(message.content.length>7){
            let query = message.content.substring(8,);
            console.log(query);
            get_hentai_bytag(query,message);
        }else{
            await get_hentai();
            const{ author, channel, content } = message;
            //prepare_msg.setdDescription();
            await write_embed(prepare_msg);
            prepare_msg.setFooter(
                author.username + "#" + author.discriminator,
                author.displayAvatarURL()
            );
            prepare_msg.setTimestamp();
            const send_msg = await channel.send({ embeds : [prepare_msg] });
            send_msg.react('♻️')
            console.log(globalThis.rnd_number.length +"  " + image.length);
            message.delete().catch((error)=>{
                console.log(error);
            })
        }
    }
}
const write_embed = (prepare_msg:MessageEmbed)=>{
    let rnd = globalThis.rnd_number.pop();
    let detail_url = "https://yande.re/post/show/" + image[rnd!].id;
    console.log(image[rnd!].score +"    "+image[rnd!].tag);
    prepare_msg.setTitle("yande.re " + image[rnd!].id + ".jpg");
    //prepare_msg.setTitle(" [ Yande.re ]     :regional_indicator_i: :regional_indicator_d:   : " + image[rnd!].id);
    //prepare_msg.setURL(detail_url);
    prepare_msg.setDescription(detail_url);
    prepare_msg.setURL(image[rnd!].url as string);
    prepare_msg.addField(" Score :", image[rnd!].score.toString() ,true);
    prepare_msg.addField('\u200b', '\u200b',true);
    prepare_msg.addField(" Tag :", image[rnd!].tag.toString() ,true);
    prepare_msg.setImage(image[rnd!].url);
    console.log(prepare_msg.image?.url);
}

const get_hentai = async()=>{
    if(image.length<=0 || globalThis.rnd_number.length<=0){
        await clear_list();
        const response = await axios.get('https://yande.re/post/popular_recent.json?api_version=2')
        .then( (response) => {
            console.log("request to yande.re");
            let data = response.data;
            for(let i=0;i<40;i++){
                const img : Image_data = {
                    id: data[i].id,
                    url: data[i].jpeg_url,
                    score : data[i].score,
                    tag : data[i].tags,
                };
                image.push(img);
            }
            globalThis.rnd_number=[];
            for(let j=0;j<8;j++){ //get 8 different random number
                let rnd = getRndInteger(0,image.length);
                //console.log(rnd);
                if(globalThis.rnd_number.indexOf(rnd)==-1||globalThis.rnd_number===undefined){
                    //console.log("add" + rnd +"to list");
                    globalThis.rnd_number.push(rnd);
                }else{
                    j--;
                }
            }
        })
        .catch( (error) => console.log(error)) 
    }
}
const  get_hentai_bytag = async(query:string,message:Message)=>{
    const prepare_msg = new MessageEmbed();
    const response = await axios.get('https://yande.re/post.json?tags='+ query +'&limit=40&api_version=2')
    .then((response)=>{
        console.log(response.status);
        let data = response.data; // response json file contain id,url,score,tag etc... 
        if(data.posts.length<=0){
            prepare_msg.setTitle(" not found from this tag !");
        }else{
            let rnd = getRndInteger(0,data.posts.length); // get rnd number to get pic
            let detail_url = "https://yande.re/post/show/" + data.posts[rnd].id;
            console.log(data.posts[rnd].score +"    "+data.posts[rnd].tags);
            prepare_msg.setTitle(" [ Yande.re ]     :regional_indicator_i: :regional_indicator_d:   : " + data.posts[rnd].id);
            prepare_msg.addField(" Score :", data.posts[rnd].score.toString() ,true);
            prepare_msg.addField('\u200b', '\u200b',true);
            prepare_msg.addField(" Tag :", data.posts[rnd].tags.toString() ,true);
            prepare_msg.setImage(data.posts[rnd].jpeg_url as string);
            prepare_msg.setURL(detail_url);
        }
    })
    .catch((error)=> {
        console.log(error);
        prepare_msg.setTitle(" error happened when request to yande.re!");
    });
    prepare_msg.setFooter(
    message.author.username + "#" + message.author.discriminator,
    message.author.displayAvatarURL()
    );
    prepare_msg.setTimestamp();
    const send_msg = await message.channel.send({ embeds : [prepare_msg] });
    send_msg.react('♻️');
    message.delete().catch((error)=>{
        console.log(error);
    })
    
};

function getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
const clear_list = ()=>{while(image.length>0){image.pop();}};