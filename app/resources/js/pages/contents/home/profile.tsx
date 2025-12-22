import ContentLayout from '@/layouts/content-layout'
import { type BreadcrumbItem } from '@/types'
import { home } from '@/routes'

export default function Index() {
    const title: string = 'プロフィール';
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
            <h2 className="text-2xl font-bold mt-6 mb-4">基本情報</h2>


            <h2 className="text-2xl font-bold mt-6 mb-4">SNS等</h2>
            <ul className="list-disc pl-6 mb-4">
                <li><a className="text-blue-600 underline" href="https://x.com/lstliauou" target="_blank">X (旧Twitter)</a></li>
                <li><a className="text-blue-600 underline" href="https://qiita.com/yuri_t" target="_blank">Qiita</a></li>
                <li><a className="text-blue-600 underline" href="" target="_blank"></a></li>
                <li><a className="text-blue-600 underline" href="" target="_blank"></a></li>
                <li><a className="text-blue-600 underline" href="" target="_blank"></a></li>
            </ul>

        </ContentLayout>
    );
}
