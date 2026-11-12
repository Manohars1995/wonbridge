export const CURRENCY_MAP: Record<string, { symbol: string; rate: number; decimals: number }> = {
  en:      { symbol: "$",    rate: 83,   decimals: 0 }, // USD
  es:      { symbol: "€",    rate: 90,   decimals: 0 }, // EUR
  fr:      { symbol: "€",    rate: 90,   decimals: 0 }, // EUR
  de:      { symbol: "€",    rate: 90,   decimals: 0 }, // EUR
  pt:      { symbol: "€",    rate: 90,   decimals: 0 }, // EUR
  ar:      { symbol: "AED ", rate: 22.6, decimals: 0 }, // UAE Dirham
  hi:      { symbol: "₹",    rate: 1,    decimals: 0 }, // INR (base)
  ja:      { symbol: "¥",    rate: 0.56, decimals: 0 }, // JPY
  ru:      { symbol: "₽",    rate: 0.90, decimals: 0 }, // RUB
  "zh-CN": { symbol: "¥",    rate: 11.5, decimals: 0 }, // CNY
};

function ceilToDecimals(num: number, decimals: number) {
  const factor = 10 ** decimals;
  return Math.ceil(num * factor) / factor;
}

export function formatPrice(amountINR: number, langCode: string): string {
  const currency = CURRENCY_MAP[langCode] || CURRENCY_MAP.en;
  const converted = amountINR / currency.rate;
  const rounded = ceilToDecimals(converted, currency.decimals);
  return `${currency.symbol}${rounded.toFixed(currency.decimals)}`;
}