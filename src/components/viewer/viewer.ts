import { Api, RawApi } from 'grammy';
import { getMessage, removeMessage } from '../../utils/database.js';
import { MessageStructure } from './types.js';
import { logger } from '../../utils/logger.js';
import { remover } from '../remover/remove.js';
import { getText } from '../../services/phrases/phrases.js';
import { LanguageCode } from 'grammy/types';

const log = logger('Reader Service');

export async function viewMessage(
  id: string,
  api: Api<RawApi>,
  chatId: number,
  lang = 'en',
): Promise<void> {
  log.info('readMessage');
  const text = await getOneTimeMessageText(id, lang);
  await removeMessage(id);
  const { message_id } = await api.sendMessage(chatId, text);

  remover(chatId, message_id);
}

async function getOneTimeMessageText(
  id: string,
  lang: string,
): Promise<string> {
  try {
    const message = await getMessage<MessageStructure>(id);
    return message.text;
  } catch (error) {
    return getText('message_not_found', lang as LanguageCode);
  }
}
