import { LangStore } from './types.js';

const welcome_message = `
¡Bot de mensajes de una sola vez!

🔐 Está diseñado para que el destinatario pueda leer el mensaje solo una vez. Después de leerlo, el mensaje se eliminará. Si el destinatario de tu mensaje no pudo recibirlo, significa que alguien más lo leyó. 🕵️‍♂️

📩 ¿Cómo enviar un mensaje?

1️⃣ Envía cualquier mensaje de texto al bot 🖱️
2️⃣ El bot te devolverá un enlace 🔗, que debes enviar al destinatario de tu mensaje. Una vez que el destinatario lea el mensaje, este será eliminado. ✨

Puedes enviar archivos multimedia utilizando las funciones integradas de Telegram. 📸

🔒 No almacenamos tus mensajes después de que se leen, por lo que no es posible recuperarlos. 📪 Los mensajes no leídos se almacenan en un formato modificado, lo que dificulta su lectura en caso de una filtración de datos. 🚫 No almacenamos tus mensajes después de que se leen, por lo que no es posible recuperarlos. Los mensajes no leídos se almacenan en un formato modificado, lo que dificulta su lectura en caso de una filtración de datos, pero el envío de datos sensibles se realiza bajo tu propio riesgo. ⚠️ Tal vez sea mejor dividir la información sensible en varios mensajes. 📜

¡Tienes derecho al anonimato!
`;

export const es_store: LangStore = {
  welcome_message,
  not_chat_warning:
    '⚠️ Estás enviando mensajes al bot en privado, tales mensajes no pueden ser eliminados por el bot. Por favor, agrega el bot a un grupo para evitar ver tales mensajes nuevamente.',
  participants_count_error:
    '🚫 Hay más de 2 participantes en el grupo, el bot no funcionará aquí.',
  message_not_found: '⚠️ Mensaje no encontrado, podría haber sido leído.',
  message_rate_limit:
    '⚠️ Estás enviando mensajes con demasiada frecuencia, por favor intenta nuevamente más tarde.',
  message_impossible_remove:
    '⚠️ No se pudo eliminar el mensaje, tal vez enviaste un mensaje al bot en privado, o el bot no es administrador del grupo. Por favor, elimínalo manualmente.',
  otm_link_message: (link) =>
    `🔗 Enlace al mensaje de una sola vez \\(haz clic para copiar\\): \n\n \`\`\` ${link} \`\`\``,
  otm_message: (message, timeout) =>
    `Enviaste un mensaje. Se eliminará automáticamente en ${timeout} minutos: \n\n \`\`\` ${message} \`\`\``,
};
