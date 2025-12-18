<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\DomCrawler\Crawler;
use League\HTMLToMarkdown\HtmlConverter;
use App\Models\Post;

class ImportLegacyHtml extends Command
{
    protected $signature = 'import:legacy-html';
    protected $description = 'Import old static HTML to posts';

    public function handle()
    {
        $files = Storage::disk('legacy')->files('hikimemo/tips/goingout');

        $converter = new HtmlConverter([
            'strip_tags' => true,
        ]);

        foreach ($files as $file) {
            $html = Storage::disk('legacy')->get($file);
            $crawler = new Crawler($html);
            $title = $crawler->filter('h2')->text();
            dd($title);
        }

    }
}
