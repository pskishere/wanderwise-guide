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

  // 提取省市区 (优化匹配逻辑，避免部分匹配)
  let province = ""
  let city = ""
  let district = ""
  
  // 按长度降序排序地址单位，避免部分匹配
  const sortedProvinces = [...provinces].sort((a, b) => b.length - a.length)
  
  // 尝试匹配完整的省市区格式
  const fullAddressRegex = /([^省]+省|北京|天津|上海|重庆|内蒙古|广西|西藏|宁夏|新疆)?([^市]+市|自治州|地区|盟)?([^县区]+县|区|旗)?/
  const fullAddressMatch = processedText.match(fullAddressRegex)

  if (fullAddressMatch) {
    const [_, matchedProvince, matchedCity, matchedDistrict] = fullAddressMatch

    // 匹配省份
    if (matchedProvince) {
      for (const p of sortedProvinces) {
        if (matchedProvince.includes(p)) {
          province = p
          break
        }
      }
    }

    // 匹配城市
    if (province && matchedCity) {
      const citiesInProvince = [...cities[province]].sort((a, b) => b.length - a.length)
      for (const c of citiesInProvince) {
        if (matchedCity.includes(c)) {
          city = c
          break
        }
      }
    }

    // 匹配区县
    if (city && matchedDistrict) {
      const districtsInCity = [...districts[city]].sort((a, b) => b.length - a.length)
      for (const d of districtsInCity) {
        if (matchedDistrict.includes(d)) {
          district = d
          break
        }
      }
    }
  }

  // 如果上面的匹配失败，尝试逐个匹配
  if (!province) {
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
  }

  // 提取详细地址 (优化清理逻辑)
  let detail = processedText
    .replace(new RegExp(`收货人[:：]?\\s*${name}|${name}`, 'g'), '')
    .replace(new RegExp(`电话[:：]?\\s*${phone}|${phone}`, 'g'), '')
    .replace(new RegExp(province, 'g'), '')
    .replace(new RegExp(city, 'g'), '')
    .replace(new RegExp(district, 'g'), '')
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
    province, 
    city, 
    district, 
    detail: detail || "" 
  }
}