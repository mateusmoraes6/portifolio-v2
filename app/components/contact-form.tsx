"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ContactForm() {
  const email = "contatomateusmoraes6@gmail.com"

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault()
    window.location.href = `mailto:${email}`
  }

  return (
    <Card className="p-6">
      <div className="flex flex-col items-center justify-center space-y-4">
        <p className="text-center text-muted-foreground">
          Clique no botão abaixo para enviar uma mensagem por email
        </p>
        <Button 
          onClick={handleEmailClick}
          size="lg" 
          className="w-full sm:w-auto"
        >
          Enviar mensagem
        </Button>
      </div>
    </Card>
  )
}
