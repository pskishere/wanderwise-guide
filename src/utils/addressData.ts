import provinceData from 'province-city-china/dist/province.json'
import cityData from 'province-city-china/dist/city.json'
import areaData from 'province-city-china/dist/area.json'

export interface AddressData {
  code: string
  name: string
}

interface ProvinceData {
  code: string
  name: string
}

interface CityData {
  code: string
  name: string
  province: string // This is the province code
}

interface AreaData {
  code: string
  name: string
  city: string // This is the city code
}

// 获取所有省份
export const getProvinces = (): AddressData[] => {
  if (!Array.isArray(provinceData)) {
    console.error('Province data is not available')
    return []
  }
  
  return (provinceData as ProvinceData[]).map(item => ({
    code: String(item.code),
    name: item.name
  }))
}

// 根据省份代码获取城市
export const getCitiesByProvince = (provinceCode: string): AddressData[] => {
  if (!Array.isArray(cityData)) {
    console.error('City data is not available')
    return []
  }

  return (cityData as CityData[])
    .filter(item => String(item.province) === provinceCode)
    .map(item => ({
      code: String(item.code),
      name: item.name
    }))
}

// 根据城市代码获取区县
export const getDistrictsByCity = (cityCode: string): AddressData[] => {
  if (!Array.isArray(areaData)) {
    console.error('District data is not available')
    return []
  }

  return (areaData as AreaData[])
    .filter(item => String(item.city) === cityCode)
    .map(item => ({
      code: String(item.code),
      name: item.name
    }))
}

// 根据代码获取名称
export const getNameByCode = (code: string): string => {
  if (!code) return ''
  
  const allData = [
    ...(Array.isArray(provinceData) ? provinceData : []),
    ...(Array.isArray(cityData) ? cityData : []),
    ...(Array.isArray(areaData) ? areaData : [])
  ]
  
  return allData.find(item => String(item.code) === code)?.name || ''
}