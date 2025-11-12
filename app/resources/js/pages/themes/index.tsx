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
import { edit, create, destroy } from '@/routes/themes';
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
    console.log(displayedThemes);
    console.log(themes);
    const handleDragOver = (event:DragOverEvent) => {
        const { active, over } = event;

        if (over && active.id != over.id) {
            setThemes((prevThemes) => {
                const oldIndex = prevThemes.findIndex((theme) => theme.id === active.id);
                const newIndex = prevThemes.findIndex((theme) => theme.id === over.id);
                console.log('oldindex=' + oldIndex + ', newindex=' + newIndex);
                console.log(themes);
                return arrayMove(prevThemes, oldIndex, newIndex);
            })

            // TODO:Laravelに変更するModelId、新しい順番等必要な数字を送る

        }
    }



    return (
        <AppLayout breadcrumbs={breadcrubms}>
            <Head title="テーマ設定" />
            <ContentsLayout title="テーマ設定" create={create().url}>
                <div className="overflow-hidden rounded-md border">
                <DndContext onDragOver={handleDragOver}>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>テーマ</TableHead>
                        <TableHead>動作</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <SortableContext items={themes}>
                        {displayedThemes.map((row) => (
                            <TableSortableRow
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
