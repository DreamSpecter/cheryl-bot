import { Message } from 'discord.js';

export interface Command {
    help: string;
    check: (msg: Message) => boolean;
    execute: (msg: Message) => string;
}