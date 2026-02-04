import { useState } from "react";
import { type BreadcrumbItem, type Post, type Category, type Content, type Paginated } from "@/types";
import { dashboard } from '@/routes/admin';
import AppLayout from '@/layouts/app-layout';
import AdminLayout from '@/layouts/admin/layout';
import { ThemeSelect } from "@/components/theme-select";
import {
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    type DragOverEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Head, router } from '@inertiajs/react';
import { index, edit, create, destroy, reorder } from '@/routes/admin/posts';
import axios from 'axios';
import { PostsTable } from '@/components/posts-table';
import { PostsPagination } from '@/components/posts-pagination';


export default function Index({
    categories,
    category,
    content,
    posts
} : {
    category: Category | null;
    categories: Category[] | null;
    posts: Paginated<Post>;
    content: Content;
}) {
    const breadcrubms: BreadcrumbItem[] = [
        {
            title: content.name + '記事投稿',
            href: dashboard().url,
        },
    ];

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: { distance: 5 },
    });
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: { delay: 200, tolerance: 8 },
    });

    const sensors = useSensors(mouseSensor, touchSensor);

    const [ activeCategory, setSelectedCategoryId ] = useState<string>(category?.id?.toString() ?? "");

    // ページが変わったときに自動的にposts.dataから初期化
    const [ displayedPosts, setPosts ] = useState<Post[]>(posts.data);

    const handleDragEnd = (event:DragOverEvent) => {
        const { active, over } = event;
        if (over && active.id != over.id) {
            const oldIndex = displayedPosts.findIndex((item) => item.id === active.id);
            const newIndex = displayedPosts.findIndex((item) => item.id === over.id);

            if (oldIndex === -1 || newIndex === -1) return;

            setPosts((prevPosts) => {
                return arrayMove(prevPosts, oldIndex, newIndex);
            })

            const changedItem = displayedPosts[oldIndex];
            axios.put(reorder(changedItem.id).url, {
                oldIndex: oldIndex,
                newIndex: newIndex,
            })
        }
    }

    const handleCategoryChange = (newCategory: string) => {
        setSelectedCategoryId(newCategory);
        router.get(
            index({query: {
                content: content.slug,
                category_id: newCategory
            }}),
            { preserveScroll: true }
        );
    }

    const deleteCategory = (deletePost: number) => {
        router.delete(
            destroy(deletePost).url,
        )
        setPosts((prevPosts) => {
            return prevPosts.filter(item => item.id !== deletePost);
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrubms}>
            <Head title={content.name + '記事投稿'} />
            <AdminLayout title={content.name + '記事投稿'} create={create({query:{
                content: content.slug,
                category_id: category?.id,
                }}).url}>
                <div>
                    { categories ? <ThemeSelect themes={categories} activeTheme={activeCategory} onThemeChange={handleCategoryChange} /> : ''}

                    <PostsTable
                        displayedPosts={displayedPosts}
                        content={content}
                        contentType="post"
                        sensors={sensors}
                        handleDragEnd={handleDragEnd}
                        editUrl={(id) => edit(id).url}
                        onDelete={deleteCategory}
                    />

                    <PostsPagination paginated={posts} />
                </div>

            </AdminLayout>

        </AppLayout>
    );
}
