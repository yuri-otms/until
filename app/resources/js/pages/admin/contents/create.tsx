import { type BreadcrumbItem, type Theme, type ContentType, type PostStatus } from "@/types";
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
import { store } from '@/routes/admin/contents';
import { index } from '@/routes/admin/contents'


export default function Create({
    themes,
    theme,
    contentTypeOptions,
    postStatusOptions
} : {
    themes: Theme[];
    theme: Theme;
    contentTypeOptions: ContentType[];
    postStatusOptions: PostStatus[];
}) {
    const breadcrubms: BreadcrumbItem[] = [
        {
            title: 'コンテンツ設定',
            href: index({query: { theme_id: theme.id}}).url,
        },
        {
            title: '新規作成',
            href: '',
        }
    ];
    const defaultTheme: string = theme.id.toString();

    return (
        <AppLayout breadcrumbs={breadcrubms}>
            <Head title="コンテンツ新規作成" />
            <AdminLayout title="コンテンツ設定">
                <Form
                    {...store.form()}
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
                                    <Label htmlFor="display_name">コンテンツ名(表示)</Label>
                                    <Textarea
                                        id="display_name"
                                        name="display_name"
                                        tabIndex={2}
                                        />

                                    <InputError
                                        message={errors.display_name}
                                        className="mt-2"
                                    />
                                    <Label htmlFor="slug">slug</Label>
                                    <Input
                                        id="slug"
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
                                    <Label htmlFor="theme">テーマ</Label>
                                    <RadioGroup defaultValue={defaultTheme} name="theme_id">
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
                                    <RadioGroup defaultValue={contentTypeOptions[0].key} name="type">
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

                                    <Label htmlFor="status">掲載状態</Label>
                                    <RadioGroup defaultValue={postStatusOptions[0].key} name="status">
                                        {postStatusOptions.map((row) => (
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
                                        name="description"
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
                                        新規作成
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
