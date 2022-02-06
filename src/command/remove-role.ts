import { Message } from 'discord.js';
import { Command } from '../model/command';

export const removeRole: Command = {
    help: '',
    check: (msg: Message) => {
        return msg.content.toLowerCase().startsWith('?remove');
    },
    execute: (msg: Message) => {
        const rolepoint = 'role';
        if (msg.content.toLowerCase().indexOf(rolepoint) == -1) return 'specify what to remove: role';

        const author = msg.author;
        const roleindex = msg.content.toLowerCase().indexOf(rolepoint)
        const roleString = msg.content.toLowerCase().substring(roleindex+rolepoint.length).trim();
        const role = msg.guild?.roles.cache.find(role => role.name.toLowerCase() === roleString);
        const member = msg.guild?.members.cache.get(author.id);

        if(role && member) {
            member.roles.remove(role);
            return `${role.name} now removed from ${member.displayName}`;
        } else return 'unknown role';
    }
}