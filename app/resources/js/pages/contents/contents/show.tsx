import ContentLayout from '@/layouts/content-layout'
import { Link } from '@inertiajs/react';
import { type BreadcrumbItem, type Content, type PostGroup } from '@/types'
import { home } from '@/routes'

export default function Show({
    content,
    categories
}: {
    content: Content;
    categories: PostGroup[];
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
        <ContentLayout breadcrumbs={breadcrumbs}>
            <h1 className="font-semibold text-3xl my-4">{content.name}</h1>
            <p className="my-6">説明文説明文</p>

            <div>
                {categories.map((category) =>
                <div key={category.id}>
                    <h2 className="font-semibold text-2xl mt-8 mb-4">{category.name}</h2>

                    <ul className="mx-4">
                    {category.posts.map((post)=>
                        <li key={post.id}>
                            <Link
                            href={"/contents/" + content.slug + '/' + post.id}
                            className="underline"
                            >
                                {post.title}
                            </Link>
                        </li>
                    )}
                    </ul>
                </div>
                )}
            </div>


        </ContentLayout>
    );
}
