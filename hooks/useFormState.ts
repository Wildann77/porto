import { useCallback, useState, type FormEvent } from "react"

import type { FormStatus } from "@/types"

interface UseFormStateOptions {
  action: string
  successMessage?: string
  errorMessage?: string
  resetOnSuccess?: boolean
}

interface UseFormStateResult {
  status: FormStatus
  message: string | null
  isLoading: boolean
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>
}

interface FormErrorPayload {
  error?: string
  errors?: Array<{
    message?: string
  }>
}

export function useFormState({
  action,
  successMessage = "Message sent successfully. I will get back to you soon.",
  errorMessage = "Something went wrong while sending your message. Please try again.",
  resetOnSuccess = true,
}: UseFormStateOptions): UseFormStateResult {
  const [status, setStatus] = useState<FormStatus>("idle")
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const form = event.currentTarget

      if (!form.reportValidity()) {
        return
      }

      setStatus("loading")
      setMessage(null)

      try {
        const response = await fetch(action, {
          method: "POST",
          body: new FormData(form),
          headers: {
            Accept: "application/json",
          },
        })

        if (!response.ok) {
          let nextMessage = errorMessage

          try {
            const payload = (await response.json()) as FormErrorPayload
            nextMessage = payload.errors?.[0]?.message ?? payload.error ?? errorMessage
          } catch {
            nextMessage = errorMessage
          }

          throw new Error(nextMessage)
        }

        setStatus("success")
        setMessage(successMessage)

        if (resetOnSuccess) {
          form.reset()
        }
      } catch (error) {
        setStatus("error")
        setMessage(error instanceof Error ? error.message : errorMessage)
      }
    },
    [action, errorMessage, resetOnSuccess, successMessage]
  )

  return {
    status,
    message,
    isLoading: status === "loading",
    handleSubmit,
  }
}
