<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Models\Comic;
use App\Models\Category;
use League\HTMLToMarkdown\HtmlConverter;

class ImportLegacyComics extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:legacy-comics
                            {--dry-run: 保存せずに件数だけ}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '旧サイトのコミックエッセイをcomicsテーブルへ移行する';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $query = DB::table('comics_yuru')->orderBy('id');
        $converter = new HtmlConverter([
            'strip_tags' => true, // 不要タグ除去
        ]);

        $rows = $query->get();
        $this->info("対象件数: {$rows->count()}" );

        try {
            foreach ($rows as $row) {
                if ($row->id == 1 || $row->id == 2) {
                    continue;
                }
                $markdown = $converter->convert($row->text ?? '');

                $categoryId = $row->c3;
                // 「はじめに」を「人が怖かった」に統合
                if ($categoryId == 2 || $categoryId == '2') {
                    $categoryId = 3;
                }
                $category = Category::find($categoryId);
                $contentId = $category->content_id;

                $sortOrder = ($categoryId == 3) ? $row->c3num + 1 : $row->c3num;
                if ($row->id == 3) {
                    $sortOrder = 1;
                }

                $data = [
                    'id' => $row->id,
                    'title' => $row->title,
                    'category_id' => $categoryId,
                    'content_id' => $contentId,
                    'created_at' => $row->date,
                    'updated_at' => $row->date,
                    'body' => $markdown,
                    'status' => 'published',
                    'sort_order' => $sortOrder,
                ];
                $comic = new Comic();
                $comic->timestamps = false;
                $comic->fill($data);
                $comic->saveQuietly();
            }

        } catch (\Throwable $e) {
            DB::rollBack();
            $this->error($e->getMessage());
            return self::FAILURE;
        }
    }
}
