import { BotContext } from '../../services/bot/bot';
import { getText } from '../../services/phrases/phrases';
import { setMessage } from '../../utils/database';
import { remover, sendWithRemover } from '../remover/remove';
import { customAlphabet } from 'nanoid';
import { lang } from '../../utils/utils';

export const sender = async (ctx: BotContext): Promise<void> => {
  const chatId = ctx.chat?.id;
  const message = ctx.message?.text;
  const messageId = ctx.message?.message_id;
  if (!chatId || !message || !messageId) {
    throw new Error('Invalid context: missing chat or message details');
  }
  const botUsername = ctx.me.username;

  /**
   * Проверяем где с ботом общаются
   */
  if (chatId > 0) {
    const mes = getText('not_chat_warning', lang(ctx));
    sendWithRemover({ ctx, mes, chatId });
  }

  if (chatId < 0) {
    const count = await ctx.api.getChatMemberCount(chatId);
    if (count > 2) {
      ctx.api.sendMessage(chatId, '').then(({ message_id }) => {
        remover(chatId, message_id);
      });
      const mes = getText('participants_count_error', lang(ctx));
      sendWithRemover({ ctx, mes, chatId });
      return;
    }
  }

  //удаляем исходное сообщение
  remover(chatId, messageId, 1000 * 5);

  const nanoid = customAlphabet('1234567890abcdef', 10);
  const otmId = nanoid();

  await setMessage(otmId, message);

  sendWithRemover({
    ctx,
    mes: getOtLink(botUsername, otmId),
    chatId,
  });
};

const getOtLink = (botUsername: string, otmId: string): string =>
  `https://t.me/${botUsername}?start=${otmId}`;
