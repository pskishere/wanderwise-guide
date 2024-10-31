import { provinceData as rawProvinceData, cityData as rawCityData, areaData as rawAreaData } from 'province-city-china/dist/data'

export interface AddressData {
  code: string
  name: string
}

// 获取所有省份
export const getProvinces = (): AddressData[] => {
  if (!Array.isArray(rawProvinceData)) {
    console.error('Province data is not available')
    return []
  }
  
  return rawProvinceData.map(item => ({
    code: item.code,
    name: item.name
  }))
}

// 根据省份代码获取城市
export const getCitiesByProvince = (provinceCode: string): AddressData[] => {
  if (!Array.isArray(rawCityData)) {
    console.error('City data is not available')
    return []
  }

  return rawCityData
    .filter(item => item.province === provinceCode)
    .map(item => ({
      code: item.code,
      name: item.name
    }))
}

// 根据城市代码获取区县
export const getDistrictsByCity = (cityCode: string): AddressData[] => {
  if (!Array.isArray(rawAreaData)) {
    console.error('District data is not available')
    return []
  }

  return rawAreaData
    .filter(item => item.city === cityCode)
    .map(item => ({
      code: item.code,
      name: item.name
    }))
}

// 根据代码获取名称
export const getNameByCode = (code: string): string => {
  if (!code) return ''
  
  const allData = [
    ...(Array.isArray(rawProvinceData) ? rawProvinceData : []),
    ...(Array.isArray(rawCityData) ? rawCityData : []),
    ...(Array.isArray(rawAreaData) ? rawAreaData : [])
  ]
  
  return allData.find(item => item.code === code)?.name || ''
}