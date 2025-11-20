import { type PropsWithChildren } from 'react';
import { Head } from '@inertiajs/react';
import { ContentHeader } from '@/components/content-header';
import { ContentFooter } from '@/components/content-footer';
import { ContentBodyHeader } from '@/components/content-body-header';
import { type BreadcrumbItem } from '@/types';

interface ContentLayoutProps {
    name?: string;
    title?: string;
    description?: string;
    breadcrumbs?: BreadcrumbItem[];
}

export default function ContentSimpleLayout({
    children,
    breadcrumbs,
    title,
}: PropsWithChildren<ContentLayoutProps>) {
    return (
        <>
            <Head title={title} />
            <div className="flex min-h-screen flex-col  items-center bg-[#ffffff] text-[#494544] dark:bg-[#040404]">
                <ContentHeader />
                <div className="flex-grow flex flex-col w-full lg:max-w-6xl mt-7 pt-10 px-5 sm:px-14">
                    { breadcrumbs ? <ContentBodyHeader breadcrumbs={breadcrumbs} /> : ''}
                    <main className="w-full flex-grow mb-5">
                        { title ? <h1 className="font-semibold text-3xl my-2">{title}</h1> : ''}
                        {children}
                    </main>
                    { breadcrumbs ? <ContentBodyHeader breadcrumbs={breadcrumbs} /> : ''}
                </div>
                <ContentFooter />
            </div>
        </>
    );
}
