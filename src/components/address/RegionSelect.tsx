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
  const [provinces, setProvinces] = useState(getProvinces())
  const [cities, setCities] = useState(province ? getCitiesByProvince(province) : [])
  const [districts, setDistricts] = useState(city ? getDistrictsByCity(city) : [])

  // Update cities when province changes
  useEffect(() => {
    if (province) {
      setCities(getCitiesByProvince(province))
      // Reset city and district when province changes
      if (city) {
        onCityChange("")
        onDistrictChange("")
      }
    } else {
      setCities([])
      setDistricts([])
    }
  }, [province])

  // Update districts when city changes
  useEffect(() => {
    if (city) {
      setDistricts(getDistrictsByCity(city))
      // Reset district when city changes
      if (district) {
        onDistrictChange("")
      }
    } else {
      setDistricts([])
    }
  }, [city])

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label>省份</Label>
        <Select value={province} onValueChange={onProvinceChange}>
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
        <Select value={city} onValueChange={onCityChange} disabled={!province}>
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