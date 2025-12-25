import { Link } from '@inertiajs/react'
import { type Comic, type Post } from '@/types';

export default function ComicNavCard({
    previous,
    next
}:{
    previous: Comic | Post;
    next: Comic | Post;
}) {
    return (
        <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-stretch">
            {previous && (
                <Link
                    href={previous.url}
                    className="w-full md:w-1/2 block rounded-xl border p-4 hover:bg-gray-50 dark:hover:bg-[#333333] transition"
                >
                    <div className="text-sm" text-gray-500>← 前へ</div>
                    <div className="mt-1 font-semibold">{previous.title}</div>
                </Link>
            )}
            {next && (
                <Link
                    href={next.url}
                    className={`w-full md:w-1/2 rounded-xl border p-4 hover:bg-gray-50 dark:hover:bg-[#333333] transition
                    ${!previous ? 'md:ml-auto' : ''}
                    `}
                >
                    <div className="text-sm" text-gray-500> 次へ →</div>
                    <div className="mt-1 font-semibold">{next.title}</div>
                </Link>
            )}
        </div>
    );

}
