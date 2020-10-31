import { Client, Message } from 'discord.js'

export class DiscordBot {
    // #region copied code
    private static instance: DiscordBot | undefined;

    private client: Client = new Client();

    private constructor() {
        this.initializeCient()
    }

    static getInstance(): DiscordBot {
        if (!DiscordBot.instance) {
            DiscordBot.instance = new DiscordBot();
        }
        return DiscordBot.instance;
    }

    static removeInstance(): void {
        DiscordBot.instance = undefined;
    }

    connect(): void {
        this.client
            .login(process.env.D_TOKEN)
            .then((_) => console.log('Connected to Discord'))
            .catch((error) =>
                console.error(`Could not connect. Error: ${error.message}`)
            )
    }

    private initializeCient(): void {
        if (!this.client) return

        this.setReadyHandler()
        this.setMessageHandler()
    }
    // #endregion copied code

    private setReadyHandler(): void {
        this.client.on('ready', () => {
            console.log(`Logged in as ${this.client.user?.tag}!`)
        })
    }

    private setMessageHandler(): void {
        this.client.on('message', async (message: Message) => {
            const answer = this.handleMessageAndAnswer(message)

            if (answer) await message.channel.send(answer);
        })
    }

    handleMessageAndAnswer(message: Message): string | void {
        if(message.author.bot) return;

        const messageContent = message.content.toLowerCase();

        if(messageContent==='ping'){
            return 'pong';
        }
        if(messageContent==='marco'){
            return 'polo';
        }
        if(messageContent==='schatzi'){
            return 'ja';
        }
        if(messageContent==='Nya'){
            return 'Meow';
        }
        if(messageContent==='gut'){
            return 'dies freut mich sehr';
        }
        if(messageContent.startsWith('cheryl')){
            if(messageContent==='cheryl du bist cool'){
                return 'das ist sehr nett, ich kann dies nur erwiedern';
            }
            if(messageContent==='cheryl wie gehts dir?'){
                return 'ausgesprochen gut und dir?';
            }

            return 'hmm?';
        }
        if(messageContent.startsWith('?assign')){
            const userpoint = 'user';
            const rolepoint = 'role';
            const userindex = messageContent.indexOf(userpoint)
            const roleindex = messageContent.indexOf(rolepoint)
            const user = message.content.substring(userindex+userpoint.length, roleindex).trim();
            const roleString = messageContent.substring(roleindex+rolepoint.length).trim();
            const role = message.guild?.roles.cache.find(role => role.name.toLowerCase() === roleString);
            const member = message.guild?.members.cache.find(member => member.nickname === user || member.displayName === user );
            if(role && member) member.roles.add(role);
            else {
                return !role ? `Unbekannte Rolle${!member ? 'und unbekannter User' : ''}` : 'Unbekannter User';
            }
        }
        // if (this.isInconsequential(message)) return;

        //     const messageContentParts = message.content.split(' ');

        //     if (this.isAssignRoleCommand(message) && messageContentParts.length >= 3) {
        //         const role = messageContentParts[1];
        //         const user = messageContentParts[2];

        //         if(this.hasRoleToAssign(role, message.guild?.roles)) {
        //             await message.channel.send('yes');
        //             return;
        //         }
        //         // const authorRoles = message.guild.member(message.author)?.roles;
        //         // const role = message.mentions.roles.first();
        //         // const members = message.mentions.members;
        //         // if(role) {
        //         //   members?.forEach(member => member.roles.add(role));
        //         // } else {
        //         //   await message.reply('no roles specified');
        //         // }
        //     }
        //     await message.channel.send('no');
    }

    // isInconsequential(message: Message): boolean {
    //     return this.isBotMessage(message) || this.isNonServerMessage(message)
    // }

    // isAssignRoleCommand(message: Message): boolean {
    //     return message.content.startsWith('?assign')
    // }

    // hasRoleToAssign(role: string, roles?: RoleManager): boolean {
    //     return !!roles?.cache.find(r => {
    //         return r.name === role;
    //     }); 
    // }

    // private isBotMessage(message: Message): boolean {
    //     return message.author.bot
    // }

    // private isNonServerMessage(message: Message): boolean {
    //     return !message.guild
    // }
}
