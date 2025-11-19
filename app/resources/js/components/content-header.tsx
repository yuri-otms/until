import { Link } from '@inertiajs/react';
import LogoImage from '@/images/favicon.svg';
import { home } from '@/routes';


export function ContentHeader() {
    return (
        <header className="fixed w-full text-lg pt-4 text-[#494544] bg-[#ffffff]">
            <div className="flex justify-between mx-auto items-center px-4 sm:px-12 gap-4 font-semibold">
                <span className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm"><img src={LogoImage} alt="until 80" loading="eager" /></div>
                    <Link href={ home() }>80歳まで続けるサイト</Link>
                </span>
                <nav className="justify-end text-sm font-medium gap-5">
                    <div className="hidden md:block">
                        <Link href="/about-this-site"
                        className="p-2">このサイトについて
                        </Link>
                        <Link
                        className="p-2" href="/about-this-site">プロフィール
                        </Link>
                        <Link
                        className="p-2" href="/contact">お問い合わせ</Link>
                    </div>
                    <div className="block md:hidden">
                        ハンバーガー
                    </div>
                </nav>
            </div>
        </header>
    );
}
