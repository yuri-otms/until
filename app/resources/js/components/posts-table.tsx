import {
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
    type DragOverEvent,
    type SensorDescriptor,
    type SensorOptions,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { LinkButton } from "@/components/ui/link-button";
import { Search } from 'lucide-react';
import DeleteContent from '@/components/delete-content';
import { type Content } from "@/types";

interface PostsTableProps<T extends { id: number; sort_order: number; status: string; title: string; published_at: string | null }> {
    displayedPosts: T[];
    content: Content;
    contentType: 'post' | 'comic';
    sensors: SensorDescriptor<SensorOptions>[];
    handleDragEnd: (event: DragOverEvent) => void;
    editUrl: (id: number) => string;
    onDelete: (id: number) => void;
}

const getPublicationStatus = (status: string, published_at: string | null): string => {
    if (status === 'draft') {
        return '下書き';
    }
    
    if (status === 'published' && published_at) {
        const now = new Date();
        const publishedDate = new Date(published_at);
        
        if (publishedDate > now) {
            return '公開前';
        }
        return '公開中';
    }
    
    return status;
};

const getStatusClassName = (status: string, published_at: string | null): string => {
    if (status === 'draft') {
        return 'bg-gray-200 dark:bg-gray-700';
    }
    
    if (status === 'published' && published_at) {
        const now = new Date();
        const publishedDate = new Date(published_at);
        
        if (publishedDate > now) {
            return 'bg-gray-200 dark:bg-gray-700';
        }
    }
    
    return '';
};

export function PostsTable<T extends { id: number; sort_order: number; status: string; title: string; published_at: string | null }>({
    displayedPosts,
    content,
    contentType,
    sensors,
    handleDragEnd,
    editUrl,
    onDelete,
}: PostsTableProps<T>) {
    return (
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
                        <SortableContext items={displayedPosts}>
                            {displayedPosts.map((row) => (
                                <TableSortableRow
                                    key={row.id}
                                    model_id={row.id}
                                    className={getStatusClassName(row.status, row.published_at)}
                                >
                                    <TableSortableCell model_id={row.id} />
                                    <TableCell>{row.sort_order}</TableCell>
                                    <TableCell>
                                        {getPublicationStatus(row.status, row.published_at)}
                                    </TableCell>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>
                                        <a href={"/contents/" + content.slug + '/' + contentType + '/' + row.id} target="_blank">
                                            <Search />
                                        </a>
                                    </TableCell>
                                    <TableCell dada-dnd-cancel="true">
                                        <LinkButton target="_blank" href={editUrl(row.id)} className="bg-black">
                                            編集
                                        </LinkButton>
                                        <DeleteContent
                                            model="記事"
                                            model_id={row.id}
                                            onDeleteClick={onDelete}
                                        />
                                    </TableCell>
                                </TableSortableRow>
                            ))}
                        </SortableContext>
                    </TableBody>
                </Table>
            </DndContext>
        </div>
    );
}
