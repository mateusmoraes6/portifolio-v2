"use client"

import type React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Download, FileText, Github, Home, Linkedin, Mail, User, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import type { LucideIcon } from "lucide-react"

type SocialItem = {
  name: string
  href: string
  icon: LucideIcon
}

const navigationItems = [
  { name: "Início", href: "#", icon: Home },
  { name: "Sobre", href: "#about", icon: User },
  { name: "Projetos", href: "#projects", icon: FileText },
  { name: "Contato", href: "#contact", icon: Mail },
]

const socialItems: SocialItem[] = [
  { name: "GitHub", href: "https://github.com/mateusmoraes6", icon: Github },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/mateusmoraes6/", icon: Linkedin },
  { name: "Gmail", href: "mailto:contatomateusmoraes6@gmail.com", icon: Mail },
]

export function PortfolioSidebar() {
  const pathname = usePathname()
  const { isMobile, openMobile, setOpenMobile } = useSidebar()

  // Disable scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobile && openMobile) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobile, openMobile])

  return (
    <>
      <Sidebar variant="floating" className="border-r border-border/40 bg-background/80 backdrop-blur-md">
        <SidebarHeader className="flex flex-col items-center justify-center py-6">
          <div className="relative mb-3 transition-transform duration-300 hover:scale-105">
            <Avatar className="h-24 w-24 border-2 border-primary/20">
              <AvatarImage src="/mateusimage.jpg" alt="Mateus Moraes" />
              <AvatarFallback>MM</AvatarFallback>
            </Avatar>
            <Badge
              className="absolute -bottom-1 right-0 animate-pulse bg-green-500 px-2 text-xs text-white"
              variant="outline"
            >
              Disponível
            </Badge>
          </div>
          <h2 className="text-xl font-bold">Mateus Moraes</h2>
          <p className="text-sm text-muted-foreground">Full Stack Developer</p>
        </SidebarHeader>

        <SidebarContent className="px-2">
          <SidebarMenu>
            {navigationItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href)
              return (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className="group transition-all duration-200 hover:translate-x-1"
                  >
                    <Link href={item.href} onClick={() => isMobile && setOpenMobile(false)}>
                      <item.icon className="mr-2 h-4 w-4 transition-colors group-hover:text-primary" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="group mt-2 bg-primary/10 transition-all duration-200 hover:translate-x-1 hover:bg-primary/20"
              >
                <Link href="/resume.pdf" target="_blank">
                  <Download className="mr-2 h-4 w-4 transition-colors group-hover:text-primary" />
                  <span>Currículo</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="mt-auto border-t border-border/40 p-4">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-center space-x-2">
              {socialItems.map((item: SocialItem) => {
                if (item.href.startsWith('mailto:')) {
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        window.location.href = item.href
                      }}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-transparent text-muted-foreground transition-transform hover:scale-110 hover:bg-primary/10 hover:text-primary"
                      aria-label={item.name}
                    >
                      <item.icon className="h-4 w-4" />
                    </a>
                  )
                }
                return (
                  <Button
                    key={item.name}
                    variant="ghost"
                    size="icon"
                    asChild
                    className="h-9 w-9 rounded-full transition-transform hover:scale-110 hover:bg-primary/10 hover:text-primary"
                  >
                    <Link href={item.href} target="_blank">
                      <item.icon className="h-4 w-4" />
                      <span className="sr-only">{item.name}</span>
                    </Link>
                  </Button>
                )
              })}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">© 2026 Mateus.dev</p>
              <ThemeToggle />
            </div>
          </div>
        </SidebarFooter>

        {isMobile && (
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={() => setOpenMobile(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">Fechar menu</span>
          </Button>
        )}
      </Sidebar>
    </>
  )
}

export function PortfolioSidebarWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col md:flex-row">
        <PortfolioSidebar />
        <div className="flex-1">
          <div className="sticky top-0 z-50 flex h-14 items-center border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
            <SidebarTrigger className="mr-2" />
            <span className="font-bold">Mateus.dev</span>
          </div>
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
