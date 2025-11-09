'use client'

import { Volume2, VolumeX, AlertCircle } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface VoiceAlertsProps {
  alerts: string[]
  enabled: boolean
  onToggle: () => void
}

export default function VoiceAlerts({ alerts, enabled, onToggle }: VoiceAlertsProps) {
  const synthRef = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis
    }
  }, [])

  useEffect(() => {
    if (enabled && alerts.length > 0 && synthRef.current) {
      const latestAlert = alerts[0]
      const utterance = new SpeechSynthesisUtterance(latestAlert)
      utterance.rate = 0.9
      utterance.pitch = 1
      synthRef.current.speak(utterance)
    }
  }, [alerts, enabled])

  if (alerts.length === 0) return null

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <AlertCircle className="h-5 w-5 text-yellow-600" />
          <div>
            <p className="font-semibold text-yellow-800">Latest Alert</p>
            <p className="text-yellow-700">{alerts[0]}</p>
          </div>
        </div>
        <button
          onClick={onToggle}
          className="p-2 rounded-full hover:bg-yellow-100 transition-colors"
          aria-label={enabled ? 'Disable voice alerts' : 'Enable voice alerts'}
        >
          {enabled ? (
            <Volume2 className="h-5 w-5 text-yellow-600" />
          ) : (
            <VolumeX className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>
    </div>
  )
}

