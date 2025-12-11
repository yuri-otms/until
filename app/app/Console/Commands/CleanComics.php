<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class CleanComics extends Command
{
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
