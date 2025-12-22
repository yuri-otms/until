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
import { dashboard } from '@/routes/admin';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Settings, House } from 'lucide-react';
import AppLogo from './app-logo';
import { index as contentIndex } from '@/routes/admin/contents'
import { index as themeIndex } from '@/routes/admin/themes'
import { index as categoryIndex } from '@/routes/admin/categories'
import { home } from '@/routes/'

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
    {
        title: 'Home',
        href: home(),
        icon: House,
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
