'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'

export default function CookieToastListener() {
  useEffect(() => {
    fetch('/api/toast')
      .then((res) => res.json())
      .then((data) => {
        if (data.message) toast.success(data.message)
      })
  })

  return null
}
