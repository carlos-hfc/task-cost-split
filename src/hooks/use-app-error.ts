import { useSnackbarContext } from "@/contexts/snackbar-context"
import { AppError } from "@/utils/app-error"

export function useAppError() {
  const { notify } = useSnackbarContext()

  function handleError(error: unknown, defaultMessage?: string) {
    const isAppError = error instanceof AppError

    const message = isAppError
      ? error.message
      : (defaultMessage ?? "Falha na requisição")

    notify({
      message,
      type: "error",
    })
  }

  return { handleError }
}
