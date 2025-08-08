export function getCardBrand(cardNumber: string): string {
  const num = cardNumber.replace(/\D/g, "");
  if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(num)) return "Visa";
  if (/^5[1-5][0-9]{14}$/.test(num)) return "MasterCard";
  if (/^3[47][0-9]{13}$/.test(num)) return "American Express";
  if (/^6(?:011|5[0-9]{2})[0-9]{12}$/.test(num)) return "Discover";
  return "Card";
}
