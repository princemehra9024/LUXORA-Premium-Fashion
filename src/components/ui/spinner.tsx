import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
      <Loader2Icon
        role="status"
        aria-label="Loading"
        className={cn("size-full animate-spin text-primary")}
        {...props}
      />
    </div>
  )
}

export { Spinner }
