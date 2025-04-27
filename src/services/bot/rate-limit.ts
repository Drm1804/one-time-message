import { NextFunction } from 'grammy';
import { BotContext } from './bot.js';
import { getText } from '../phrases/phrases.js';
import { lang } from '../../utils/utils.js';
import { remover, sendWithRemover } from '../../components/remover/remove.js';
const RATE_LIMIT_TIME = 10000; // 10 seconds

export const rateLimit = new Map<number, number>();

export async function rateLimitHandler(
  ctx: BotContext,
  next: NextFunction,
): Promise<void> {
  const userId = ctx.from?.id;
  if (!userId) {
    return await next();
  }

  const isStartCommand = ctx.message.text.startsWith('/start');

  if (isStartCommand) {
    return await next();
  }

  const now = Date.now();
  const lastMessageTime = rateLimit.get(userId) || 0;

  if (now - lastMessageTime < RATE_LIMIT_TIME) {
    const mes = getText('message_rate_limit', lang(ctx));
    const chatId = ctx.message.chat.id;
    remover(ctx.message.chat.id, ctx.message.message_id);
    sendWithRemover({ ctx, mes, chatId });
    return;
  }

  rateLimit.set(userId, now);
  await next();
}
