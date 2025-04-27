import { sender } from './sender';
import { getText } from '../../services/phrases/phrases';
import { setMessage } from '../../utils/database';
import { remover, sendWithRemover } from '../remover/remove';
import { customAlphabet } from 'nanoid';
import { lang } from '../../utils/utils';

jest.mock('../../services/phrases/phrases', () => ({
  getText: jest.fn(),
}));

jest.mock('../../utils/database', () => ({
  setMessage: jest.fn(),
}));

jest.mock('../remover/remove', () => ({
  remover: jest.fn(),
  sendWithRemover: jest.fn(),
}));

jest.mock('nanoid', () => ({
  customAlphabet: jest.fn(() => jest.fn(() => 'mockedNanoId')),
}));

jest.mock('../../utils/utils', () => ({
  lang: jest.fn(),
}));

describe('sender', () => {
  const mockCtx: any = {
    chat: { id: 123 },
    message: { text: 'Test message', message_id: 456 },
    me: { username: 'test_bot' },
    api: {
      getChatMemberCount: jest.fn(),
      sendMessage: jest.fn().mockResolvedValue({ message_id: 789 }),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if context is invalid', async () => {
    const invalidCtx: any = { chat: null, message: null };
    await expect(sender(invalidCtx)).rejects.toThrow('Invalid context: missing chat or message details');
  });

  it('should send a warning if chat is private', async () => {
    mockCtx.chat.id = 1; // Private chat
    (getText as jest.Mock).mockReturnValue('Private chat warning');

    await sender(mockCtx);

    expect(getText).toHaveBeenCalledWith('not_chat_warning', lang(mockCtx));
    expect(sendWithRemover).toHaveBeenCalledWith({
      ctx: mockCtx,
      mes: 'Private chat warning',
      chatId: 1,
    });
  });

  it('should send a warning if group has more than 2 members', async () => {
    mockCtx.chat.id = -1; // Group chat
    (mockCtx.api.getChatMemberCount as jest.Mock).mockResolvedValue(3);
    (getText as jest.Mock).mockReturnValue('Group member count error');

    await sender(mockCtx);

    expect(mockCtx.api.getChatMemberCount).toHaveBeenCalledWith(-1);
    expect(getText).toHaveBeenCalledWith('participants_count_error', lang(mockCtx));
    expect(sendWithRemover).toHaveBeenCalledWith({
      ctx: mockCtx,
      mes: 'Group member count error',
      chatId: -1,
    });
  });

  it('should delete the original message after a delay', async () => {
    mockCtx.chat.id = 123;
    mockCtx.message.message_id = 456;

    await sender(mockCtx);

    expect(remover).toHaveBeenCalledWith(123, 456, 5000);
  });

  it('should store the message and send a one-time link', async () => {
    mockCtx.chat.id = 123;
    mockCtx.message.text = 'Test message';
    mockCtx.me.username = 'test_bot';

    await sender(mockCtx);

    expect(setMessage).toHaveBeenCalledWith('mockedNanoId', 'Test message');
    expect(sendWithRemover).toHaveBeenCalledWith({
      ctx: mockCtx,
      mes: 'https://t.me/test_bot?start=mockedNanoId',
      chatId: 123,
    });
  });
});