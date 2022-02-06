import { Client, Guild, Message, User } from 'discord.js';
import { DiscordBot } from './discord.bot';
import { instance, mock } from 'ts-mockito';

describe('DiscordBot', () => {
    let bot: DiscordBot;

    beforeEach(() => {
        bot = DiscordBot.getInstance();
    });

    afterEach(() => {
        const client = (bot as unknown as {client: Client}).client; 
        client.removeAllListeners();
        client.destroy();
        DiscordBot.removeInstance();
    });

    test('should ignore when author is bot', () => {
        const author = {bot: true} as unknown as User;
        const message = {author: author} as unknown as Message;

        const answer = bot.handleMessageAndAnswer(message);

        expect(answer).toBeUndefined();
    });
    
    test('should ignore when non server message', () => {  
        const author = {bot: false} as unknown as User;
        const message = {author: author} as unknown as Message;

        const answer = bot.handleMessageAndAnswer(message);

        expect(answer).toBeUndefined();
    });
    
    test('should ignore when not an assign command', () => {  
        const author = {bot: false} as unknown as User;
        const guild = {name: 'some guild'} as unknown as Guild;
        const message = {author: author, guild: guild, content: 'some other message'} as unknown as Message;

        const answer = bot.handleMessageAndAnswer(message);

        expect(answer).toBeUndefined();
    });

    test('should return "specify what to assign: role" when role and user missing', () => {   
        const author = {bot: false} as unknown as User;
        const guild = {name: 'some guild'} as unknown as Guild;
        const message = {author: author, guild: guild, content: '?assign'} as unknown as Message;

        const answer = bot.handleMessageAndAnswer(message);

        expect(answer).toEqual('specify what to assign: role');
    });
});