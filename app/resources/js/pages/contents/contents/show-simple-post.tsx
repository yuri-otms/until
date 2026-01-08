import ContentLayout from '@/layouts/content-layout'
import { Link } from '@inertiajs/react';
import { type BreadcrumbItem, type Content, type Post } from '@/types'
import { home } from '@/routes'

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

            <ul>
                {posts.map((post) =>
                    <li>
                        <Link
                            href={"/contents/" + content.slug + '/' + content.type + '/' + post.id}
                            className="underline">
                        {post.created_at}: {post.title}
                        </Link>
                    </li>
                )}
            </ul>
        </ContentLayout>
    );
}
