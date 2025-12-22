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
                            <DialogFooter className="gap-2">
                                <DialogClose asChild>
                                    <Button
                                        variant="secondary"
                                    >
                                        キャンセル
                                    </Button>
                                </DialogClose>

                                <Button
                                    variant="destructive"
                                    asChild
                                >
                                    <button
                                    onClick={handleClick}
                                    >
                                        削除する
                                    </button>
                                </Button>
                            </DialogFooter>
                    </DialogContent>
                </Dialog>
    );
}
