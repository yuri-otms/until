import { type PropsWithChildren } from 'react';
import { Head } from '@inertiajs/react';
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
            <Head title="" />
            <div className="flex min-h-screen flex-col  items-center bg-[#ffffff] text-[#494544] dark:bg-[#040404]">
                <ContentHeader />
                <div className="flex-grow w-full items-center lg:max-w-6xl mt-15 pt-10 px-5 sm:px-14">
                    <main className="w-full">
                        {children}
                    </main>
                </div>
                <ContentFooter />
            </div>
        </>
    );
}
