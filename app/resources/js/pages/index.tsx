import { register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index(
   ) {

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#efefef] text-[#1b1b18] dark:bg-[#0a0a0a]">
                <header className="fixed mb-6 w-full text-lg p-2 bg-[#494544] text-[#FDFDFC]">
                    <div className="mx-auto items-center lg:max-w-4xl flex justify-between gap-4">
                        <h1>80歳まで続けるサイト</h1>
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
                <div className="flex w-full items-center lg:max-w-4xl max-w-sm pt-16">
                    <main className="w-full">
                        <p>80歳になる2065年まで40年続けるサイトです</p>
                        <h2 className="text-2xl p-1 border-b border-[#0a0a0a]">プロフィール</h2>
                        <p>不登校、ひきこもり、長期無職、対人恐怖（社交不安障害）、短期離職の繰り返しから、自分の夢を叶える方法を模索しています。</p>
                        <h2 className="text-2xl border-b border-[#c41a30]">読み物</h2>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
