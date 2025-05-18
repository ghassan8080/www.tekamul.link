import { useTranslation } from "@/app/i18n"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { languages } from "@/app/i18n/settings"
import { Cloud, FileCode, Settings, Github, GitlabIcon as GitlabLogo, BarChart, LineChart } from "lucide-react"

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }))
}

export default async function ServicesPage({
  params: { lang },
}: {
  params: { lang: string }
}) {
  const { t } = await useTranslation(lang)

  const services = [
    {
      category: "iac",
      tools: [
        { name: "Terraform", icon: <FileCode className="text-purple-600" size={28} /> },
        { name: "Ansible", icon: <Settings className="text-red-600" size={28} /> },
      ],
    },
    {
      category: "cicd",
      tools: [
        { name: "GitHub Actions", icon: <Github className="text-blue-600" size={28} /> },
        { name: "GitLab CI", icon: <GitlabLogo className="text-orange-600" size={28} /> },
      ],
    },
    {
      category: "monitoring",
      tools: [
        { name: "Prometheus", icon: <BarChart className="text-orange-600" size={28} /> },
        { name: "Grafana", icon: <LineChart className="text-green-600" size={28} /> },
      ],
    },
    {
      category: "cloud",
      tools: [
        { name: "AWS", icon: <Cloud className="text-yellow-600" size={28} /> },
        { name: "Azure", icon: <Cloud className="text-blue-600" size={28} /> },
        { name: "GCP", icon: <Cloud className="text-red-600" size={28} /> },
      ],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-4">{t("services.title")}</h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">{t("services.subtitle")}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service) => (
          <Card key={service.category} className="overflow-hidden">
            <CardHeader className="bg-blue-50">
              <CardTitle>{t(`services.${service.category}.title`)}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="mb-6">{t(`services.${service.category}.description`)}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {service.tools.map((tool) => (
                  <div key={tool.name} className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                      {tool.icon}
                    </div>
                    <span className="text-sm font-medium">{tool.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
