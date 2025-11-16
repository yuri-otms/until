import ContentLayoutTemplate from '@/layouts/contents/content-simple-layout';

export default function ContentLayout({
    children,
    ...props
}: {
    children:React.ReactNode;
}) {
    return (
        <ContentLayoutTemplate {...props}>
            {children}
        </ContentLayoutTemplate>
    );
}
