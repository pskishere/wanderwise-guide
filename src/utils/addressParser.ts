interface ParsedAddress {
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
}

export const parseAddress = (text: string, provinces: string[], cities: Record<string, string[]>, districts: Record<string, string[]>): ParsedAddress => {
  // 预处理文本：统一处理换行、多余空格等
  const processedText = text
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  // 提取手机号 (支持前后可能的空格)
  const phoneRegex = /\s*(1[3-9]\d{9})\s*/
  const phone = text.match(phoneRegex)?.[1] || ""
  
  // 提取姓名 (支持更多情况：空格分隔、顿号分隔等)
  const nameRegex = new RegExp(`([\u4e00-\u9fa5]{2,4})[,，\s]*${phone}|${phone}[,，\s]*([\u4e00-\u9fa5]{2,4})`)
  const nameMatch = processedText.match(nameRegex)
  const name = (nameMatch?.[1] || nameMatch?.[2] || "").trim()

  // 提取省市区 (优化匹配逻辑，避免部分匹配)
  let province = ""
  let city = ""
  let district = ""
  
  // 按长度降序排序地址单位，避免部分匹配
  const sortedProvinces = [...provinces].sort((a, b) => b.length - a.length)
  
  for (const p of sortedProvinces) {
    if (processedText.includes(p)) {
      province = p
      const citiesInProvince = [...cities[p]].sort((a, b) => b.length - a.length)
      for (const c of citiesInProvince) {
        if (processedText.includes(c)) {
          city = c
          const districtsInCity = [...districts[c]].sort((a, b) => b.length - a.length)
          for (const d of districtsInCity) {
            if (processedText.includes(d)) {
              district = d
              break
            }
          }
          break
        }
      }
      break
    }
  }

  // 提取详细地址 (优化清理逻辑)
  let detail = processedText
    .replace(new RegExp(phone, 'g'), '')
    .replace(new RegExp(name, 'g'), '')
    .replace(new RegExp(province, 'g'), '')
    .replace(new RegExp(city, 'g'), '')
    .replace(new RegExp(district, 'g'), '')
    .replace(/[,，。、\s]/g, '')
    .trim()

  // 如果详细地址为空，尝试提取数字门牌号
  if (!detail) {
    const numberMatch = processedText.match(/\d+号?/)
    if (numberMatch) {
      detail = numberMatch[0]
    }
  }

  return { 
    name, 
    phone, 
    province, 
    city, 
    district, 
    detail: detail || "" 
  }
}