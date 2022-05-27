"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onReactionChange = void 0;
const onReactionChange = (reaction, user, add_or_remove) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    console.log(`onReactionChange activated reaction name: ${reaction.emoji.name}  reaction user: ${user.username}  message author: ${(_a = reaction.message.author) === null || _a === void 0 ? void 0 : _a.username}`);
    if (add_or_remove) { // add reaction
        switch (reaction.emoji.name) {
            case "♻️":
                //console.log(reaction.message.embeds.pop()?.footer?.iconURL?.toString());
                //console.log(user.displayAvatarURL().toString());
                if (!((_b = reaction.message.author) === null || _b === void 0 ? void 0 : _b.bot))
                    break;
                if (((_e = (_d = (_c = reaction.message.embeds.pop()) === null || _c === void 0 ? void 0 : _c.footer) === null || _d === void 0 ? void 0 : _d.iconURL) === null || _e === void 0 ? void 0 : _e.toString()) == user.displayAvatarURL().toString()) { //if(reaction.message.author.id == "973477149401055253"&& user.id!="973477149401055253"){
                    reaction.message.delete();
                    console.log("delete embed");
                }
                break;
            case "🙈":
                if (!((_f = reaction.message.author) === null || _f === void 0 ? void 0 : _f.bot))
                    break;
        }
    }
    else {
    }
});
exports.onReactionChange = onReactionChange;
