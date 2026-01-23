import { useState } from "react";
import { type BreadcrumbItem, type Post, type Category, type Content } from "@/types";
import { dashboard } from '@/routes/admin';
import AppLayout from '@/layouts/app-layout';
import AdminLayout from '@/layouts/admin/layout';import {
  Table,
  TableBody,
  TableCell,
  TableSortableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableSortableRow,
} from "@/components/ui/table"
import { ThemeSelect } from "@/components/theme-select";
import {
    DndContext,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    type DragOverEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { LinkButton } from "@/components/ui/link-button";
import { Head, router } from '@inertiajs/react';
import { index, edit, create, destroy, reorder } from '@/routes/admin/posts';
import axios from 'axios';
import { Search } from 'lucide-react';

import DeleteContent from '@/components/delete-content';


export default function Index({
    categories,
    category,
    content,
    posts
} : {
    category: Category | null;
    categories: Category[] | null;
    posts: Post[];
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

    const [ activeCategory, setSelectedCategoryId ] = useState(category?.id?.toString()) ?? "";

    const [ displayedPosts, setPosts ] = useState<Post[]>(posts);

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
                    <div className="overflow-hidden rounded-md border">
                    <DndContext
                        onDragEnd={handleDragEnd}
                        sensors={sensors}
                    >
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>順番</TableHead>
                            <TableHead>並び順</TableHead>
                            <TableHead>掲載</TableHead>
                            <TableHead>ID</TableHead>
                            <TableHead>タイトル</TableHead>
                            <TableHead>確認</TableHead>
                            <TableHead>動作</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <SortableContext
                            items={displayedPosts}
                            >
                            {displayedPosts.map((row) => (
                                <TableSortableRow
                                key={row.id}
                                model_id={row.id}
                                >
                                    <TableSortableCell model_id={row.id} />
                                    <TableCell>{row.sort_order}</TableCell>
                                    <TableCell>{row.status}</TableCell>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>
                                        <a href={"/contents/" + content.slug + '/post/' + row.id} target="_blank">
                                            <Search />
                                        </a>
                                    </TableCell>
                                    <TableCell
                                    dada-dnd-cancel="true"
                                    >
                                        <LinkButton target="_blank" href={edit(row.id).url} className="bg-black">編集
                                        </LinkButton>
                                        <DeleteContent
                                        model="記事"
                                        model_id={row.id}onDeleteClick={deleteCategory}
                                        />
                                    </TableCell>
                                </TableSortableRow>
                            ))
                            }
                        </SortableContext>
                        </TableBody>
                        </Table>
                        </DndContext>
                    </div>
                </div>

            </AdminLayout>

        </AppLayout>
    );
}
