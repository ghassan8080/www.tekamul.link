import { useTranslation } from "@/app/i18n"

export async function Footer({ lang }: { lang: string }) {
  const { t } = await useTranslation(lang)

  return (
    <footer className="bg-secondary py-8">
      <div className="container mx-auto px-4 text-center">
        <p>{t("footer.copyright")}</p>
      </div>
    </footer>
  )
}
