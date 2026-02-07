import ArticleShow from '@/components/article-show';
import { type Post, type Content, type Category, type Comic } from '@/types';

export default function Show({
    post,
    content,
    category,
    images,
    previous,
    next,
    metaTitle,
}: {
    post: Post;
    content: Content;
    category: Category;
    images: Array<string>;
    previous: Comic;
    next: Comic;
    metaTitle: string;
}) {
    return (
        <ArticleShow
            post={post}
            content={content}
            category={category}
            images={images}
            previous={previous}
            next={next}
            metaTitle={metaTitle}
            imageStyle="comic"
        />
    );
}
