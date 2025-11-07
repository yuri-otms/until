import * as React from "react"
import { cn } from "@/lib/utils"

function ContentButton ({ href, className, children, ...props }: React.ComponentProps<'a'>)  {
  return (
    <a
        data-slot="content-button"
        href={href}
        className={cn("inline-flex items-center justify-center  text-[#494544] border border-[#494544] hover:bg-[#dddddd] font-bold rounded-lg lg:min-w-1/4 min-w-1/2 p-2 h-16 text-center", className)}
        {...props}
    >
        <span>{children}</span>
    </a>
  );
};

export { ContentButton }
