import { Bot, Context, session } from 'grammy';
import { logger } from '../utils/logger.js';
import { viewMessage } from '../components/viewer/index.js';

const ADMIN_IDS = [];
const log = logger('Bot Service');

export type SessionData = {
  db: {};
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
      const resp = await viewMessage(args[0]);

      log.info('getMessage', resp);
      await ctx.api.sendMessage(ctx.update.message.chat.id, resp);
    } else {
      log.info(`start command ${command} without args`);
      await ctx.api.sendMessage(ctx.update.message.chat.id, 'Hello');
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
