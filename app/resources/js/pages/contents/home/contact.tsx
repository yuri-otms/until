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
            お問い合わせ
        </ContentLayout>
    );
}
