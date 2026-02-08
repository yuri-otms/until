import ContentLayout from '@/layouts/content-layout'
import { type BreadcrumbItem, type Post, type Content, type Category, type Comic } from '@/types';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ComicNavCard from '@/components/comic-nav-card';
import { formatJapaneseDate } from '@/utils/data';
import { home } from '@/routes'
import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { Twitter, Facebook, MessageCircle, Link2, Check } from 'lucide-react';
import { useState } from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

interface CodeProps {
    inline?: boolean;
    className?: string;
    children?: ReactNode;
}

interface ArticleShowProps {
    post: Post | Comic;
    content: Content;
    category: Category | null;
    images?: Array<string>;
    previous: Post | Comic;
    next: Post | Comic;
    metaTitle: string;
    imageStyle?: 'comic' | 'post';
}

export default function ArticleShow({
    post,
    content,
    category,
    images,
    previous,
    next,
    metaTitle,
    imageStyle = 'post',
}: ArticleShowProps) {
    const [copied, setCopied] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Top',
            href: home().url,
        },
        {
            title: content.name,
            href: '/contents/' + content.slug,
        },
        ...(category
            ? [{
                title: category.name,
                href: '/contents/' + content.slug + '#' + post.category_id,
            }]
            : []),
        {
            title: '',
            href: '',
        }
    ];

    // 画像スタイルの設定
    const imageClassName = imageStyle === 'comic'
        ? "block mx-auto sm:max-w-xl"
        : "sm:max-w-md border border-slate-200 p-2 m-2 rounded";

    // 現在のページのURL
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareTitle = post.title;
    const shareText = `${shareTitle} | ${content.name}`;

    // 共有ハンドラー
    const handleShareX = () => {
        const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;
        window.open(url, '_blank', 'width=600,height=400');
    };

    const handleShareLine = () => {
        const url = `https://line.me/R/msg/text/?${encodeURIComponent(`${shareText} ${currentUrl}`)}`;
        window.open(url, '_blank');
    };

    const handleShareFacebook = () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
    };

    const handleCopyUrl = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <>
            <Head>
                <title>{metaTitle}</title>
            </Head>
            <ContentLayout breadcrumbs={breadcrumbs} title={post.title}>
                <div className="text-sm py-2">
                    {post.published_at && (
                        <div>{formatJapaneseDate(post.published_at)} 公開</div>
                    )}
                    {post.published_at && post.updated_at && new Date(post.published_at) < new Date(post.updated_at) && (
                        <div>{formatJapaneseDate(post.updated_at)} 最終改訂</div>
                    )}
                </div>

                {/* 画像がある場合は表示（主にコミック用） */}
                {images && images.map((image) => (
                    <img
                        key={image}
                        src={'/storage/' + image}
                        alt=""
                        className={imageClassName}
                        loading="lazy"
                        width={576}
                        height={815}
                    />
                ))}

                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: (props) => (
                            <h2 className="text-2xl font-bold mt-6 mb-4" {...props} />
                        ),
                        h2: (props) => (
                            <h3 className="text-xl font-semibold mt-6 mb-3" {...props} />
                        ),
                        h3: (props) => (
                            <h4 className="text-lg font-semibold mt-5 mb-2" {...props} />
                        ),
                        p: (props) => (
                            <p className="text-base leading-7 mb-4" {...props} />
                        ),
                        ul: (props) => (
                            <ul className="list-disc pl-6 mb-4" {...props} />
                        ),
                        ol: (props) => (
                            <ol className="list-decimal pl-6 mb-4" {...props} />
                        ),
                        a: (props) => (
                            <a className="text-blue-600 underline break-all" {...props} />
                        ),
                        blockquote: (props) => (
                            <blockquote className="border-l-5 pl-5" {...props} />
                        ),
                        code: (props: CodeProps) => {
                            const { inline, className, children, ...rest } = props;
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    style={vscDarkPlus}
                                    language={match[1]}
                                    PreTag="div"
                                    customStyle={{
                                        borderRadius: '0.375rem',
                                        marginBottom: '1rem',
                                        maxWidth: '100%',
                                    }}
                                    {...rest}
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            ) : (
                                <code className="bg-gray-100 px-1 rounded text-sm" {...rest}>
                                    {children}
                                </code>
                            );
                        },
                        img: (props) => (
                            <img className={imageClassName} {...props} />
                        ),
                    }}
                >
                    {post.body}
                </ReactMarkdown>

                {/* 共有ボタン */}
                <TooltipProvider>
                    <div className="flex justify-center items-center gap-3 py-3 mt-4 mb-2 bg-[#F5F5F5] rounded-lg">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={handleShareX}
                                    className="p-3 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
                                    aria-label="Xで共有"
                                >
                                    <Twitter className="w-6 h-6 text-gray-700" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent className="border border-white">
                                <p>X</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={handleShareLine}
                                    className="p-3 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
                                    aria-label="LINEで共有"
                                >
                                    <MessageCircle className="w-6 h-6 text-gray-700" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent className="border border-white">
                                <p>LINE</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={handleShareFacebook}
                                    className="p-3 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
                                    aria-label="Facebookで共有"
                                >
                                    <Facebook className="w-6 h-6 text-gray-700" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent className="border border-white">
                                <p>Facebook</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={handleCopyUrl}
                                    className="p-3 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
                                    aria-label="URLをコピー"
                                >
                                    {copied ? (
                                        <Check className="w-6 h-6 text-green-600" />
                                    ) : (
                                        <Link2 className="w-6 h-6 text-gray-700" />
                                    )}
                                </button>
                            </TooltipTrigger>
                            <TooltipContent className="border border-white">
                                <p>{copied ? "コピーしました" : "URLをコピー"}</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </TooltipProvider>

                <ComicNavCard previous={previous} next={next} />
            </ContentLayout>
        </>
    );
}
