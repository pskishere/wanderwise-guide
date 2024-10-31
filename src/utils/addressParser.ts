interface ParsedAddress {
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
}

export const parseAddress = (text: string, provinces: string[], cities: Record<string, string[]>, districts: Record<string, string[]>): ParsedAddress => {
  // 提取手机号
  const phoneRegex = /1[3-9]\d{9}/
  const phone = text.match(phoneRegex)?.[0] || ""
  
  // 提取姓名 (假设姓名在手机号前后的2-4个字符)
  const nameRegex = new RegExp(`(.{2,4}).*${phone}|${phone}.*?(.{2,4})`)
  const nameMatch = text.match(nameRegex)
  const name = (nameMatch?.[1] || nameMatch?.[2] || "").trim()

  // 提取省市区
  let province = ""
  let city = ""
  let district = ""
  
  for (const p of provinces) {
    if (text.includes(p)) {
      province = p
      const citiesInProvince = cities[p]
      for (const c of citiesInProvince) {
        if (text.includes(c)) {
          city = c
          const districtsInCity = districts[c]
          for (const d of districtsInCity) {
            if (text.includes(d)) {
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

  // 提取详细地址
  let detail = text
    .replace(phone, "")
    .replace(name, "")
    .replace(province, "")
    .replace(city, "")
    .replace(district, "")
    .replace(/[,，。\s]/g, "")
    .trim()

  return { name, phone, province, city, district, detail }
}