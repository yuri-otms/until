import * as React from "react"
import { cn } from "@/lib/utils"
import { Link } from "@inertiajs/react"

function LinkButton ({ href, className, children }: React.ComponentProps<'a'>)  {
  return (
    <Link
        href={href}
        className={cn("text-white bg-black hover:bg-[#dddddd] font-,edium rounded-lg m-1 h-11 px-4.5 py-2.5 text-center", className)}
    >
        <span>{children}</span>
    </Link>
  );
};

export { LinkButton }
