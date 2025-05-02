import { LangStore } from './types.js';

const welcome_message = `
One-Time Message Bot!

🔐 Designed so that the recipient can read the message only once. After reading, the message will be deleted. If the recipient of your message could not receive it, it means someone else read it. 🕵️‍♂️

📩 How to send a message?

1️⃣ Add the bot to the group where you will send messages. 📢 Make the bot an administrator with permission to delete messages in that group. (This is not mandatory, but when interacting with the bot in the group, it can automatically delete the original message) 🧹
2️⃣ Send any text message to the bot 🖱️
4️⃣ The bot will return a link 🔗, which you need to send to the recipient of your message. Once the recipient reads the message, it will be deleted. ✨

You can send media files using Telegram's built-in functions. 📸

🔒 We do not store your messages after they are read, so it is impossible to recover them. 📪 Unread messages are stored in a modified format, making them harder to read in case of a data leak. 🚫 We do not store your messages after they are read, so it is impossible to recover them. Unread messages are stored in a modified format, making them harder to read in case of a data leak, but sending sensitive data is done at your own risk. ⚠️ It might be better to split sensitive information into several messages. 📜

You have the right to anonymity!
`;

export const en_store: LangStore = {
  welcome_message,
  not_chat_warning:
    '⚠️ You are messaging the bot in private messages, such messages cannot be deleted by the bot. Please add the bot to a group to avoid seeing such messages again.',
  participants_count_error:
    '🚫 There are more than 2 participants in the group, the bot will not work here.',
  message_not_found: '⚠️ Message not found, it might have been read.',
  message_rate_limit:
    '⚠️ You are sending messages too frequently, please try again later.',
  message_impossible_remove:
    '⚠️ Failed to delete the message, perhaps you messaged the bot privately, or the bot is not an admin of the group. Please delete it manually.',
  otm_link_message: (link) =>
    `🔗 Link to the one\\-time message \\(click to copy\\):  \n\n \`\`\` ${link} \`\`\``,
  otm_message: (message, timeout) =>
    `You sent a message\\. It will be automatically deleted in ${timeout} minutes: \n\n \`\`\` ${message} \`\`\``,
};
