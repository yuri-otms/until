import ContentLayout from '@/layouts/content-layout'
import { Link } from '@inertiajs/react';
import { type Post } from '@/types';

export default function Index({
    post
}: {
    post: Post
}) {

    return (
        <ContentLayout>
            <h1 className="font-semibold text-lg my-2">{post.title}</h1>
            <p className="my-2">{post.description}</p>



        </ContentLayout>
    );
}
