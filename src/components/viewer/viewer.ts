import { getMessage, removeMessage } from '../../utils/database.js';
import { MessageStructure } from './types.js';
import { logger } from '../../utils/logger.js';
import { sendWithRemover } from '../remover/remove.js';
import { getText } from '../../services/phrases/phrases.js';
import { LanguageCode } from 'grammy/types';
import { BotContext } from '../../services/bot/bot.js';
import { lang } from '../../utils/utils.js';

const log = logger('Reader Service');

const REMOVE_TIMEOUT = 1000 * 60 * 5; // 5 minutes
const REMOVE_TIMEOUT_HUMAN = 5; // 5 minutes

export async function viewMessage(
  id: string,
  ctx: BotContext,
  chatId: number,
): Promise<void> {
  log.info('readMessage');
  const text = await getOneTimeMessageText(id, lang(ctx));
  const mes = getText('otm_message', lang(ctx), [text, REMOVE_TIMEOUT_HUMAN]);

  await removeMessage(id);

  sendWithRemover(
    {
      ctx,
      mes,
      chatId,
      timeout: REMOVE_TIMEOUT,
    },
    {
      parse_mode: 'markdownV2',
    },
  );
}

async function getOneTimeMessageText(
  id: string,
  lang: LanguageCode,
): Promise<string> {
  try {
    const message = await getMessage<MessageStructure>(id);
    if (!message) {
      throw new Error('Message is null or undefined');
    }
    return message.text;
  } catch {
    return getText('message_not_found', lang);
  }
}
