import * as React from "react"
import { cn } from "@/lib/utils"

function LinkButton ({ href, className, children, ...props }: React.ComponentProps<'a'>)  {
  return (
    <a
        data-slot="link-button"
        href={href}
        className={cn("text-white hover:bg-[#dddddd] font-,edium rounded-lg m-1 h-11 px-4.5 py-2.5 text-center", className)}
        {...props}
    >
        <span>{children}</span>
    </a>
  );
};

export { LinkButton }
