/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-13 04:17:32
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-18 14:56:15
 * @FilePath     : /chat-webpack/src/router/redirect.tsx
 */
import { useEffect } from 'react'

interface RedirectProps {
  to: string
}

export default function Redirect({ to }: RedirectProps) {
  useEffect(() => {
    window.location.replace(to)
  }, [to])

  return null;
}