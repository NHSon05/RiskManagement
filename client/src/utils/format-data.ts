import type { PestelItem, PestelRawData } from "@/types/pestel.type"

export const formatData = (
  rawData: any, 
  labelConfig: Record<string, string>
): PestelRawData[] => {
  if (!rawData) return []

  return Object.keys(labelConfig).map((key) => {
    const rawStringValue = rawData[key]
    let cleanedItems: PestelItem[] = []

    if (rawStringValue) {
      try {
        const parsedArray: string[] = JSON.parse(rawStringValue);
        cleanedItems = parsedArray.map((itemStr) => {
          const cleanText = itemStr
            .replace(/^"|"$/g, '')
            .replace(/\\"/g, '"')
            .trim();
          return { content: cleanText };
        })
      } catch (error) {
        console.error(`Lỗi parse data tại key [${key}]:`, error);
        cleanedItems = [];
      }
    }

    return {
      code: key,
      label: labelConfig[key] || key,
      items: cleanedItems
    }
  }).filter(item => item.items.length > 0);
}