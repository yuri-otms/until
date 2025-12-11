import ContentLayout from '@/layouts/content-layout'
import { type BreadcrumbItem, type Post, type Content } from '@/types';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { home } from '@/routes'

export default function Show({
    post,
    content
}: {
    post: Post;
    content: Content;
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
            title: '',
            href: '',
        }
    ];


    return (
        <ContentLayout breadcrumbs={breadcrumbs}>
            <h1 className="font-semibold text-3xl my-4">{post.title}</h1>
            <div className="text-sm py-2">
                <div>{post.created_at} 公開</div>
                { post.created_at != post.updated_at ? <div>{post.updated_at} 最終改訂</div> : ''}
            </div>
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

        </ContentLayout>
    );
}
