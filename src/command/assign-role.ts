import { Message } from 'discord.js';
import { Command } from '../model/command';

export const assignRole: Command = {
    help: '',
    check: (msg: Message) => {
        return msg.content.toLowerCase().startsWith('?assign');
    },
    execute: (msg: Message) => {
        const rolepoint = 'role';
        if (msg.content.toLowerCase().indexOf(rolepoint) == -1) return 'specify what to assign: role';

        const author = msg.author;
        const roleindex = msg.content.toLowerCase().indexOf(rolepoint)
        const roleString = msg.content.toLowerCase().substring(roleindex+rolepoint.length).trim();
        const role = msg.guild?.roles.cache.find(role => role.name.toLowerCase() === roleString);
        const member = msg.guild?.members.cache.get(author.id);

        if(role && member) {
            member.roles.add(role);
            return `${role.name} now assigned to ${member.displayName}`;
        } else return 'unknown role';
    }
}