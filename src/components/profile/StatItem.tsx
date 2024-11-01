import { Link } from "react-router-dom"

interface StatItemProps {
  label: string
  count: string
  href: string
}

export const StatItem = ({ label, count, href }: StatItemProps) => {
  return (
    <Link 
      to={href}
      className="hover:bg-gray-50 rounded-xl py-2 transition-colors"
    >
      <div className="font-bold text-lg text-gray-900">
        {count}
      </div>
      <div className="text-xs text-gray-500 mt-0.5">
        {label}
      </div>
    </Link>
  )
}