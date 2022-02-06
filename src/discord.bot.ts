import { Client, Intents, Message } from 'discord.js'
import { assignRole } from './command/assign-role';
import { help } from './command/help';
import { removeRole } from './command/remove-role';

export class DiscordBot {
    // #region copied code
    private static instance: DiscordBot | undefined;

    private client: Client = new Client({
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES, 
            Intents.FLAGS.DIRECT_MESSAGES
        ],
        partials: ['MESSAGE', 'CHANNEL']
    });

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
        this.client.on('messageCreate', (message: Message) => {
            const answer = this.handleMessageAndAnswer(message)
            if (answer) message.channel.send(answer);
        })
    }

    handleMessageAndAnswer(message: Message): string | void {
        if(this.isBotMessage(message) || this.isInconsequential(message)) return;

        if (help.check(message)) return help.execute(message);         
        
        if(assignRole.check(message)) {
            return assignRole.execute(message);
        }

        if(removeRole.check(message)) {
            return removeRole.execute(message);
        }
    }

    isInconsequential(message: Message): boolean {
        return this.isBotMessage(message) || this.isNonServerMessage(message)
    }

    private isBotMessage(message: Message): boolean {
        return message.author.bot
    }

    private isNonServerMessage(message: Message): boolean {
        return !message.guild
    }
}
