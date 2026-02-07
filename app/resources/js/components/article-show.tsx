import ContentLayout from '@/layouts/content-layout'
import { type BreadcrumbItem, type Post, type Content, type Category, type Comic } from '@/types';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import ComicNavCard from '@/components/comic-nav-card';
import { formatJapaneseDate } from '@/utils/data';
import { home } from '@/routes'
import { Head } from '@inertiajs/react';

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
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                        h1: (props) => (
                            <h2 className="text-2xl font-bold mt-6 mb-4" {...props} />
                        ),
                        h2: (props) => (
                            <h3 className="text-xl font-semibold mt-6 mb-3" {...props} />
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
                        pre: (props) => (
                            <pre className="bg-black text-white px-4 py-3" {...props} />
                        ),
                        img: (props) => (
                            <img className={imageClassName} {...props} />
                        ),
                    }}
                >
                    {post.body}
                </ReactMarkdown>
                <ComicNavCard previous={previous} next={next} />
            </ContentLayout>
        </>
    );
}
