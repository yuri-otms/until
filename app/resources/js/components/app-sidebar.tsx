import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Settings } from 'lucide-react';
import AppLogo from './app-logo';
import { index as contentIndex } from '@/routes/contents'
import { index as themeIndex } from '@/routes/themes'
import { index as categoryIndex } from '@/routes/categories'


// const mainNavItems: NavItem[] = [
//     {
//         title: 'Home',
//         href: home(),
//         icon: House,
//     },
//     {
//         title: 'ダッシュボード',
//         href: dashboard(),
//         icon: LayoutGrid,
//     },
// ];

const footerNavItems: NavItem[] = [
    {
        title: 'カテゴリー設定',
        href: categoryIndex(),
        icon: Settings,
    },
    {
        title: 'コンテンツ設定',
        href: contentIndex(),
        icon: Settings,
    },
    {
        title: 'テーマ設定',
        href: themeIndex(),
        icon: Settings,
    },
];

export function AppSidebar() {
    const adminSidebarContents = usePage<SharedData>().props.adminSidebarContents;
    const mainNavItems: NavItem[] = adminSidebarContents;
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
