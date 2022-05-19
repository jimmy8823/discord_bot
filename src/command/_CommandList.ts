import { CommandInt } from "../interfaces/CommandInt";
import { test,help,hentai } from "./comman";
import { play,playlist,skip,stop,removeLoop,toggleLoop,toggleQueueLoop,setVolume, seequeue,getVolume } from "./play_music";

export const CommandList: CommandInt[] = [hentai,help,test,play,playlist,skip,stop,removeLoop,toggleLoop,toggleQueueLoop,setVolume,seequeue,getVolume];