import { Link } from '@inertiajs/react';
import { Menu } from "lucide-react"
import LogoImage from '@/images/favicon.svg';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { home } from '@/routes';
import { type MenuItem } from '@/types';
import { about, profile, contact } from "@/routes/";


export function ContentHeader() {
    const links: MenuItem[] = [
      {
        title: 'このサイトについて',
        href: about().url,
      },
      {
        title: 'プロフィール',
        href: profile().url,
      },
      {
        title: 'お問い合わせ',
        href: contact().url,
      },
    ];
    return (
        <header className="fixed w-full text-lg py-4 text-[#494544] bg-[#ffffff] dark:text-white dark:bg-black">
            <div className="flex justify-between mx-auto items-center px-4 sm:px-12 gap-4 font-semibold">
                <span className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm"><img src={LogoImage} alt="until 80" loading="eager" /></div>
                    <Link href={ home() }>80歳まで続けるサイト</Link>
                </span>
                <nav className="justify-end text-sm font-medium gap-5">
                    <div className="hidden md:block">
                        {links.map((row, index) =>
                            <Link key={index} className="p-2" href={row.href}>{row.title}</Link>
                        )}
                    </div>
                    <div className="block md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <button className="border border-slate-500 p-1 border-radius rounded">
                                    <Menu className="h-6 w-6" />
                                </button>
                            </SheetTrigger>
                            <SheetContent side="right" className="p-6">
                                <nav className="flex flex-col space-y-4">
                                    {links.map((row, index) =>
                                        <Link key={index} className="" href={row.href}>{row.title}</Link>
                                    )}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </nav>
            </div>
        </header>
    );
}
