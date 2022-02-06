import { Message } from 'discord.js';
import { Command } from '../model/command';

export const help: Command = {
    help: '',
    check: (msg: Message) => { return msg.content.toLowerCase() === '?help'; },
    execute: () => { return 'can assign role with command `?assign role Rolename` or remove role with command `?remove role Rolename`'; },
}