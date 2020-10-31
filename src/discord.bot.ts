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
        if(message.author.bot || this.isInconsequential(message)) return;

        const messageContent = message.content.toLowerCase();

        if(messageContent==='ping'){
            return 'pong';
        }
        if(messageContent==='marco'){
            return 'polo';
        }
        if(messageContent==='Nya'){
            return 'Meow';
        }
        if(messageContent.startsWith('cheryl')){
            if(messageContent==='cheryl you\'re cool'){
                return 'that is nice, you are as well';
            }
            if(messageContent==='cheryl how are you?'){
                return 'I am good, how are you?';
            }

            return 'hmm?';
        }
        if (messageContent === '?help') return 'can assign role with command `?assign role <Rolename>`';         
        if(this.isAssignRoleCommand(messageContent)){
            const rolepoint = 'role';
            if (messageContent.indexOf(rolepoint) == -1) return 'specify what to assign: role';

            const author = message.author;
            const roleindex = messageContent.indexOf(rolepoint)
            const roleString = messageContent.substring(roleindex+rolepoint.length).trim();
            const role = message.guild?.roles.cache.find(role => role.name.toLowerCase() === roleString);
            const member = message.guild?.members.cache.find(member => member.user === author);

            if(role && member) member.roles.add(role);
            else return 'unknown role';
        }
    }

    isInconsequential(message: Message): boolean {
        return this.isBotMessage(message) || this.isNonServerMessage(message)
    }

    isAssignRoleCommand(messageContent: string): boolean {
        return messageContent.startsWith('?assign')
    }

    private isBotMessage(message: Message): boolean {
        return message.author.bot
    }

    private isNonServerMessage(message: Message): boolean {
        return !message.guild
    }
}
