import { useState } from "react";
import { type BreadcrumbItem, type Content, type Category } from "@/types";
import { dashboard } from '@/routes';
import AppLayout from '@/layouts/app-layout';
import ContentsLayout from '@/layouts/contents/layout';import {
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
import { edit, create, destroy, reorder } from '@/routes/themes';
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
    categories: Categories[];
    content: Content;
}) {

    return (
        <AppLayout breadcrumbs={breadcrubms}>
            <Head title="カテゴリー設定" />
            <ContentsLayout title="カテゴリー設定" create={create().url}>

            </ContentsLayout>

        </AppLayout>
    );
}
