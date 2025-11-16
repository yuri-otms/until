import { type BreadcrumbItem, type Content, type Theme } from "@/types";
import AppLayout from '@/layouts/app-layout';
import ContentsLayout from '@/layouts/contents/layout';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { Label } from '@/components/ui/label';
import { Form, Head } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { index, update } from '@/routes/contents'

const breadcrubms: BreadcrumbItem[] = [
    {
        title: 'コンテンツ設定',
        href: index().url,
    },
    {
        title: '編集',
        href: '',
    }
];
export default function Edit({
    content,themes
}: {
    content: Content;
    themes: Theme[];
}) {
    return (
        <AppLayout breadcrumbs={breadcrubms}>
            <Head title="コンテンツ新規作成" />
            <ContentsLayout title="コンテンツ設定">
                <Form
                    {...update.form(content.id)}
                    resetOnSuccess={['password', 'password_confirmation']}
                    disableWhileProcessing
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">コンテンツ名</Label>
                                                                                                <Input
                                    id="name"
                                    defaultValue={content.name}
                                    type="text"
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder=""
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                    <Label htmlFor="slug">slug</Label>
                                    <Input
                                        id="slug"
                                        defaultValue={content.slug}
                                        type="text"
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="slug"
                                        name="slug"
                                        placeholder=""
                                        />
                                    <InputError
                                        message={errors.slug}
                                        className="mt-2"
                                    />
                                    <Label htmlFor="name">テーマ</Label>
                                    <RadioGroup defaultValue={content.theme_id.toString()} name="theme_id">
                                        {themes.map((row) => (
                                            <div
                                            key={row.id}
                                            className="flex items-center gap-3">
                                                <RadioGroupItem value={row.id.toString()} id={row.id.toString()} />
                                                <Label htmlFor={row.id.toString()}>{row.name}</Label>
                                             </div>
                                        ))}
                                    </RadioGroup>
                                    <InputError
                                        message={errors.theme_id}
                                        className="mt-2"
                                    />
                                    <Button
                                        type="submit"
                                        className="mt-2 w-full"
                                        tabIndex={5}
                                        data-test="register-user-button"
                                    >
                                        {processing && <Spinner />}
                                        更新
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </Form>

            </ContentsLayout>
        </AppLayout>
    );
}
