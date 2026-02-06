import * as React from "react"
import { cn } from "@/lib/utils"
import { Link } from "@inertiajs/react"
import { formatJapaneseDate } from '@/utils/data';

interface PostButtonProps {
    href?: string;
    title: string;
    publishedAt: string;
    contentName?: string;
    className?: string;
}

function PostButton({ href, title, publishedAt, contentName, className }: PostButtonProps) {
    return (
        <Link
            href={href || '#'}
            className={cn(
                "flex flex-col overflow-hidden text-[#494544] bg-white hover:bg-gray-50 rounded-lg border h-28 dark:bg-[#1a1a1a] dark:border-[#444444] dark:text-white dark:hover:bg-[#222222]",
                className
            )}
        >
            {contentName && (
                <div className="text-xs text-[#333333] bg-[#e5e5e5] font-bold truncate w-full px-3 py-1.5 shrink-0 dark:bg-[#2a2a2a] dark:text-[#cccccc]">
                    {contentName}
                </div>
            )}
            <div className="flex-1 px-3 pt-1.5 pb-2 sm:pt-2 flex flex-col min-h-0">
                <time className="text-xs font-medium text-[#666666] mb-1 block dark:text-[#aaaaaa]">
                    {formatJapaneseDate(publishedAt)}
                </time>
                <div className="text-sm font-bold leading-tight line-clamp-2">
                    {title}
                </div>
            </div>
        </Link>
    );
}

export { PostButton }
