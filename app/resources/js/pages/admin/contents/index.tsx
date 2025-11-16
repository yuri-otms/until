import { type BreadcrumbItem, type Content, type Theme } from "@/types";
import { dashboard } from '@/routes';
import AppLayout from '@/layouts/app-layout';
import AdminLayout from '@/layouts/contents/layout';import {
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
import { useState } from 'react';
import { index, edit, create, destroy, reorder } from '@/routes/contents';
import DeleteContent from '@/components/delete-content';
import axios from 'axios';


const breadcrubms: BreadcrumbItem[] = [
    {
        title: 'コンテンツ設定',
        href: dashboard().url,
    },
];

export default function Index({
    themes,
    contents,
    theme,
}: {
    themes: Theme[];
    contents: Content[];
    theme: Theme;
}) {
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 5,
        }
    })
    const sensors = useSensors(mouseSensor);

    const [ activeTheme, setSelectedThemeId ] = useState(theme.id.toString());

    const [ displayedContents, setContents ] = useState<Content[]>(contents);

    const handleDragEnd = (event:DragOverEvent) => {
        const { active, over } = event;
        if (over && active.id != over.id) {
            const oldIndex = displayedContents.findIndex((item) => item.id === active.id);
            const newIndex = displayedContents.findIndex((item) => item.id === over.id);

            if (oldIndex === -1 || newIndex === -1) return;

            setContents((prevContents) => {
                return arrayMove(prevContents, oldIndex, newIndex);
            })

            const changedItem = displayedContents[oldIndex];
            axios.put(reorder(changedItem.id).url, {
                oldIndex: oldIndex,
                newIndex: newIndex,
            })

        }
    }

    const handleThemeChange = (newTheme: string) => {
        setSelectedThemeId(newTheme);
        router.get(
            index(),
            { theme_id : newTheme },
            { preserveScroll: true }
        );
    }

    const deleteContent = (deleteContent: number) => {
        router.delete(
            destroy(deleteContent).url,
        )
        setContents((prevContents) => {
            return prevContents.filter(item => item.id !== deleteContent);
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrubms}>
            <Head title="コンテンツ設定" />
            <AdminLayout title="コンテンツ設定" create={create().url}>
                <div>
                    <ThemeSelect themes={themes} activeTheme={activeTheme} onThemeChange={handleThemeChange} />
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
                            items={displayedContents}
                            >
                            {displayedContents.map((row) => (
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
                                        model_id={row.id}onDeleteClick={deleteContent}
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
