import { LangStore } from './types';

const welcome_message = `
¡Bot de mensajes de una sola vez!

🔐 Este bot permite que el destinatario lea el mensaje solo una vez. Después de leerlo, el mensaje será eliminado. Si el destinatario de tu mensaje no pudo recibirlo, significa que alguien más lo leyó. 🕵️‍♂️

📩 ¿Cómo enviar un mensaje?

1️⃣ Agrega el bot al grupo donde enviarás mensajes. 📢 Haz que el bot sea administrador con el derecho de eliminar mensajes en este grupo. (Esto es opcional, pero al comunicarse con el bot en el grupo, puede eliminar el mensaje original por sí mismo) 🧹 
2️⃣ Envía al bot el comando /send para enviar un mensaje. ✉️
3️⃣ El bot responderá con un mensaje que contiene el botón "Enviar mensaje". Haz clic en el botón para enviar el mensaje. 🖱️
4️⃣ El bot devolverá un enlace 🔗 que necesitas enviar al destinatario de tu mensaje. Después de que el destinatario lea el mensaje, será eliminado. ✨

🔒 No almacenamos tus mensajes después de que se lean, por lo que es imposible recuperarlos. 📪 Los mensajes no leídos se almacenan en una forma alterada, lo que dificulta su lectura en caso de una filtración de datos. 🚫 No almacenamos tus mensajes después de que se lean, por lo que es imposible recuperarlos. Los mensajes no leídos se almacenan en una forma alterada, lo que dificulta su lectura en caso de una filtración de datos, pero enviar datos sensibles es bajo tu propio riesgo. ⚠️ Podría valer la pena dividir la información sensible en varios mensajes. 📜

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
  message_impossible_remove: '⚠️ No se pudo eliminar el mensaje, tal vez enviaste un mensaje al bot en privado, o el bot no es administrador del grupo. Por favor, elimínalo manualmente.',
};