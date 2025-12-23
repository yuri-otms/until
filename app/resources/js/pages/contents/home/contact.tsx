import ContentLayout from '@/layouts/content-layout'
import { type BreadcrumbItem } from '@/types'
import { home } from '@/routes'

export default function Index() {
    const title: string = 'お問い合わせ';
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
            <div className="text-sm py-2 mb-4">
                <div>2025年12月24日 公開</div>
            </div>
            <p>ご連絡はXのDMによろしくお願いします。<a className="text-blue-600 underline" target="_blank" href="https://x.com/lstliauou">Xアカウント</a></p>
        </ContentLayout>
    );
}
