"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordBot = void 0;
var discord_js_1 = require("discord.js");
var DiscordBot = /** @class */ (function () {
    function DiscordBot() {
        this.client = new discord_js_1.Client({
            intents: [
                discord_js_1.Intents.FLAGS.GUILDS,
                discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
                discord_js_1.Intents.FLAGS.DIRECT_MESSAGES
            ],
            partials: ['MESSAGE', 'CHANNEL']
        });
        this.initializeCient();
    }
    DiscordBot.getInstance = function () {
        if (!DiscordBot.instance) {
            DiscordBot.instance = new DiscordBot();
        }
        return DiscordBot.instance;
    };
    DiscordBot.removeInstance = function () {
        DiscordBot.instance = undefined;
    };
    DiscordBot.prototype.connect = function () {
        this.client
            .login(process.env.D_TOKEN)
            .then(function (_) { return console.log('Connected to Discord'); })
            .catch(function (error) {
            return console.error("Could not connect. Error: ".concat(error.message));
        });
    };
    DiscordBot.prototype.initializeCient = function () {
        if (!this.client)
            return;
        this.setReadyHandler();
        this.setMessageHandler();
    };
    // #endregion copied code
    DiscordBot.prototype.setReadyHandler = function () {
        var _this = this;
        this.client.on('ready', function () {
            var _a;
            console.log("Logged in as ".concat((_a = _this.client.user) === null || _a === void 0 ? void 0 : _a.tag, "!"));
        });
    };
    DiscordBot.prototype.setMessageHandler = function () {
        var _this = this;
        this.client.on('messageCreate', function (message) {
            var answer = _this.handleMessageAndAnswer(message);
            if (answer)
                message.channel.send(answer);
        });
    };
    DiscordBot.prototype.handleMessageAndAnswer = function (message) {
        var _a, _b, _c, _d;
        if (message.author.bot || this.isInconsequential(message))
            return;
        var messageContent = message.content.toLowerCase();
        if (messageContent === '?help')
            return 'can assign role with command `?assign role Rolename` or remove role with command `?remove role Rolename`';
        if (this.isAssignRoleCommand(messageContent)) {
            var rolepoint = 'role';
            if (messageContent.indexOf(rolepoint) == -1)
                return 'specify what to assign: role';
            var author = message.author;
            var roleindex = messageContent.indexOf(rolepoint);
            var roleString_1 = messageContent.substring(roleindex + rolepoint.length).trim();
            var role = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.roles.cache.find(function (role) { return role.name.toLowerCase() === roleString_1; });
            var member = (_b = message.guild) === null || _b === void 0 ? void 0 : _b.members.cache.get(author.id);
            if (role && member) {
                member.roles.add(role);
                return "".concat(role.name, " now assigned to ").concat(member.displayName);
            }
            else
                return 'unknown role';
        }
        if (messageContent.startsWith('?remove')) {
            var rolepoint = 'role';
            if (messageContent.indexOf(rolepoint) == -1)
                return 'specify what to remove: role';
            var author = message.author;
            var roleindex = messageContent.indexOf(rolepoint);
            var roleString_2 = messageContent.substring(roleindex + rolepoint.length).trim();
            var role = (_c = message.guild) === null || _c === void 0 ? void 0 : _c.roles.cache.find(function (role) { return role.name.toLowerCase() === roleString_2; });
            var member = (_d = message.guild) === null || _d === void 0 ? void 0 : _d.members.cache.get(author.id);
            if (role && member) {
                member.roles.remove(role);
                return "".concat(role.name, " now removed from ").concat(member.displayName);
            }
            else
                return 'unknown role';
        }
    };
    DiscordBot.prototype.isInconsequential = function (message) {
        return this.isBotMessage(message) || this.isNonServerMessage(message);
    };
    DiscordBot.prototype.isAssignRoleCommand = function (messageContent) {
        return messageContent.startsWith('?assign');
    };
    DiscordBot.prototype.isBotMessage = function (message) {
        return message.author.bot;
    };
    DiscordBot.prototype.isNonServerMessage = function (message) {
        return !message.guild;
    };
    return DiscordBot;
}());
exports.DiscordBot = DiscordBot;
//# sourceMappingURL=discord.bot.js.map