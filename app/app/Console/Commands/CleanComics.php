<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use App\Models\Comic;
use App\Trait\PreventsDuplicateImport;

class CleanComics extends Command
{
    use PreventsDuplicateImport;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'comics:clean';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clean comic except pattern *_<number>.png';

    /**
     * Execute the console command.
     */
    public function handle()
    {

        $this->abortIfAlreadyImported(
            fn () => Comic::where('title', 'これまでの経緯')
                ->where('content_id', 1)
                ->exists(),
            'Clean Comicは既に実行しました'
        );

        $files = Storage::disk('public')->files('images/comics');

        foreach ($files as $file) {
            $filename = basename($file);
            if (preg_match('/_\d+\.png/', $filename)) {
                continue;
            }

            Storage::disk('public')->delete($file);
            $this->info("Deleted: {$filename}");
        }

        $this->info('Image cleaning completed.');
        return Command::SUCCESS;
    }
}
