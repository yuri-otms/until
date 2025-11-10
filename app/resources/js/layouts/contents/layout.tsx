import Heading from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import { LinkButton } from '@/components/ui/link-button';
import { type PropsWithChildren } from 'react';

export default function ContentsLayout({ children }: PropsWithChildren) {
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    return (
        <div className="px-4 py-6">
            <div className="flex justify-between">
                <Heading
                    title="コンテンツ設定"
                    description="各コンテンツの詳細を設定します"
                />

                <LinkButton href="/contents/create" className="bg-black">新規作成</LinkButton>
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
