import { DiscordBot } from './discord.bot';

require('dotenv').config();

const bot = DiscordBot.getInstance();

bot.connect();