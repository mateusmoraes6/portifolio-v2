"use client"

import React from "react"

import { Card } from "@/components/ui/card"
import { Award, BrainCircuit, Code, ChartNoAxesCombined, Rocket, User, Mail } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import ExperienceTimeline from "./experience-timeline"

interface Strength {
  icon: React.ElementType
  title: string
  description: string
}

const strengths: Strength[] = [
  {
    icon: Code,
    title: "Desenvolvimento Full Stack",
    description: "Trabalhando em desenvolvimento front-end e back-end com tecnologias modernas.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Análises de Dados",
    description: "Abordagem analítica usando as principais ferramentas de mercado para uma melhor análise.",
  },
  {
    icon: Rocket,
    title: "Capacidade de aprendizagem",
    description: "Capacidade de aprender novas tecnologias e frameworks se for necessário sua aplicação.",
  },
  {
    icon: BrainCircuit,
    title: "Inteligência Artificial",
    description: "Usabilidade de inteligência artificial para criar e/ou integrar projetos.",
  },
]

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [showConnections, setShowConnections] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
          // Trigger connection animation after section becomes visible
          setTimeout(() => {
            setShowConnections(true)
            // Fade out connections after animation completes
            setTimeout(() => {
              setShowConnections(false)
            }, 3000) // Total animation duration + display time
          }, 500)
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-16 md:py-2 lg:py-4 mt-32"
    >
      <div className="container px-4 md:px-6">
        <div
          className={`flex flex-col items-center transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <div className="flex items-center gap-2 mb-6">
            <User className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold tracking-tight">Sobre mim</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
            <div
              className={`col-span-1 flex justify-center transition-all duration-700 delay-100 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
              <div className="relative w-64 h-64 md:w-full md:h-auto aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl transform rotate-6 scale-95"></div>
                <Card className="relative overflow-hidden rounded-2xl border-2 border-primary/10 shadow-lg">
                  <Image
                    src="/mateusimage.jpg"
                    alt="Mateus Moraes"
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </Card>
              </div>
            </div>

            <div
              className={`col-span-1 md:col-span-2 space-y-4 transition-all duration-700 delay-200 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
              <p className="text-lg leading-relaxed">
                Desenvolvedor Full Stack em formação, cursando Análise e Desenvolvimento de Sistemas. Desenvolvendo experiência com desenvolvimento de projetos web e análise de dados.
              </p>

              <p className="text-lg leading-relaxed">
                Minha abordagem alia habilidades técnicas com visão em UX/UI. Compromisso em desenvolver soluções que não apenas atendam requisitos funcionais, mas também proporcionem experiências intuitivas e agradáveis aos usuários.
              </p>
            </div>
          </div>

          <div
            className={`mt-32 w-full max-w-5xl transition-all duration-700 delay-300 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >


            <div className="flex flex-col items-center gap-12">
              {/* Seletor de Ícones Interativo */}
              <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-8 md:gap-12 relative p-4">
                {/* Connection Lines SVG Overlay */}
                {showConnections && (
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ zIndex: 0 }}
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    {/* Desktop Path: Straight line through centers */}
                    <path
                      d="M 12.5,40 L 87.5,40"
                      fill="none"
                      stroke="white"
                      strokeWidth="0.5"
                      strokeDasharray="100 100"
                      strokeDashoffset="100"
                      className="hidden md:block transition-opacity duration-500"
                      style={{
                        animation: 'drawLineContinuous 2s ease-in-out forwards',
                        opacity: showConnections ? 0.4 : 0,
                      }}
                    />

                    {/* Mobile Path: U-shaped flow (0 -> 1 -> 3 -> 2) */}
                    <path
                      d="M 25,25 L 75,25 Q 85,25 85,35 L 85,65 Q 85,75 75,75 L 25,75"
                      fill="none"
                      stroke="white"
                      strokeWidth="1"
                      strokeDasharray="200 200"
                      strokeDashoffset="200"
                      className="block md:hidden transition-opacity duration-500"
                      style={{
                        animation: 'drawLineContinuous 2.5s ease-in-out forwards',
                        opacity: showConnections ? 0.4 : 0,
                      }}
                    />
                  </svg>
                )}

                {strengths.map((strength, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <button
                      key={strength.title}
                      onClick={() => setActiveIndex(index)}
                      className={`relative group flex flex-col items-center gap-3 transition-all duration-500 ${isActive ? "scale-110" : "hover:scale-105 opacity-70 hover:opacity-100"
                        }`}
                      style={{ zIndex: 1 }}
                    >
                      <div className={`relative p-5 rounded-2xl transition-all duration-500 ${isActive
                        ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.3)]"
                        : "bg-background text-primary border border-primary/10 group-hover:bg-primary/10"
                        }`}>
                        <strength.icon className={`h-8 w-8 transition-transform duration-500 ${isActive ? "rotate-[360deg]" : "group-hover:rotate-12"
                          }`} />

                        {/* Glow effect animação */}
                        {isActive && (
                          <div className="absolute inset-0 rounded-2xl animate-ping border-2 border-primary/40 pointer-events-none" />
                        )}
                      </div>
                      <span className={`text-sm font-medium transition-all duration-300 ${isActive ? "text-primary opacity-100" : "text-muted-foreground opacity-0 group-hover:opacity-100"
                        }`}>
                        {strength.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Timeline de Experiência */}
          <ExperienceTimeline />
        </div>
      </div>
    </section>
  )
}
