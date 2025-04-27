import { LangStore } from './types';

const welcome_message = `
One-time message bot!

🔐 This bot allows the recipient to read the message only once. After reading, the message will be deleted. If the recipient of your message could not receive it, it means someone else read it. 🕵️‍♂️

📩 How to send a message?

1️⃣ Add the bot to the group where you will send messages. 📢 Make the bot an administrator with the right to delete messages in this group. (This is optional, but when communicating with the bot in the group, it can delete the original message itself) 🧹 
2️⃣ Send the bot the /send command to send a message. ✉️
3️⃣ The bot will reply with a message containing the "Send Message" button. Click the button to send the message. 🖱️
4️⃣ The bot will return a link 🔗 that you need to send to the recipient of your message. After the recipient reads the message, it will be deleted. ✨

🔒 We do not store your messages after they are read, so it is impossible to recover them. 📪 Unread messages are stored in an altered form, making it harder to read in case of a data leak. 🚫 We do not store your messages after they are read, so it is impossible to recover them. Unread messages are stored in an altered form, making it harder to read in case of a data leak, but sending sensitive data is at your own risk. ⚠️ It might be worth splitting sensitive information into several messages. 📜

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
};
