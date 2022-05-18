"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandList = void 0;
const test_1 = require("./test");
const play_music_1 = require("./play_music");
exports.CommandList = [test_1.test, play_music_1.play, play_music_1.playlist, play_music_1.skip, play_music_1.stop, play_music_1.removeLoop, play_music_1.toggleLoop, play_music_1.toggleQueueLoop, play_music_1.setVolume];
