import { getMessage, removeMessage } from '../../utils/database.js';
import { logger } from '../../utils/logger.js';
import { MessageStructure } from './types.js';

const log = logger('Reader Service');

export async function viewMessage(id: string): Promise<string> {
  log.info('readMessage');

  try {
    const message = await getMessage<MessageStructure>(id);
    await removeMessage(id);
    return message.text;
  } catch (error) {
    return 'Сообщение не существует или уже было прочитано';
  }
}
