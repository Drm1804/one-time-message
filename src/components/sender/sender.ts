import { BotContext } from '../../services/bot/bot.js';
import { getText } from '../../services/phrases/phrases.js';
import { setMessage } from '../../utils/database.js';
import { remover, sendWithRemover } from '../remover/remove.js';
import { getUniqueId, lang } from '../../utils/utils.js';

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
  //TODO временно закоментировал, поскольку бот удаляет свои сообщения из чата
  // if (chatId > 0) {
  //   const mes = getText('not_chat_warning', lang(ctx));
  //   sendWithRemover({ ctx, mes, chatId });
  // }

  /**
   * Если бот в группе, проверяем сколько в ней человек
   * Если больше 2 то выходим, это не секурно
   */
  if (chatId < 0) {
    const count = await ctx.api.getChatMemberCount(chatId);
    if (count > 2) {
      ctx.api.sendMessage(chatId, '').then(({ message_id }) => {
        remover(chatId, message_id, lang(ctx));
      });
      const mes = getText('participants_count_error', lang(ctx));
      sendWithRemover({ ctx, mes, chatId });
      return;
    }
  }

  //удаляем исходное сообщение
  remover(chatId, messageId, lang(ctx), 1000 * 5);

  const otmId = getUniqueId(12);
  await setMessage(otmId, message);
  const mes = getText('otm_link_message', lang(ctx), [
    getOtLink(botUsername, otmId),
  ]);
  sendWithRemover(
    {
      ctx,
      mes,
      chatId,
    },
    {
      parse_mode: 'markdownV2',
    },
  );
};

const getOtLink = (botUsername: string, otmId: string): string =>
  `https://t.me/${botUsername}?start=${otmId}`;
