import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { getProvinces, getCitiesByProvince, getDistrictsByCity } from "@/utils/addressData"
import { useEffect, useState } from "react"

interface RegionSelectProps {
  province: string
  city: string
  district: string
  onProvinceChange: (value: string) => void
  onCityChange: (value: string) => void
  onDistrictChange: (value: string) => void
}

export function RegionSelect({
  province,
  city,
  district,
  onProvinceChange,
  onCityChange,
  onDistrictChange
}: RegionSelectProps) {
  const [provinces] = useState(getProvinces())
  const [cities, setCities] = useState<Array<{ code: string; name: string }>>([])
  const [districts, setDistricts] = useState<Array<{ code: string; name: string }>>([])

  // 初始化城市和区县数据
  useEffect(() => {
    if (province) {
      setTimeout(() => {
        const citiesData = getCitiesByProvince(province)
        setCities(citiesData)
        
        if (city) {
          const districtsData = getDistrictsByCity(city)
          setDistricts(districtsData)
        }
      }, 2)
    }
  }, [])

  // 当省份改变时更新城市列表
  const handleProvinceChange = (value: string) => {
    onProvinceChange(value)
    setTimeout(() => {
      const citiesData = getCitiesByProvince(value)
      setCities(citiesData)
      setDistricts([])
      onCityChange("")
      onDistrictChange("")
    }, 2)
  }

  // 当城市改变时更新区县列表
  const handleCityChange = (value: string) => {
    onCityChange(value)
    setTimeout(() => {
      const districtsData = getDistrictsByCity(value)
      setDistricts(districtsData)
      onDistrictChange("")
    }, 2)
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label>省份</Label>
        <Select value={province} onValueChange={handleProvinceChange}>
          <SelectTrigger>
            <SelectValue placeholder="请选择" />
          </SelectTrigger>
          <SelectContent>
            {provinces.map(province => (
              <SelectItem key={province.code} value={province.code}>
                {province.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>城市</Label>
        <Select value={city} onValueChange={handleCityChange} disabled={!province}>
          <SelectTrigger>
            <SelectValue placeholder="请选择" />
          </SelectTrigger>
          <SelectContent>
            {cities.map(city => (
              <SelectItem key={city.code} value={city.code}>
                {city.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>区县</Label>
        <Select value={district} onValueChange={onDistrictChange} disabled={!city}>
          <SelectTrigger>
            <SelectValue placeholder="请选择" />
          </SelectTrigger>
          <SelectContent>
            {districts.map(district => (
              <SelectItem key={district.code} value={district.code}>
                {district.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}