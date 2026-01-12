import { Link } from "@inertiajs/react";
import { formatJapaneseDate } from '@/utils/data';
import { type Post, type Content } from '@/types';


export function PostRow({ post, content }: { post: Post; content: Content}) {
  return (

        <Link
            href={"/contents/" + content.slug + '/' + content.type + '/' + post.id}
            className="mt-1 block text-lg font-semibold leading-snug"
        >
            <div className="p-4 sm:p-5 hover:bg-gray-50 dark:hover:bg-[#333333] border-b border-gray-200">
                <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                    <time className="font-medium">{formatJapaneseDate(post.created_at)}</time>
                    </div>

                    {post.title}
                </div>

                {/* 右側に「→」だけ置くとクリック誘導になる */}
                <span className="shrink-0 text-muted-foreground mt-1">→</span>
                </div>
            </div>
        </Link>
  );
}
