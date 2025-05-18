import { generateStaticParams as generateStaticParamsService } from "../services/page"
import ContactPageClient from "./ContactPageClient"

export const generateStaticParams = generateStaticParamsService

export default function ContactPage({
  params: { lang },
}: {
  params: { lang: string }
}) {
  return <ContactPageClient lang={lang} />
}
