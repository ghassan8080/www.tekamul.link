"use client"

import i18next from "i18next"
import { initReactI18next, useTranslation as useTranslationOrg } from "react-i18next"
import resourcesToBackend from "i18next-resources-to-backend"
import { getOptions } from "./settings"
import { useEffect, useState } from "react"

i18next
  .use(initReactI18next)
  .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
  .init(getOptions())

export function useTranslation(lng: string, ns = "translation") {
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (i18next.resolvedLanguage !== lng) {
      i18next.changeLanguage(lng).then(() => {
        setInitialized(true)
      })
    } else {
      setInitialized(true)
    }
  }, [lng])

  const ret = useTranslationOrg(ns)

  if (initialized) return ret

  return {
    ...ret,
    t: (key: string) => key,
  }
}
