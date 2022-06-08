import { CommandInt } from "../interfaces/CommandInt";
import { test,help,hentai } from "./comman";
import { play,playlist,join,skip,stop,removeLoop,toggleLoop,toggleQueueLoop,setVolume, seequeue,getVolume, pause, resume, shuffle } from "./play_music";

export const CommandList: CommandInt[] = [hentai,help,test,play,playlist,join,skip,stop,removeLoop,toggleLoop,toggleQueueLoop,setVolume,seequeue,getVolume,pause,resume,shuffle];