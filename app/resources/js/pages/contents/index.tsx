import { type BreadcrumbItem, type Content, type ContentGroup } from "@/types";
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
import { edit, create, destroy } from '@/routes/contents';
import DeleteContent from '@/components/delete-content';

const breadcrubms: BreadcrumbItem[] = [
    {
        title: 'コンテンツ設定',
        href: dashboard().url,
    },
];

export default function Index({
    contentGroup
}: {
    contentGroup: ContentGroup[]
}) {
    return (
        <AppLayout breadcrumbs={breadcrubms}>
            <Head title="コンテンツ設定" />
            <ContentsLayout title="コンテンツ設定" create={create().url}>
            {contentGroup.map((themeRow) => (
                <div>
                <h3 className="py-2 font-bold">{themeRow.themeName}</h3>
                <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>コンテンツ</TableHead>
                        <TableHead>動作</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {themeRow.contents.map((row) => (
                            <TableRow
                            key={row.id}
                            >
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>
                                    <LinkButton href={edit(row.id).url} className="bg-black">編集
                                    </LinkButton>
                                    <DeleteContent　model="コンテンツ" destroy={destroy.form(row.id)} />
                                </TableCell>
                            </TableRow>
                        ))
                        }
                    </TableBody>
                    </Table>
                </div>
                </div>
            ))}
            </ContentsLayout>

        </AppLayout>
    );
}
