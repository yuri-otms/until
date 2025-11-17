import { useState } from "react";
import { type BreadcrumbItem, type Theme } from "@/types";
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
import { edit, create, destroy, reorder } from '@/routes/admin/themes';
import axios from 'axios';

import DeleteContent from '@/components/delete-content';

const breadcrubms: BreadcrumbItem[] = [
    {
        title: 'テーマ設定',
        href: dashboard().url,
    },
];

export default function Index({
    themes
}: {
    themes: Theme[]
}) {
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 5,
        }
    })

    const sensors = useSensors(mouseSensor);

    const [ displayedThemes, setThemes ] = useState<Theme[]>(themes);

    const handleDragEnd = (event:DragOverEvent) => {
        const { active, over } = event;
        if (over && active.id != over.id) {
            const oldIndex = displayedThemes.findIndex((theme) => theme.id === active.id);
            const newIndex = displayedThemes.findIndex((theme) => theme.id === over.id);

            if (oldIndex === -1 || newIndex === -1) return;

            setThemes((prevThemes) => {
                return arrayMove(prevThemes, oldIndex, newIndex);
            })

            const changedItem = displayedThemes[oldIndex];
            axios.put(reorder(changedItem.id).url, {
                oldIndex: oldIndex,
                newIndex: newIndex,
            });
        }
    }

    const deleteTheme = (deleteTheme: number) => {
        router.delete(
            destroy(deleteTheme).url,
        )
        setThemes((prevThemes) => {
            return prevThemes.filter(item => item.id !== deleteTheme)
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrubms}>
            <Head title="テーマ設定" />
            <AdminLayout title="テーマ設定" create={create().url}>
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
                        <TableHead>テーマ</TableHead>
                        <TableHead>動作</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <SortableContext items={displayedThemes}>
                        {displayedThemes.map((row) => (
                            <TableSortableRow
                            key={row.id}
                            model_id={row.id}
                            >
                                <TableSortableCell model_id={row.id} />
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell
                                    onClick={(e) => e.stopPropagation()}
                                    dada-dnd-cancel="true"
                                    >
                                    <LinkButton href={edit(row.id).url} className="bg-black">編集
                                    </LinkButton>
                                    <DeleteContent
                                    model="テーマ"
                                    model_id={row.id}
                                    onDeleteClick={deleteTheme}
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
            </AdminLayout>

        </AppLayout>
    );
}
