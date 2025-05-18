"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useTranslation } from "@/app/i18n/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Send, X } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  text: string
  isUser: boolean
}

// Simple predefined answers for the chatbot
const getAnswer = (question: string, lang: string): string => {
  const lowerQuestion = question.toLowerCase()

  // English responses
  if (lang === "en") {
    if (lowerQuestion.includes("terraform") || lowerQuestion.includes("ansible") || lowerQuestion.includes("iac")) {
      return "We use Terraform and Ansible to automate infrastructure deployment. This helps reduce errors and speeds up provisioning."
    } else if (
      lowerQuestion.includes("ci") ||
      lowerQuestion.includes("cd") ||
      lowerQuestion.includes("pipeline") ||
      lowerQuestion.includes("github") ||
      lowerQuestion.includes("gitlab")
    ) {
      return "Our CI/CD pipeline services use GitHub Actions and GitLab CI to automate your software delivery process, ensuring faster and more reliable deployments."
    } else if (
      lowerQuestion.includes("monitor") ||
      lowerQuestion.includes("prometheus") ||
      lowerQuestion.includes("grafana")
    ) {
      return "We set up comprehensive monitoring solutions using Prometheus and Grafana to give you real-time insights into your infrastructure performance."
    } else if (
      lowerQuestion.includes("cloud") ||
      lowerQuestion.includes("aws") ||
      lowerQuestion.includes("azure") ||
      lowerQuestion.includes("gcp")
    ) {
      return "We provide multi-cloud solutions across AWS, Azure, and GCP, helping you leverage the best of each platform or migrate between them."
    } else if (lowerQuestion.includes("price") || lowerQuestion.includes("cost") || lowerQuestion.includes("quote")) {
      return "Our pricing depends on your specific needs. Please contact us through the contact form for a personalized quote."
    } else if (lowerQuestion.includes("contact") || lowerQuestion.includes("talk") || lowerQuestion.includes("call")) {
      return "You can reach us through the contact form on our website. We'll get back to you as soon as possible."
    } else {
      return "Thank you for your question. For more specific information, please contact our team through the contact form."
    }
  }
  // Arabic responses
  else {
    if (lowerQuestion.includes("terraform") || lowerQuestion.includes("ansible") || lowerQuestion.includes("iac")) {
      return "نستخدم Terraform و Ansible لأتمتة نشر البنية التحتية. هذا يساعد على تقليل الأخطاء وتسريع عملية التوفير."
    } else if (
      lowerQuestion.includes("ci") ||
      lowerQuestion.includes("cd") ||
      lowerQuestion.includes("pipeline") ||
      lowerQuestion.includes("github") ||
      lowerQuestion.includes("gitlab")
    ) {
      return "تستخدم خدمات خط أنابيب CI/CD لدينا GitHub Actions و GitLab CI لأتمتة عملية تسليم البرامج الخاصة بك، مما يضمن عمليات نشر أسرع وأكثر موثوقية."
    } else if (
      lowerQuestion.includes("monitor") ||
      lowerQuestion.includes("prometheus") ||
      lowerQuestion.includes("grafana")
    ) {
      return "نقوم بإعداد حلول مراقبة شاملة باستخدام Prometheus و Grafana لمنحك رؤى في الوقت الحقيقي حول أداء البنية التحتية الخاصة بك."
    } else if (
      lowerQuestion.includes("cloud") ||
      lowerQuestion.includes("aws") ||
      lowerQuestion.includes("azure") ||
      lowerQuestion.includes("gcp")
    ) {
      return "نقدم حلولًا متعددة السحابة عبر AWS و Azure و GCP، مما يساعدك على الاستفادة من أفضل ما في كل منصة أو الانتقال بينها."
    } else if (lowerQuestion.includes("price") || lowerQuestion.includes("cost") || lowerQuestion.includes("quote")) {
      return "تعتمد أسعارنا على احتياجاتك المحددة. يرجى الاتصال بنا من خلال نموذج الاتصال للحصول على عرض أسعار مخصص."
    } else if (lowerQuestion.includes("contact") || lowerQuestion.includes("talk") || lowerQuestion.includes("call")) {
      return "يمكنك الوصول إلينا من خلال نموذج الاتصال على موقعنا. سنعاود الاتصال بك في أقرب وقت ممكن."
    } else {
      return "شكرًا على سؤالك. لمزيد من المعلومات المحددة، يرجى الاتصال بفريقنا من خلال نموذج الاتصال."
    }
  }
}

export function Chatbot({ lang }: { lang: string }) {
  const { t } = useTranslation(lang)
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ id: "1", text: t("chatbot.greeting"), isUser: false }])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate response delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getAnswer(input, lang),
        isUser: false,
      }
      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  return (
    <>
      {/* Chat toggle button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 shadow-lg z-50"
        size="icon"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>

      {/* Chat window */}
      <div
        className={cn(
          "fixed bottom-20 right-4 w-80 md:w-96 z-50 transition-all duration-300 transform",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none",
        )}
      >
        <Card className="shadow-xl">
          <CardHeader className="bg-primary text-primary-foreground py-3">
            <CardTitle className="text-lg">{t("chatbot.title")}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-80 overflow-y-auto p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "mb-3 max-w-[80%] rounded-lg p-3",
                    message.isUser ? "bg-primary text-primary-foreground ml-auto" : "bg-muted mr-auto",
                  )}
                >
                  {message.text}
                </div>
              ))}
              {isLoading && (
                <div className="bg-muted mr-auto mb-3 max-w-[80%] rounded-lg p-3">{t("chatbot.loading")}</div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-3 border-t flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("chatbot.placeholder")}
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon">
                <Send size={18} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
