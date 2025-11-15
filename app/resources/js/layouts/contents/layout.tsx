import Heading from '@/components/heading';
import { LinkButton } from '@/components/ui/link-button';
import { type PropsWithChildren } from 'react';

interface ContentsLayoutProps {
    title: string;
    create?: string;
}

export default function ContentsLayout({
    children,
    title,
    create
}: PropsWithChildren<ContentsLayoutProps>) {
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    return (
        <div className="px-4 py-6">
            <div className="flex justify-between">
                <Heading
                    title={title}
                    description="各コンテンツの詳細を設定します"
                />
                { create ? <LinkButton href={create}>新規作成</LinkButton> : ''}
            </div>
            <div className="flex flex-col lg:flex-row">

                <div className="w-full">
                    <section className="space-y-12">
                        {children}
                    </section>
                </div>
            </div>
        </div>
    );
}
