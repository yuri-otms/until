
import { Link } from '@inertiajs/react';
import { privacy } from '@/routes';

export function ContentFooter () {
    return (
        <footer className="sticky w-full py-5 bg-[#F5F5F5] text-[#494544] text-sm dark:text-white dark:bg-black">
            <div className="mx-auto items-center flex justify-between gap-4 px-6 sm:px-12">
                <div>
                @yuri All rights <br />
                <Link
                href={privacy().url}
                className="underline"
                >
                    プライバシーポリシー・免責事項
                </Link>
                </div>
            </div>
        </footer>
    );
}
