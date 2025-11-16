import { type PropsWithChildren } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ContentHeader } from '@/components/content-header';
import { ContentFooter } from '@/components/content-footer';

interface ContentLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function ContentSimpleLayout({
    children,
}: PropsWithChildren<ContentLayoutProps>) {
    return (
        <>
            <Head title="">
            </Head>
            <div className="flex min-h-screen flex-col  items-center bg-[#ffffff] text-[#494544] dark:bg-[#040404]">
                <ContentHeader />
                <div className="flex-grow w-full items-center lg:max-w-4xl pt-22 px-5 sm:px-14">
                    <main className="w-full">
                        {children}
                    </main>
                </div>
                <ContentFooter />
            </div>
        </>
    );
}
