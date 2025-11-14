import {
    HomeCard,
    HomeCardHeader,
    HomeCardTitle,
    HomeCardDescription,
    HomeCardContent
} from '@/components/ui/home-card';
import { ContentButton } from '@/components/ui/content-button';
import { Head, Link } from '@inertiajs/react';
import { type ContentGroup } from '@/types';

export default function Index({
    contentGroups
}: {
    contentGroups : ContentGroup[]
   }) {

    return (
        <>
            <Head title="">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col  items-center bg-[#ffffff] text-[#494544] dark:bg-[#040404]">
                <header className="fixed mb-6 w-full text-lg py-2 text-[#ffffff] bg-[#494544] border ">
                    <div className="flex justify-between mx-auto items-center lg:max-w-4xl gap-4 px-3 font-bold">
                        <span><a href="/">80歳まで続けるサイト</a></span>
                        <nav className="justify-end">
                            <Link
                                href="/welcome"
                                className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal
                                hover:text-[#CCCCCC]
                                "
                            >
                                Welcome
                            </Link>
                        </nav>
                    </div>
                </header>
                <div className="flex-grow w-full items-center lg:max-w-4xl pt-16 px-3">
                    <main className="w-full">
                        <p className="p-2">80歳になる2065年まで40年続けるサイトです。</p>
                        {contentGroups.map((themeRow) =>
                            <HomeCard>
                                <HomeCardHeader>
                                    <HomeCardTitle>{themeRow.name}</HomeCardTitle>
                                    <HomeCardDescription>
                                        description
                                    </HomeCardDescription>
                                </HomeCardHeader>
                                <HomeCardContent>
                                    {themeRow.contents.map((contentRow) =>
                                        <ContentButton
                                            href="/welcome">
                                        {contentRow.name}
                                        </ContentButton>
                                    )}
                                </HomeCardContent>
                            </HomeCard>
                        )};
                    </main>
                </div>
                <footer className="sticky w-full py-3 bg-[#ca4130] text-white text-sm">
                    <div className="mx-auto items-center lg:max-w-4xl flex justify-between gap-4 px-3">
                        <div>
                        @yuri All rights reserved.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
