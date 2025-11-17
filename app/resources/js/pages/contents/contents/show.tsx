import ContentLayout from '@/layouts/content-layout'
import { Link } from '@inertiajs/react';

export default function Index({
    content,
    categories
}: {
    content: Content;
    categories: PostGroup[];
}) {

    return (
        <ContentLayout>
            <h1 className="font-semibold text-lg my-2">{content.name}</h1>
            <p className="my-2">説明文説明文</p>

            <div>
                {categories.map((category) =>
                <div key={category.id}>
                    <h2 className="font-semibold text-md my-2">{category.name}</h2>

                    <ul className="mx-4">
                    {category.posts.map((post)=>
                        <li key={post.id}>
                            <Link href={"/contents/" + content.slug + '/' + post.id}>
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
