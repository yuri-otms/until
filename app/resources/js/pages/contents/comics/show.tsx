import ContentLayout from '@/layouts/content-layout'
import { type BreadcrumbItem, type Post, type Content, type Category, type Comic } from '@/types';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import ComicNavCard from '@/components/comic-nav-card';
import { formatJapaneseDate } from '@/utils/data';
import { home } from '@/routes'

export default function Show({
    post,
    content,
    category,
    images,
    previous,
    next,
}: {
    post: Post;
    content: Content;
    category: Category;
    images: Array<string>;
    previous: Comic;
    next: Comic;
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Top',
            href: home().url,
        },
        {
            title: content.name,
            href: '/contents/' + content.slug,
        },
        {
            title: category.name,
            href: '/contents/' + content.slug + '#' + post.category_id ,
        },
        {
            title: '',
            href: '' ,
        }
    ];


    return (
        <ContentLayout breadcrumbs={breadcrumbs} title={post.title}>
            <div className="text-sm py-2">
                <div>{formatJapaneseDate(post.published_at)} 公開</div>
                { new Date(post.published_at) < new Date(post.updated_at) ? <div>{formatJapaneseDate(post.updated_at)} 最終改訂</div> : ''}
            </div>
                {images.map((image)=>
                    <img key={image} src={'/storage/' + image} alt=""
                    className="block mx-auto sm:max-w-xl"
                    loading="lazy"
                    width={576}
                    height={815}
                     />
                )}
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
                        a: (props) => (
                            <a className="text-blue-600 underline" {...props} />
                        ),
                        blockquote: (props) => (
                            <blockquote className="border-l-5 pl-5" {...props} />
                        ),
                        pre: (props) => (
                            <pre className="bg-black text-white px-4 py-3" {...props} />
                        ),
                        img: (props) => (
                            <img className="block mx-auto sm:max-w-xl" {...props} />
                        ),
                    }}
                >
                    {post.body}
                </ReactMarkdown>
                <ComicNavCard previous={previous} next={next} />
        </ContentLayout>
    );
}
