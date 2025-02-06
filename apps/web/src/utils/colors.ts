// Vibrant and cute color palette
export const gradients = [
  ['#FF6B6B', '#FFE66D'], // Coral to Sunny Yellow
  ['#4ECDC4', '#45B7D1'], // Mint to Sky Blue
  ['#FF69B4', '#FFB6C1'], // Hot Pink to Light Pink
  ['#A6C1EE', '#FBC2EB'], // Lavender to Soft Pink
  ['#42E695', '#3BB2B8'], // Lime to Turquoise
  ['#FFB347', '#FFCC33'], // Orange to Golden
  ['#B24592', '#F15F79'], // Purple to Rose
  ['#66CCFF', '#33CCFF'], // Light Blue to Cyan
  ['#FF9AA2', '#FFB7B2'], // Pastel Pink to Pastel Peach
  ['#FFDAC1', '#E2F0CB'], // Pastel Orange to Pastel Green
  ['#B5EAD7', '#C7CEEA'], // Pastel Mint to Pastel Blue
  ['#FF85A1', '#FFA3A3'], // Bright Pink to Soft Coral
  ['#FFC3A0', '#FFAFBD'], // Peach to Pink
  ['#FF677D', '#FFD6A5'], // Watermelon to Pastel Orange
  ['#A0E7E5', '#FFAEBC'], // Pastel Turquoise to Pastel Pink
  ['#B4F8C8', '#A0E7E5'], // Pastel Green to Pastel Turquoise
  ['#FBE7C6', '#B4F8C8'], // Pastel Yellow to Pastel Green
  ['#FFABE1', '#DDD6F3'], // Cotton Candy Pink to Lavender
  ['#89CFF0', '#FCBAD3'], // Baby Blue to Baby Pink
  ['#F0E68C', '#FFA07A'], // Khaki to Light Salmon
] as const

export function getRandomGradient(
  index: number = Math.floor(Math.random() * gradients.length),
) {
  return `linear-gradient(135deg, ${gradients[index % gradients.length].join(', ')})`
}
