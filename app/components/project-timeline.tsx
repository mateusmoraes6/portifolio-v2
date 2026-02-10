// app/components/project-timeline.tsx
"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Calendar, ChevronRight, MapPin, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

interface Project {
    id: number
    title: string
    description: string[]
    image: string
    secondaryImage?: string
    link: string
    visitLink?: string
    period: string
    location: string
    tags: string[]
}

const projects: Project[] = [
    {
        id: 1,
        title: "UX/UI E-commerce",
        description: [
            "Plataforma full-stack de e-commerce com Next.js e Tailwind.",
            "UI/UX modernos em harmonia com o Brainding da marca."
        ],
        image: "/Macbook-Air-elegance-acessorios.png",
        secondaryImage: "/iPhone-13-PRO-MAX-elegance-acessorios.png",
        link: "https://github.com",
        visitLink: "https://elegance-acessorios.netlify.app/",
        period: "2025",
        location: "Remoto",
        tags: ["Next.js", "Node.js", "TypeScript", "Tailwind"]
    },
    {
        id: 2,
        title: "MoneyHub App",
        description: [
            "Aplicação para gestão financeira.",
            "App open source."
        ],
        image: "/Macbook-Air-moneyhub.png",
        secondaryImage: "/iPhone-13-PRO-MAX-moneyhub.png",
        link: "https://github.com/mateusmoraes6/moneyhub",
        visitLink: "#",
        period: "2025",
        location: "Remoto",
        tags: ["React", "Node.js", "TypeScript", "Tailwind", "Supabase"]
    },
    {
        id: 3,
        title: "CRM Gestão de clientes",
        description: [
            "Plataforma MERN Stack para gestão.",
            "Dashboard intuitivo com opções para uso."
        ],
        image: "/Macbook-Air-clientcrmdemo.png",
        secondaryImage: "/iPhone-13-PRO-MAX-clientcrmdemo.png",
        link: "https://github.com/mateusmoraes6/frontend-crm",
        visitLink: "https://clientcrmdemo.netlify.app/",
        period: "2025",
        location: "Remoto",
        tags: ["React", "Node", "JavaScript", "CSS", "MongoDB", "Axios", "Zod"]
    }
]

export default function ProjectTimeline() {
    const [visibleItems, setVisibleItems] = useState<Record<number, boolean>>({})
    const timelineRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observers: IntersectionObserver[] = []

        projects.forEach((project) => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setVisibleItems((prev) => ({ ...prev, [project.id]: true }))
                            observer.unobserve(entry.target)
                        }
                    })
                },
                { threshold: 0.2 },
            )

            const element = document.getElementById(`project-${project.id}`)
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
        <div ref={timelineRef} className="mt-2 w-full max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-10 justify-center">
                <Github className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-bold">Projetos</h3>
            </div>

            <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-primary/20 hidden md:block" />

                {projects.map((project, index) => {
                    const isEven = index % 2 === 0
                    const isVisible = visibleItems[project.id]

                    return (
                        <div
                            id={`project-${project.id}`}
                            key={project.id}
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
                                <div
                                    className="hidden md:block absolute top-5 w-5 h-5 rounded-full bg-primary border-4 border-background z-10"
                                    style={{
                                        [isEven ? "left" : "right"]: "-2.5px",
                                        transform: isEven ? "translateX(-100%)" : "translateX(100%)",
                                    }}
                                />
                                <div
                                    className={`hidden md:block absolute top-5 h-px w-12 bg-primary/40 z-0 ${isEven ? "left-0 -translate-x-full" : "right-0 translate-x-full"
                                        }`}
                                />
                                <Card className="border border-primary/10 p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
                                    <div className="flex flex-col space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-xl font-semibold">{project.title}</h4>
                                                {/* <div className="flex items-center text-muted-foreground mt-1">
                                                    <span className="font-medium">{project.period}</span>
                                                </div> */}
                                            </div>
                                            <Link href={project.link} target="_blank">
                                                <Badge className="bg-gray-800 text-white flex items-center gap-1">
                                                    <Github className="h-4 w-4" /> Código
                                                </Badge>
                                            </Link>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                                            <div className="flex items-center">
                                                <Calendar className="h-4 w-4 mr-1" />
                                                <span>{project.period}</span>
                                            </div>
                                            <div className="hidden sm:block">•</div>
                                            <div className="flex items-center">
                                                <MapPin className="h-4 w-4 mr-1" />
                                                <span>{project.location}</span>
                                            </div>
                                        </div>
                                        <ul className="space-y-2 mt-2">
                                            {project.description.map((item, i) => (
                                                <li key={i} className="flex items-start">
                                                    <ChevronRight className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {project.tags.map((tag) => (
                                                <Badge key={tag} variant="outline" className="bg-primary/5">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>

                                        <div className="flex gap-3 mt-4">
                                            {project.visitLink && (
                                                <Link href={project.visitLink} target="_blank" className="flex-1">
                                                    <Button variant="default" className="w-full gap-2 font-medium">
                                                        <ExternalLink className="h-4 w-4" /> Acessar Aplicação
                                                    </Button>
                                                </Link>
                                            )}
                                        </div>
                                        <div className="w-full aspect-video relative rounded-lg overflow-hidden border mt-2 bg-[#F5F5F7] dark:bg-[#1d1d1f]">
                                            {project.secondaryImage ? (
                                                <div className="flex h-full w-full gap-3 p-3">
                                                    <div className="relative flex-[2.2] rounded-md overflow-hidden shadow-sm bg-white/50 dark:bg-black/20">
                                                        <Image
                                                            src={project.image}
                                                            alt={`${project.title} - Macbook View`}
                                                            fill
                                                            className="object-contain p-1"
                                                            priority={project.id === 1}
                                                        />
                                                    </div>
                                                    <div className="relative flex-1 rounded-md overflow-hidden shadow-sm bg-white/50 dark:bg-black/20">
                                                        <Image
                                                            src={project.secondaryImage}
                                                            alt={`${project.title} - iPhone View`}
                                                            fill
                                                            className="object-contain p-1"
                                                            priority={project.id === 1}
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <Image
                                                    src={project.image}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            )}
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