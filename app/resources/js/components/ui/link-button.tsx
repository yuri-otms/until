import * as React from "react"
import { cn } from "@/lib/utils"

function LinkButton ({ href, className, children, ...props }: React.ComponentProps<'a'>)  {
  return (
    <a
        data-slot="link-button"
        href={href}
        className={cn("text-neutral-500 hover:bg-[#dddddd] font-bold rounded-lg  m-1 p-2 h-10 text-center", className)}
        {...props}
    >
        <span>{children}</span>
    </a>
  );
};

export { LinkButton }
