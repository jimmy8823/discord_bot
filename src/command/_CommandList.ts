import { CommandInt } from "../interfaces/CommandInt";
import { test } from "./test";
import { play,playlist,skip,stop,removeLoop,toggleLoop,toggleQueueLoop,setVolume, seequeue,getVolume } from "./play_music";

export const CommandList: CommandInt[] = [test,play,playlist,skip,stop,removeLoop,toggleLoop,toggleQueueLoop,setVolume,seequeue,getVolume];