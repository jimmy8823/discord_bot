import { Document, model, Schema } from "mongoose";

export interface DBInt extends Document{
    discordId: string;
    count: number;
}

export const DB = new Schema({
    discordId: String,
    round: Number,
});

export default model<DBInt>("DBmodel", DB);