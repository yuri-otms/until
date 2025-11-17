import ContentLayout from '@/layouts/content-layout'
import { type BreadcrumbItem, type Post, type Content } from '@/types';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { home } from '@/routes'

export default function Index({
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
            <h1 className="font-semibold text-3xl my-2">{post.title}</h1>

                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                        h1: (props) => (
                        <h1 className="text-2xl font-bold mt-8 mb-4" {...props} />
                        ),
                        h2: (props) => (
                        <h2 className="text-xl font-semibold mt-6 mb-3" {...props} />
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
                    }}
                >
                    {post.body}
                </ReactMarkdown>

        </ContentLayout>
    );
}
