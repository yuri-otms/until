import { type BreadcrumbItem, type Content, type Theme, type ContentType } from "@/types";
import AppLayout from '@/layouts/app-layout';
import AdminLayout from '@/layouts/admin/layout';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { Label } from '@/components/ui/label';
import { Form, Head } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import InputError from '@/components/input-error';
import { index, update } from '@/routes/admin/contents'

export default function Edit({
    content,
    themes,
    contentTypeOptions,
}: {
    content: Content;
    themes: Theme[];
    contentTypeOptions: ContentType[];
}) {
    const breadcrubms: BreadcrumbItem[] = [
        {
            title: 'コンテンツ設定',
            href: index({query: {theme_id: content.theme_id}}).url,
        },
        {
            title: '編集',
            href: '',
        }
    ];
    return (
        <AppLayout breadcrumbs={breadcrubms}>
            <Head title="コンテンツ新規作成" />
            <AdminLayout title="コンテンツ設定">
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
                                    tabIndex={1}
                                    autoFocus
                                    autoComplete="name"
                                    name="name"
                                    placeholder=""
                                    />
                                    <InputError
                                        message={errors.title}
                                        className="mt-2"
                                    />
                                    <Label htmlFor="display_name">コンテンツ名(表示)</Label>
                                     <Textarea
                                    id="display_name"
                                    tabIndex={2}
                                    defaultValue={content.display_name}
                                    name="display_name"
                                    placeholder=""
                                    />
                                    <InputError
                                        message={errors.display_name}
                                        className="mt-2"
                                    />
                                    <Label htmlFor="slug">slug</Label>
                                    <Input
                                        id="slug"
                                        defaultValue={content.slug}
                                        type="text"
                                        tabIndex={3}
                                        autoComplete="slug"
                                        name="slug"
                                        placeholder=""
                                        />
                                    <InputError
                                        message={errors.slug}
                                        className="mt-2"
                                    />
                                    <Label htmlFor="url">URL</Label>
                                    <Input
                                        id="url"
                                        defaultValue={content.url}
                                        type="text"
                                        tabIndex={4}
                                        autoComplete="url"
                                        name="url"
                                        placeholder=""
                                        />
                                    <InputError
                                        message={errors.url}
                                        className="mt-2"
                                    />
                                    <Label htmlFor="theme_id">テーマ</Label>
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

                                    <Label htmlFor="type">投稿タイプ</Label>
                                    <RadioGroup defaultValue={content.type} name="type">
                                        {contentTypeOptions.map((row) => (
                                            <div
                                            key={row.key}
                                            className="flex items-center gap-3">
                                                <RadioGroupItem value={row.key} id={row.key} />
                                                <Label htmlFor={row.key}>{row.label}</Label>
                                                </div>
                                        ))}
                                    </RadioGroup>
                                    <InputError
                                        message={errors.status}
                                        className="mt-2"
                                    />


                                    <Label htmlFor="description">説明文</Label>
                                     <Textarea
                                    id="description"
                                    defaultValue={content.description}
                                    tabIndex={5}
                                    name="description"
                                    placeholder=""
                                    />
                                    <InputError
                                        message={errors.description}
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

            </AdminLayout>
        </AppLayout>
    );
}
