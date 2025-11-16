import { type BreadcrumbItem, type Content, type Category, type Post } from "@/types";
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
import { index, update } from '@/routes/posts'

export default function Edit({
    content,
    categories,
    post,
}: {
    content: Content;
    categories: Category[];
    post: Post;
}) {
    const pageName = content.name + '記事投稿';
    const breadcrubms: BreadcrumbItem[] = [
        {
            title: pageName,
            href: index().url,
        },
        {
            title: '編集',
            href: '',
        }
    ];
    return (
        <AppLayout breadcrumbs={breadcrubms}>
                <Head title="記事編集" />
                <ContentsLayout title={pageName}>
                <Form
                    {...update.form(post.id)}
                    resetOnSuccess={['password', 'password_confirmation']}
                    disableWhileProcessing
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">記事タイトル</Label>

                                    <Input
                                    id="title"
                                    defaultValue={post.title}
                                    type="text"
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="title"
                                    name="title"
                                    placeholder=""
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                    <Label htmlFor="slug">slug</Label>
                                    <Input
                                        id="slug"
                                        defaultValue={post.slug}
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
                                    <Label htmlFor="name">カテゴリー</Label>
                                    <RadioGroup defaultValue={post.category_id.toString()} name="category_id">
                                        {categories.map((row) => (
                                            <div
                                            key={row.id}
                                            className="flex items-center gap-3">
                                                <RadioGroupItem value={row.id.toString()} id={row.id.toString()} />
                                                <Label htmlFor={row.id.toString()}>{row.name}</Label>
                                             </div>
                                        ))}
                                    </RadioGroup>
                                    <InputError
                                        message={errors.category_id}
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
