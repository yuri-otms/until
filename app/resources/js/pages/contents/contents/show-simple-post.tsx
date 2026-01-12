import ContentLayout from '@/layouts/content-layout'
import { type BreadcrumbItem, type Content, type Post } from '@/types'
import { home } from '@/routes'
import { PostRow } from '@/components/post-row';

export default function Show({
    content,
    posts
}: {
    content: Content;
    posts: Post[];
}) {

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Top',
            href: home().url,
        },
        {
            title: content.name,
            href: '/contents/' + content.slug,
        }
    ];

    return (
        <ContentLayout breadcrumbs={breadcrumbs} title={content.name}>

            <p className="my-6 whitespace-pre-line">{content.description}</p>

            {posts.map((post) => (
                <PostRow key={post.id} post={post} content={content} />
            ))}

            {/* 将来ページネーションするならここを置き換える
            <div className="py-10 text-center text-sm text-muted-foreground">
            ここにページネーション（10件ごと）を追加予定
            </div>
            */}

    </ContentLayout>
    );
}
