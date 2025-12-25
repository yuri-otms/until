import * as React from "react"
import { cn } from "@/lib/utils"
import { Link } from "@inertiajs/react"

function ContentButton ({ href, className, children }: React.ComponentProps<'a'>)  {
  return (
    <Link
        href={href}
        className={cn("flex items-center justify-center text-[#494544] bg-[#dddddd] hover:bg-[#cccccc] font-bold rounded-lg lg:min-w-1/4 min-w-1/2 p-2 h-24 text-center whitespace-pre-line dark:bg-[#333333] dark:text-white dark:hover:bg-[#555555]", className)}
    >
        <span>{children}</span>
    </Link>
  );
};

export { ContentButton }
