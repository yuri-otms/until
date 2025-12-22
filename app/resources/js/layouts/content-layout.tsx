import ContentLayoutTemplate from '@/layouts/contents/content-simple-layout';
import { type BreadcrumbItem } from '@/types'

export default function ContentLayout({
    children,
    title,
    breadcrumbs,
    ...props
}: {
    breadcrumbs?: BreadcrumbItem[];
    children:React.ReactNode;
    title?: string;
}) {
    return (
        <ContentLayoutTemplate breadcrumbs={breadcrumbs} title={title} {...props}>
            {children}
        </ContentLayoutTemplate>
    );
}
