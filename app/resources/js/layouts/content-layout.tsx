import ContentLayoutTemplate from '@/layouts/contents/content-simple-layout';
import { type BreadcrumbItem } from '@/types'

export default function ContentLayout({
    children,
    breadcrumbs,
    ...props
}: {
    breadcrumbs?: BreadcrumbItem[];
    children:React.ReactNode;
}) {
    return (
        <ContentLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
        </ContentLayoutTemplate>
    );
}
