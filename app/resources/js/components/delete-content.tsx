import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@inertiajs/react';
import { destroy } from '@/routes/contents';

export default function DeleteContent({
    contentId
}: {
    contentId: number
}) {

    return (

                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant="destructive"
                            data-test="delete-user-button"
                        >
                            削除
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>
                            コンテンツを削除して良いですか？
                        </DialogTitle>
                        <DialogDescription>
                           一度削除すると、復元できません。
                        </DialogDescription>

                        <Form
                            {...destroy.form(contentId)}
                            options={{
                                preserveScroll: true,
                            }}
                            resetOnSuccess
                            className="space-y-6"
                        >
                            {({ resetAndClearErrors, processing }) => (
                                <>
                                    <div className="grid gap-2">
                                    </div>

                                    <DialogFooter className="gap-2">
                                        <DialogClose asChild>
                                            <Button
                                                variant="secondary"
                                                onClick={() =>
                                                    resetAndClearErrors()
                                                }
                                            >
                                                キャンセル
                                            </Button>
                                        </DialogClose>

                                        <Button
                                            variant="destructive"
                                            disabled={processing}
                                            asChild
                                        >
                                            <button
                                                type="submit"
                                                data-test="confirm-delete-user-button"
                                            >
                                                削除する
                                            </button>
                                        </Button>
                                    </DialogFooter>
                                </>
                            )}
                        </Form>
                    </DialogContent>
                </Dialog>
    );
}
