import { useEffect, useMemo, useRef, useState, type RefObject } from "react"

interface UseInViewOptions {
  threshold?: number | number[]
  rootMargin?: string
  once?: boolean
}

interface UseInViewResult<T extends HTMLElement> {
  ref: RefObject<T | null>
  isInView: boolean
}

export function useInView<T extends HTMLElement = HTMLElement>({
  threshold = 0.1,
  rootMargin = "0px",
  once = true,
}: UseInViewOptions = {}): UseInViewResult<T> {
  const ref = useRef<T>(null)
  const [isInView, setIsInView] = useState(
    typeof window !== "undefined" && typeof IntersectionObserver === "undefined"
  )
  const thresholdKey = useMemo(() => JSON.stringify(threshold), [threshold])

  useEffect(() => {
    const element = ref.current

    if (!element || typeof IntersectionObserver === "undefined") {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)

          if (once) {
            observer.unobserve(element)
          }

          return
        }

        if (!once) {
          setIsInView(false)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [once, rootMargin, threshold, thresholdKey])

  return { ref, isInView }
}
