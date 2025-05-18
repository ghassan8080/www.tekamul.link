import Link from "next/link"
import { useTranslation } from "../i18n"
import { Button } from "@/components/ui/button"

export default async function Home({
  params: { lang },
}: {
  params: { lang: string }
}) {
  const { t } = await useTranslation(lang)

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 max-w-4xl mx-auto leading-tight">{t("hero.title")}</h1>
          <Button asChild size="lg" className="mt-6 rounded-full">
            <Link href={`/${lang}/contact`}>{t("hero.cta")}</Link>
          </Button>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">{t("services.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard title={t("services.iac.title")} description={t("services.iac.description")} icon="server" />
            <ServiceCard
              title={t("services.cicd.title")}
              description={t("services.cicd.description")}
              icon="git-branch"
            />
            <ServiceCard
              title={t("services.monitoring.title")}
              description={t("services.monitoring.description")}
              icon="activity"
            />
            <ServiceCard title={t("services.cloud.title")} description={t("services.cloud.description")} icon="cloud" />
          </div>
          <Button asChild variant="outline" className="mt-12">
            <Link href={`/${lang}/services`}>{t("nav.services")}</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

function ServiceCard({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: string
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        {icon === "server" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-600"
          >
            <rect width="20" height="8" x="2" y="2" rx="2" ry="2"></rect>
            <rect width="20" height="8" x="2" y="14" rx="2" ry="2"></rect>
            <line x1="6" x2="6" y1="6" y2="6"></line>
            <line x1="6" x2="6" y1="18" y2="18"></line>
          </svg>
        )}
        {icon === "git-branch" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-600"
          >
            <line x1="6" x2="6" y1="3" y2="15"></line>
            <circle cx="18" cy="6" r="3"></circle>
            <circle cx="6" cy="18" r="3"></circle>
            <path d="M18 9a9 9 0 0 1-9 9"></path>
          </svg>
        )}
        {icon === "activity" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-600"
          >
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
        )}
        {icon === "cloud" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-600"
          >
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
          </svg>
        )}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
