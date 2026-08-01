// Edite este número para o WhatsApp oficial da M7 Movelaria
export const WHATSAPP_NUMBER = "5541987116308";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
