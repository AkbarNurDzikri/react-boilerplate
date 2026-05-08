import { useLottie } from 'lottie-react'

interface LottiePlayerProps {
  data: unknown
  className?: string
}

export function LottiePlayer({ data, className }: LottiePlayerProps) {
  const { View } = useLottie({ animationData: data, loop: true })
  return <div className={className}>{View}</div>
}
