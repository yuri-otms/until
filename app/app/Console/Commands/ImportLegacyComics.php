<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Models\Post;
use App\Models\Category;
use Illuminate\Support\Str;

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

        $rows = $query->get();
        $this->info("対象件数: {$rows->count()}" );

        try {
            foreach ($rows as $row) {
                $category = Category::find($row->c3);
                $content_id = $category->content_id;

                $data = [
                    'id' => $row->id,
                    'title' => $row->title,
                    'category_id' => $row->c3,
                    'content_id' => $content_id,
                    'created_at' => $row->date,
                    'updated_at' => $row->date,
                    'body' => $row->text,
                    'status' => 'published',
                ];
                Post::create($data);
            }

        } catch (\Throwable $e) {
            DB::rollBack();
            $this->error($e->getMessage());
            return self::FAILURE;
        }
    }
}
