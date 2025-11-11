import { type BreadcrumbItem, type Theme } from "@/types";
import AppLayout from '@/layouts/app-layout';
import ContentsLayout from '@/layouts/contents/layout';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Label } from '@/components/ui/label';
import { Form, Head } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { index, create, update } from '@/routes/themes'

const breadcrubms: BreadcrumbItem[] = [
    {
        title: 'テーマ設定',
        href: index().url,
    },
    {
        title: '編集',
        href: '',
    }
];
export default function Edit({
    theme
}: {
    theme: Theme
}) {
    return (
        <AppLayout breadcrumbs={breadcrubms}>
            <Head title="テーマ新規作成" />
            <ContentsLayout create={create().url} title="テーマ設定">
                <Form
                    {...update.form(theme.id)}
                    resetOnSuccess={['password', 'password_confirmation']}
                    disableWhileProcessing
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">テーマ名</Label>
                                                                                                <Input
                                    id="name"
                                    defaultValue={theme.name}
                                    type="text"
                                    required
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
