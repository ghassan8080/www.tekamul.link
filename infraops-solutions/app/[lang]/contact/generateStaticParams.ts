import { languages } from "@/app/i18n/settings"

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }))
}
