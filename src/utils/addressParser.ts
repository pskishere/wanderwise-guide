interface ParsedAddress {
  name: string
  phone: string
  detail: string
}

export const parseAddress = (text: string): ParsedAddress => {
  // 预处理文本：统一处理换行、多余空格等
  const processedText = text
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/，/g, ',')
    .replace(/。/g, ',')
    .replace(/、/g, ',')
    .replace(/\|/g, ',')
    .replace(/\*/g, ',')
    .replace(/\//g, ',')
    .replace(/\\/g, ',')
    .replace(/\t/g, ',')
    .replace(/\s/g, ',')
    .replace(/,+/g, ',')

  // 提取手机号 (支持前后可能的空格)
  const phoneRegex = /(?:[\s,]|^)(1[3-9]\d{9})(?:[\s,]|$)/
  const phone = processedText.match(phoneRegex)?.[1] || ""
  
  // 提取姓名 (支持更多情况：空格分隔、顿号分隔等)
  const nameRegex = new RegExp(
    `(收货人[:：]?\\s*)?([\\u4e00-\\u9fa5]{2,4})[,，\\s]*(?:${phone}|电话|手机|联系方式|收货人|收件人)|` +
    `(?:${phone})[,，\\s]*(收货人[:：]?\\s*)?([\\u4e00-\\u9fa5]{2,4})|` +
    `(收货人[:：]?\\s*)?([\\u4e00-\\u9fa5]{2,4})(?=\\s*[,，]|$)`
  )
  const nameMatch = processedText.match(nameRegex)
  const name = (nameMatch?.[2] || nameMatch?.[4] || nameMatch?.[6] || "").trim()

  // 提取详细地址
  let detail = processedText
    .replace(new RegExp(`收货人[:：]?\\s*${name}|${name}`, 'g'), '')
    .replace(new RegExp(`电话[:：]?\\s*${phone}|${phone}`, 'g'), '')
    .replace(/收货人|收件人|电话|手机|联系方式|详细地址|地址/g, '')
    .replace(/[,，。、\s]/g, '')
    .trim()

  // 如果详细地址为空，尝试提取数字门牌号
  if (!detail) {
    const numberMatch = processedText.match(/\d+号?楼?/)
    if (numberMatch) {
      detail = numberMatch[0]
    }
  }

  return { 
    name, 
    phone,
    detail: detail || "" 
  }
}