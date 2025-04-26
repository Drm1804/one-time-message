import { Bot, Context, session } from 'grammy';
import { logger } from '../utils/logger.js';
import {
  removeBotMessageFromChat,
  viewMessage,
} from '../components/viewer/index.js';
import { getText } from './phrases/phrases.js';
import { LanguageCode } from 'grammy/types';

const ADMIN_IDS = [];
const log = logger('Bot Service');

export type SessionData = {
  db: Record<string, unknown>;
};

export type BotContext = Context;

let bot: Bot<BotContext>;

export function getBot(): Bot<BotContext> {
  return bot;
}

// async function isAdmin(ctx: BotContext, next: NextFunction): Promise<void> {
//   if (ADMIN_IDS.includes(ctx.from.id)) {
//     await next();
//   }
// }

export async function initBot(
  botToken: string,
): Promise<{ bot: Bot<BotContext> }> {
  bot = new Bot<BotContext>(botToken);

  bot.use(
    session({
      initial() {
        return {
          db: {},
        };
      },
    }),
  );

  // bot.use(isAdmin);

  // Install the conversations plugin.

  //Install menus

  bot.command('start', async (ctx) => {
    const [command, ...args] = ctx.update.message.text.split(' ');
    if (args.length > 0) {
      log.info(`start command ${command} with args ${args}`);
      await viewMessage(args[0], ctx.api, ctx.message.chat.id);
    } else {
      log.info(`start command ${command} without args`);
      await ctx.api.sendMessage(
        ctx.update.message.chat.id,
        getText(ctx.me.language_code as LanguageCode, 'welcome_message'),
      );
    }
  });

  bot.catch((error) => {
    console.log('bot error', error);
  });

  /**
   * Инжектим кастомные query разных модулей
   */

  bot.on('callback_query:data', async (ctx) => {
    console.log('Unknown button event with payload', ctx.callbackQuery.data);
    await ctx.answerCallbackQuery(); // remove loading animation
  });

  bot.catch((error) => {
    log.error('bot error', error);
  });

  bot.start({
    onStart(botInfo) {
      log.info('Bot starts as', botInfo.username);
    },
  });

  return { bot };
}
