import { BreadcrumbItem } from "@/types";
import { dashboard } from '@/routes';
import AppLayout from '@/layouts/app-layout';
import ContentsLayout from '@/layouts/contents/layout';
import { Head } from '@inertiajs/react';

const breadcrubms: BreadcrumbItem[] = [
    {
        title: 'コンテンツ設定',
        href: dashboard().url,
    },
];

export default function Contents() {
    return (
        <AppLayout breadcrumbs={breadcrubms}>
            <Head title="コンテンツ設定" />


        </AppLayout>
    );
}
