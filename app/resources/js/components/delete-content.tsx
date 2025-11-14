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
import { onDeleteClick } from '@/types';


export default function DeleteContent({
    model,
    model_id,
    onDeleteClick
}: {
    model: string;
    model_id: number;
    onDeleteClick : onDeleteClick;
}) {

    const handleClick = () => {
        onDeleteClick(model_id);
    }

    return (

                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant="destructive"
                            className="hover:cursor-pointer hover:bg-[#dddddd]"
                        >
                            削除
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>
                            {model}を削除して良いですか？
                        </DialogTitle>
                        <DialogDescription>
                           一度削除すると、復元できません。
                        </DialogDescription>

                        <Form
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
                                            onClick={handleClick}
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
