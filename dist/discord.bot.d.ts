import { Message } from 'discord.js';
export declare class DiscordBot {
    private static instance;
    private client;
    private constructor();
    static getInstance(): DiscordBot;
    static removeInstance(): void;
    connect(): void;
    private initializeCient;
    private setReadyHandler;
    private setMessageHandler;
    handleMessageAndAnswer(message: Message): string | void;
    isInconsequential(message: Message): boolean;
    isAssignRoleCommand(messageContent: string): boolean;
    private isBotMessage;
    private isNonServerMessage;
}
