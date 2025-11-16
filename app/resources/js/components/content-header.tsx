import { Link } from '@inertiajs/react';
import LogoImage from '@/images/favicon.svg';


export function ContentHeader() {
    return (
        <header className="fixed mb-6 w-full text-lg py-2 text-[#494544] bg-[#ffffff]">
            <div className="flex justify-between mx-auto items-center lg:max-w-4xl px-4 sm:px-12 py-2 gap-4 font-bold">
                <span className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm"><img src={LogoImage} alt="until 80" loading="eager" /></div>
                    <Link href="/">80歳まで続けるサイト</Link>
                </span>
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
    );
}
