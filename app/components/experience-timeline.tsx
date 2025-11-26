"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { GraduationCap, Calendar, ChevronRight, MapPin } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface Experience {
  id: number
  role: string
  company: string
  location: string
  period: string
  description: string[]
  skills: string[]
  current?: boolean
}

const experiences: Experience[] = [
  {
    id: 1,
    role: "CST Análise e Desenvolvimento de Sistemas",
    company: "Anhanguera Educacional",
    location: "Remoto",
    period: "2025",
    description: [
      "Arquitetura e Organização de Sistemas.",
      "Análise e Modelagem de Sistemas",
      "Linhuagens de programação.",
      "Programação Web.",
    ],
    skills: ["Python", "JavaScript", "Bancos de dados", "Framworks", "Algorítmos", "POO"],
    current: true,
  },
  {
    id: 2,
    role: "Análise de Dados",
    company: "Coursera | Google",
    location: "Remoto",
    period: "2025",
    description: [
      "Limpar e organizar dados para análise e concluir análises e cálculos.",
      "Preparação de dados para exploração.",
      "Analisar dados para responder perguntas.",
    ],
    skills: ["Data Analytics", "Data Calculations", "Excel", "SQL", "Google Cloud"],
    current: false,
  },
  {
    id: 3,
    role: "Suporte em TI",
    company: "Coursera | Google",
    location: "Remoto",
    period: "2025",
    description: [
      "Limpar e organizar dados para análise e concluir análises e cálculos.",
      "Preparação de dados para exploração.",
      "Analisar dados para responder perguntas.",
    ],
    skills: ["Suporte", "DNS", "IPV4", "Powershell", "Serviço de Diretórios", "Modelo de Redes"],
    current: false,
  },
  // {
  //   id: 4,
  //   role: "Suporte de redes",
  //   company: "Coursera | Google",
  //   location: "Remoto",
  //   period: "2025",
  //   description: [
  //     "Limpar e organizar dados para análise e concluir análises e cálculos.",
  //     "Preparação de dados para exploração.",
  //     "Analisar dados para responder perguntas.",
  //   ],
  //   skills: ["Documentation", "Help Desk", "Support", "User Support"],
  //   current: false,
  // },
]

export default function ExperienceTimeline() {
  const [visibleItems, setVisibleItems] = useState<Record<number, boolean>>({})
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    experiences.forEach((experience) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => ({ ...prev, [experience.id]: true }))
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.2 },
      )

      const element = document.getElementById(`experience-${experience.id}`)
      if (element) {
        observer.observe(element)
        observers.push(observer)
      }
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  return (
    <div ref={timelineRef} className="mt-24 w-full max-w-5xl mx-auto">
      <div className="flex items-center gap-2 mb-10 justify-center">
        <GraduationCap className="h-6 w-6 text-primary" />
        <h3 className="text-2xl font-bold">Formação Profissional</h3>
      </div>

      <div className="relative">
        {/* Timeline center line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-primary/20 hidden md:block" />

        {experiences.map((experience, index) => {
          const isEven = index % 2 === 0
          const isVisible = visibleItems[experience.id]

          return (
            <div
              id={`experience-${experience.id}`}
              key={experience.id}
              className={`mb-12 md:mb-0 relative ${isVisible ? "opacity-100" : "opacity-0"} transition-all duration-700 ease-out`}
              style={{
                transitionDelay: `${index * 150}ms`,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <div
                className={`
                  md:w-1/2 md:mb-16 
                  ${isEven ? "md:pr-12 md:ml-auto" : "md:pl-12"} 
                  relative
                `}
              >
                {/* Timeline dot */}
                <div
                  className="hidden md:block absolute top-5 w-5 h-5 rounded-full bg-primary border-4 border-background z-10"
                  style={{
                    [isEven ? "left" : "right"]: "-2.5px",
                    transform: isEven ? "translateX(-100%)" : "translateX(100%)",
                  }}
                />

                {/* Timeline connector */}
                <div
                  className={`hidden md:block absolute top-5 h-px w-12 bg-primary/40 z-0 ${
                    isEven ? "left-0 -translate-x-full" : "right-0 translate-x-full"
                  }`}
                />

                <Card
                  className={`
                  border border-primary/10 p-6 hover:border-primary/30 transition-all duration-300
                  hover:shadow-md transform hover:-translate-y-1
                  ${experience.current ? "bg-primary/5" : ""}
                `}
                >
                  <div className="flex flex-col space-y-4 relative">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xl font-semibold">{experience.role}</h4>
                        <div className="flex items-center text-muted-foreground mt-1">
                          <span className="font-medium">{experience.company}</span>
                        </div>
                      </div>
                      {experience.current && <Badge className="bg-green-500 text-white">5/5</Badge>}

                      {experience.id === 2 && (
                        <a href="https://www.credly.com/badges/f4d1b1c1-3a9b-4591-aa02-a512914e9758/linked_in?t=srl03f" target="_blank" rel="noopener noreferrer" className="absolute top-2 right-2 w-10 h-10">
                          <img
                            src="/google-certificate.png"
                            alt="Certificado Google Data Analytics"
                            className="object-contain"
                          />
                        </a>
                      )}
                      {experience.id === 3 && (
                        <a href="https://www.credly.com/badges/e554f219-1d98-4163-a749-c8adc4f59e5c/public_url" target="_blank" rel="noopener noreferrer" className="absolute top-2 right-2 w-10 h-10">
                          <img
                            src="/support-certificate.png"
                            alt="Certificado Google Data Analytics"
                            className="object-contain"
                          />
                        </a>
                      )}
                      {experience.id === 4 && (
                        <a href="https://www.credly.com/badges/4a76f332-3264-4fc9-9e3f-dbc425178942/public_url" target="_blank" rel="noopener noreferrer" className="absolute top-2 right-2 w-10 h-10">
                          <img
                            src="/network-support-and-security.png"
                            alt="Certificado Google Data Analytics"
                            className="object-contain"
                          />
                        </a>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{experience.period}</span>
                      </div>
                      <div className="hidden sm:block">•</div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{experience.location}</span>
                      </div>
                    </div>

                    <ul className="space-y-2 mt-2">
                      {experience.description.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <ChevronRight className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {experience.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="bg-primary/5">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
