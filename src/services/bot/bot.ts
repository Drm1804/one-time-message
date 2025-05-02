import { Bot, Context, session } from 'grammy';
import { SessionFlavor } from 'grammy';
import { logger } from '../../utils/logger.js';
import { viewMessage } from '../../components/viewer/index.js';
import { getText } from '../phrases/phrases.js';
import { sender } from '../../components/sender/sender.js';
import { rateLimitHandler } from './rate-limit.js';
import { lang } from '../../utils/utils.js';

// const ADMIN_IDS = [];
const log = logger('Bot Service');

export type SessionData = {
  db: Record<string, unknown>;
};

export type BotContext = Context &
  SessionFlavor<{ db: Record<string, unknown> }>;

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

  bot.use(rateLimitHandler);

  // Install the conversations plugin.

  //Install menus

  bot.command('start', async (ctx) => {
    const [command, ...args] = ctx.update.message?.text?.split(' ') || [];
    if (!ctx.message?.chat?.id) {
      throw new Error('Invalid context: missing chat ID');
    }
    if (args.length > 0) {
      log.info(`start command ${command} with args ${args}`);

      await viewMessage(
        args[0],
        ctx,
        ctx.message.chat.id,
      );
    } else {
      log.info(`start command ${command} without args`);
      await ctx.api.sendMessage(
        ctx.update.message.chat.id,
        getText('welcome_message', lang(ctx)),
      );
    }
  });

  bot.on(':text', async (ctx: BotContext) => {
    await sender(ctx);
  });

  bot.catch(() => {
    log.error('bot error');
  });

  /**
   * Инжектим кастомные query разных модулей
   */

  bot.on('callback_query:data', async (ctx) => {
    console.log('Unknown button event with payload', ctx.callbackQuery.data);
    await ctx.answerCallbackQuery(); // remove loading animation
  });

  bot.catch(() => {
    log.error('bot error');
  });

  bot.start({
    onStart(botInfo) {
      log.info(`Bot starts as ${botInfo.username}`);
    },
  });

  return { bot };
}
