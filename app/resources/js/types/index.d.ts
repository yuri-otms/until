import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface MenuItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    adminSidebarContents: NavItem[];
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Theme {
    id: number;
    name: string;
    slug: string;
    description: string;
    sort_order: number;
}

export interface Content {
    id: number;
    name: string;
    display_name: string;
    slug: string;
    theme_id: string;
    type: string;
    sort_order: number;
    description: string;
}

export interface ContentType {
    key: string;
    label: string;
}


export interface Category {
    id: number;
    name: string;
    slug: string;
    content_id: string;
    sort_order: number;
}

export interface Post {
    id: number;
    title: string;
    sort_order: number;
    category_id: number;
    content_id: number;
    body: string;
    status: string;
    created_at: string;
    updated_at: string;
    url: string;
}
export interface Comic {
    id: number;
    title: string;
    sort_order: number;
    category_id: number;
    content_id: number;
    body: string;
    status: string;
    created_at: string;
    updated_at: string;
    url: string;
}

export interface PostStatus {
    key: string;
    label: string;
}

export interface ContentGroup {
    id: number;
    name: string;
    description: string;
    contents: Content[];
}

export interface PostGroup {
    id: number;
    name: string;
    description: string;
    posts: Post[];
}

export interface ComicGroup {
    id: number;
    name: string;
    description: string;
    comics: Comic[];
}

export type onThemeChange = (newTheme: string) => void;
export type onDeleteClick = (deleteContent: number) => void;
