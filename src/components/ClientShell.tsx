'use client'
import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion'
import { Cursor } from '@/components/Cursor'
import { NoiseOverlay } from '@/components/NoiseOverlay'

export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <Cursor />
        <NoiseOverlay />
        {children}
      </MotionConfig>
    </LazyMotion>
  )
}
