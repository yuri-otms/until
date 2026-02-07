import ArticleShow from '@/components/article-show';
import { type Post, type Content, type Category } from '@/types';

export default function Show({
    post,
    content,
    category,
    previous,
    next,
    metaTitle,
}: {
    post: Post;
    content: Content;
    category: Category | null;
    previous: Post;
    next: Post;
    metaTitle: string;
}) {
    return (
        <ArticleShow
            post={post}
            content={content}
            category={category}
            previous={previous}
            next={next}
            metaTitle={metaTitle}
            imageStyle="post"
        />
    );
}
