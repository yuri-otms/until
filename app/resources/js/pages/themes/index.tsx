import { useState } from "react";
import { type BreadcrumbItem, type Theme } from "@/types";
import { dashboard } from '@/routes';
import AppLayout from '@/layouts/app-layout';
import ContentsLayout from '@/layouts/contents/layout';import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableSortableRow,
} from "@/components/ui/table"
import { DndContext, type DragOverEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { LinkButton } from "@/components/ui/link-button";
import { Head } from '@inertiajs/react';
import { edit, create, destroy, reorder } from '@/routes/themes';
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
    const [ displayedThemes, setThemes ] = useState<Theme[]>(themes);
    const handleDragEnd = (event:DragOverEvent) => {
        const { active, over } = event;
        if (over && active.id != over.id) {
            const oldIndex = displayedThemes.findIndex((theme) => theme.id === active.id);
            const newIndex = displayedThemes.findIndex((theme) => theme.id === over.id);

            if (oldIndex === -1 || newIndex === -1) return;

            const changedItem = displayedThemes[oldIndex];
            axios.put(reorder(changedItem.id).url, {
                oldIndex: oldIndex,
                newIndex: newIndex,
            });
            setThemes((prevThemes) => {
                return arrayMove(prevThemes, oldIndex, newIndex);
            })
        }
    }



    return (
        <AppLayout breadcrumbs={breadcrubms}>
            <Head title="テーマ設定" />
            <ContentsLayout title="テーマ設定" create={create().url}>
                <div className="overflow-hidden rounded-md border">
                <DndContext onDragEnd={handleDragEnd}>
                <Table>
                    <TableHeader>
                        <TableRow>
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
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>
                                    <LinkButton href={edit(row.id).url} className="bg-black">編集
                                    </LinkButton>
                                    <DeleteContent model="テーマ" destroy={destroy.form(row.id)} />
                                </TableCell>
                            </TableSortableRow>
                        ))
                        }
                        </SortableContext>
                    </TableBody>
                    </Table>
                    </DndContext>
                </div>
            </ContentsLayout>

        </AppLayout>
    );
}
