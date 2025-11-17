import ContentLayout from '@/layouts/content-layout'
import { type Post } from '@/types';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export default function Index({
    post
}: {
    post: Post
}) {

    return (
        <ContentLayout>
            <h1 className="font-semibold text-lg my-2">{post.title}</h1>

                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                        h1: ({node, ...props}) => (
                        <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
                        ),
                        h2: ({node, ...props}) => (
                        <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />
                        ),
                        p: ({node, ...props}) => (
                        <p className="text-base leading-7 mb-4" {...props} />
                        ),
                        ul: ({node, ...props}) => (
                        <ul className="list-disc pl-6 mb-4" {...props} />
                        ),
                        a: ({node, ...props}) => (
                        <a className="text-blue-600 underline" {...props} />
                        ),
                    }}
                >
                    {post.body}
                </ReactMarkdown>

        </ContentLayout>
    );
}
