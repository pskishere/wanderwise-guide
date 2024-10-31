import { provinceData, cityData, areaData } from 'province-city-china/data'

export interface AddressData {
  code: string
  name: string
}

// 获取所有省份
export const getProvinces = (): AddressData[] => {
  return provinceData.map(item => ({
    code: item.code,
    name: item.name
  }))
}

// 根据省份代码获取城市
export const getCitiesByProvince = (provinceCode: string): AddressData[] => {
  return cityData
    .filter(item => item.province === provinceCode)
    .map(item => ({
      code: item.code,
      name: item.name
    }))
}

// 根据城市代码获取区县
export const getDistrictsByCity = (cityCode: string): AddressData[] => {
  return areaData
    .filter(item => item.city === cityCode)
    .map(item => ({
      code: item.code,
      name: item.name
    }))
}

// 根据代码获取名称
export const getNameByCode = (code: string): string => {
  const allData = [...provinceData, ...cityData, ...areaData]
  return allData.find(item => item.code === code)?.name || ''
}