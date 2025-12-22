import ContentLayout from '@/layouts/content-layout'
import { type BreadcrumbItem } from '@/types'
import { home } from '@/routes'

export default function Index() {
    const title: string = 'このサイトについて';
    const breadcrubms: BreadcrumbItem[] = [
        {
            title: 'Top',
            href: home().url,
        },
        {
            title: title,
            href: '',
        }
    ];

    return (

        <ContentLayout breadcrumbs={breadcrubms} title={title}>
            <p>yuriの個人サイトです。</p>
            <h2 className="text-2xl font-bold mt-6 mb-4">技術スタック</h2>
            <ul className="list-disc pl-6 mb-4">
                <li>Laravel 12</li>
                <li>React</li>
                <li>Inertia</li>
                <li>さくらのVPS 1G</li>
                <li>MySQL</li>
                <li>Docker</li>
                <li>Git/GitHub/GitHub Actions</li>
            </ul>

            <h2 className="text-2xl font-bold mt-6 mb-4">更新情報</h2>
            <ul className="list-disc pl-6 mb-4">
                <li>2025年12月20日: サイト公開開始</li>
            </ul>
        </ContentLayout>
    );
}
