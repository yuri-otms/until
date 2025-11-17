import { useState } from "react";
import { type BreadcrumbItem, type Content, type Category } from "@/types";
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
    useSensor,
    useSensors,
    type DragOverEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { LinkButton } from "@/components/ui/link-button";
import { Head, router } from '@inertiajs/react';
import { index, edit, create, destroy, reorder } from '@/routes/admin/categories';
import axios from 'axios';

import DeleteContent from '@/components/delete-content';

const breadcrubms: BreadcrumbItem[] = [
    {
        title: 'カテゴリー設定',
        href: dashboard().url,
    },
];

export default function Index({
    contents,
    categories,
    content
} : {
    contents: Content[];
    categories: Category[];
    content: Content;
}) {
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 5,
        }
    })
    const sensors = useSensors(mouseSensor);

    const [ activeContent, setSelectedContentId ] = useState(content.id.toString());

    const [ displayedCategories, setCategories ] = useState<Category[]>(categories);

    const handleDragEnd = (event:DragOverEvent) => {
        const { active, over } = event;
        if (over && active.id != over.id) {
            const oldIndex = displayedCategories.findIndex((item) => item.id === active.id);
            const newIndex = displayedCategories.findIndex((item) => item.id === over.id);

            if (oldIndex === -1 || newIndex === -1) return;

            setCategories((prevCategories) => {
                return arrayMove(prevCategories, oldIndex, newIndex);
            })

            const changedItem = displayedCategories[oldIndex];
            axios.put(reorder(changedItem.id).url, {
                oldIndex: oldIndex,
                newIndex: newIndex,
            })
        }
    }

    const handleContentChange = (newContent: string) => {
        setSelectedContentId(newContent);
        router.get(
            index(),
            { content_id : newContent },
            { preserveScroll: true }
        );
    }

    const deleteCategory = (deleteCategory: number) => {
        router.delete(
            destroy(deleteCategory).url,
        )
        setCategories((prevCategories) => {
            return prevCategories.filter(item => item.id !== deleteCategory);
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrubms}>
            <Head title="カテゴリー設定" />
            <AdminLayout title="カテゴリー設定" create={create().url}>
                <div>
                    <ThemeSelect themes={contents} activeTheme={activeContent} onThemeChange={handleContentChange} />
                    <div className="overflow-hidden rounded-md border">
                    <DndContext
                        onDragEnd={handleDragEnd}
                        sensors={sensors}
                    >
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>順番</TableHead>
                            <TableHead>ID</TableHead>
                            <TableHead>コンテンツ</TableHead>
                            <TableHead>動作</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <SortableContext
                            items={displayedCategories}
                            >
                            {displayedCategories.map((row) => (
                                <TableSortableRow
                                key={row.id}
                                model_id={row.id}
                                >
                                    <TableSortableCell model_id={row.id} />
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell
                                    dada-dnd-cancel="true"
                                    >
                                        <LinkButton href={edit(row.id).url} className="bg-black">編集
                                        </LinkButton>
                                        <DeleteContent
                                        model="コンテンツ"
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
