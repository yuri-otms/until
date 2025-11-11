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
} from "@/components/ui/table"
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
    return (
        <AppLayout breadcrumbs={breadcrubms}>
            <Head title="テーマ設定" />
            <ContentsLayout title="テーマ設定" create={create().url}>
                <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>テーマ</TableHead>
                        <TableHead>動作</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {themes.map((row) => (
                            <TableRow
                            key={row.id}
                            >
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>
                                    <LinkButton href={edit(row.id).url} className="bg-black">編集
                                    </LinkButton>
                                    <DeleteContent model="テーマ" destroy={destroy.form(row.id)} />
                                </TableCell>
                            </TableRow>
                        ))
                        }
                    </TableBody>
                    </Table>
                </div>
            </ContentsLayout>

        </AppLayout>
    );
}
