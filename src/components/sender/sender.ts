import { LanguageCode } from 'grammy/types';
import { BotContext } from '../../services/bot.js';
import { getText } from '../../services/phrases/phrases.js';
import { setMessage } from '../../utils/database.js';
import { remover } from '../remover/remove.js';
import { customAlphabet } from 'nanoid';

export const sender = async (ctx: BotContext): Promise<void> => {
  const chatId = ctx.chat.id;
  const message = ctx.message.text;
  const messageId = ctx.message.message_id;
  const botUsername = ctx.me.username;

  /**
   * Проверяем где с ботом общаются
   */
  if (chatId > 0) {
    const mes = getText(
      'not_chat_warning',
      ctx.me.language_code as LanguageCode,
    );
    sendWithRemover({ ctx, mes, chatId });
  }

  if (chatId < 0) {
    const count = await ctx.api.getChatMemberCount(chatId);
    if (count > 2) {
      ctx.api.sendMessage(chatId, '').then(({ message_id }) => {
        remover(chatId, message_id);
      });
      const mes = getText(
        'participants_count_error',
        ctx.me.language_code as LanguageCode,
      );
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

type SendWithRemover = {
  ctx: BotContext;
  mes: string;
  chatId: number;
  timeout?: number;
};

const getOtLink = (botUsername: string, otmId: string): string =>
  `https://t.me/${botUsername}?start=${otmId}`;

const sendWithRemover = (params: SendWithRemover): void => {
  const { ctx, mes, chatId, timeout } = params;
  ctx.api.sendMessage(chatId, mes).then(({ message_id }) => {
    remover(chatId, message_id, timeout);
  });
};
