import { type BreadcrumbItem, type Theme } from "@/types";
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
import { store, create } from '@/routes/contents';
import { index } from '@/routes/contents'

const breadcrubms: BreadcrumbItem[] = [
    {
        title: 'コンテンツ設定',
        href: index().url,
    },
    {
        title: '新規作成',
        href: '',
    }
];

const themes: Theme[] = [
    {
        id: 1,
        name: '読み物',
    },
    {
        id: 2,
        name: 'プロフィール',
    },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrubms}>
            <Head title="コンテンツ新規作成" />
            <ContentsLayout title="コンテンツ設定" create={create().url}>
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
                                    <Label htmlFor="name">テーマ</Label>
                                    <RadioGroup defaultValue="1" name="theme_id">
                                        {themes.map((row) => (
                                            <div className="flex items-center gap-3">
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
                                        新規作成
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
