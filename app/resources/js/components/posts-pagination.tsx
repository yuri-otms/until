import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type Paginated } from '@/types';

interface PostsPaginationProps<T> {
    paginated: Paginated<T>;
}

export function PostsPagination<T>({ paginated }: PostsPaginationProps<T>) {
    if (paginated.last_page <= 1) {
        return null;
    }

    return (
        <nav className="flex items-center justify-center gap-1 mt-6 mb-4" role="navigation" aria-label="ページネーション">
            {paginated.links.map((link, index) => {
                const isNavButton = link.label.includes('Previous') || link.label.includes('Next');
                const isPrevious = link.label.includes('Previous');
                const isNext = link.label.includes('Next');

                if (link.url === null) {
                    return (
                        <span
                            key={index}
                            className="inline-flex items-center justify-center w-9 h-9 text-gray-300 cursor-not-allowed"
                            aria-disabled="true"
                        >
                            {isPrevious && <ChevronLeft className="w-4 h-4" />}
                            {isNext && <ChevronRight className="w-4 h-4" />}
                        </span>
                    );
                }

                return (
                    <Link
                        key={index}
                        href={link.url}
                        className={`inline-flex items-center justify-center transition-all duration-200 ${
                            isNavButton
                                ? 'w-9 h-9 rounded-md hover:bg-gray-100'
                                : link.active
                                ? 'w-9 h-9 rounded-md bg-[#494544] text-white font-medium shadow-sm'
                                : 'w-9 h-9 rounded-md hover:bg-gray-100 text-[#494544]/70 hover:text-[#494544]'
                        }`}
                        preserveScroll
                        aria-label={isPrevious ? '前のページ' : isNext ? '次のページ' : `ページ ${link.label}`}
                        aria-current={link.active ? 'page' : undefined}
                    >
                        {isPrevious ? (
                            <ChevronLeft className="w-4 h-4" />
                        ) : isNext ? (
                            <ChevronRight className="w-4 h-4" />
                        ) : (
                            link.label.replace('&laquo;', '').replace('&raquo;', '')
                        )}
                    </Link>
                );
            })}
        </nav>
    );
}
