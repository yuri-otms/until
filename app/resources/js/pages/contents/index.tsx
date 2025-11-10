import { BreadcrumbItem } from "@/types";
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

const breadcrubms: BreadcrumbItem[] = [
    {
        title: 'コンテンツ設定',
        href: dashboard().url,
    },
];

const data: Payment[] = [
  {
    id: 1,
    name: '未経験エンジニア転職',
  },
  {
    id: 2,
    name: 'アプリ',
  }
]
export type Payment = {
  id: number
  name: string
}

export default function Contents() {
    return (
        <AppLayout breadcrumbs={breadcrubms}>
            <Head title="コンテンツ設定" />
            <ContentsLayout>
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
                        {data.map((row) => (
                            <TableRow
                            key={row.id}
                            >
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>
                                    <LinkButton href="/" className="bg-green-300">編集
                                    </LinkButton>
                                    <LinkButton href="/" className="bg-red-300">削除
                                    </LinkButton>
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
