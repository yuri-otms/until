import ContentLayout from '@/layouts/content-layout'
import {
    HomeCard,
    HomeCardHeader,
    HomeCardTitle,
    HomeCardDescription,
    HomeCardContent
} from '@/components/ui/home-card';
import { ContentButton } from '@/components/ui/content-button';
import { Head, Link } from '@inertiajs/react';
import { type ContentGroup, type Content } from '@/types';

export default function Index({
    content
}: {
    content: Content
}) {

    return (
        <ContentLayout>
            children
        </ContentLayout>
    );
}
