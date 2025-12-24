<?php

namespace App\Console\Commands;


use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\DomCrawler\Crawler;
use League\HTMLToMarkdown\HtmlConverter;
use App\Models\Post;
use App\Models\Category;
use Carbon\Carbon;

class ImportLegacyHtml extends Command
{
    protected $signature = 'import:legacy-html';
    protected $description = 'Import old static HTML to posts';

    protected string $baseDir = 'storage/app/legacy/hikimemo/tips';

    protected array $targets = [
        7 => ['goingout', 'communication', 'arbeit'],
        8 => ['action', 'proactive', 'why_how'],
    ];

    public function handle()
    {

        try {
            foreach ($this->targets as $contentId => $dirs) {
                $this->info("Content Id: {$contentId}");

                $categorySortOrder = 1;
                $postSortOrder = 1;

                foreach ($dirs as $dir) {
                    $path = base_path("{$this->baseDir}/{$dir}");
                    $index = "{$path}/index.html";

                    if (!file_exists($index)) {
                        $this->warn("index.html not found: {$index}");
                        continue;
                    }

                    $this->line(" Dir: {$dir}");
                    $crawler = new Crawler(file_get_contents($index));
                    $currentCategory = null;

                    $crawler->filter('dl')->children()->each( function (Crawler $node) use(
                        &$currentCategory,
                        &$categorySortOrder,
                        &$postSortOrder,
                        $path,
                        $contentId,
                    ) {
                        // dt = カテゴリ
                        if ($node->nodeName() === 'dt') {
                            $name = trim($node->text());

                            $currentCategory = new Category([
                                'name' => $name,
                                'content_id' => $contentId,
                                'slug' => str()->slug($name),
                                'sort_order' => $categorySortOrder,
                            ]);
                            $currentCategory->saveQuietly();
                            $categorySortOrder++;
                            $this->line(" Category: {$name}");
                            $postSortOrder = 1;
                        }

                        if ($node->nodeName() === 'dd' && $currentCategory) {
                            $a = $node->filter('a');
                            $title = trim($a->text());
                            $href = $a->attr('href');
                            $file = "{$path}/{$href}";

                            if (!file_exists($file)) {
                                $this->warn("Missing: {$file}");
                                return;
                            }

                            $html = file_get_contents($file);
                            $articleCrawler = new Crawler($html);

                            $createdAt = $this->extractCreatedAt($articleCrawler);

                            $node = $articleCrawler->filter('div.article-contents.wrapper');

                            if ($node->count() === 0) {
                                throw new \RuntimeException('article-contents が見つかりません');
                            }
                            $innerHtml = $node->html();

                            if ($contentId == 7) {
                                $innerHtml = $this->convertDl($innerHtml);
                            }
                            $body = $this->htmlToMarkdown($innerHtml);

                            $post = new Post([
                                'title' => $title,
                                'body' => $body,
                                'content_id' => $contentId,
                                'category_id' => $currentCategory->id,
                                'sort_order' => $postSortOrder,
                                'status' => 'published',
                                'type' => 'post',
                                'created_at' => $createdAt,
                                'updated_at' => $createdAt,
                            ]);

                            $post->saveQuietly();
                            $this->line("{$postSortOrder}. {$title}");
                            $postSortOrder++;
                        }
                    });
                }
            }
        } catch (\Throwable $e) {
            $this->error($e->getMessage());
            return self::FAILURE;
        }


    }

    protected function htmlToMarkdown(string $html) : string
    {
        $converter = new HtmlConverter([
            'strip_tags' => true, // 不要タグ除去
        ]);
        return trim($converter->convert($html ?? ''));
    }

    protected function convertDl(string $html): string
    {
        $bodyCrawler = new Crawler($html);

        $bodyCrawler->filter('dt')->each(function (Crawler $dt) {
            $dom = $dt->getNode(0);
            $doc = $dom->ownerDocument;

            $h3 = $doc->createElement('h1', trim($dom->textContent));
            $dom->parentNode->replaceChild($h3, $dom);
        });

        $bodyCrawler->filter('dd')->each(function (Crawler $dt) {
            $dom = $dt->getNode(0);
            $doc = $dom->ownerDocument;

            $p = $doc->createElement('p');

            while ($dom->firstChild) {
                $p->appendChild($dom->firstChild);
            }

            $dom->parentNode->replaceChild($p, $dom);
        });

        $bodyCrawler->filter('dl')->each(function (Crawler $dl) {
            $dom = $dl->getNode(0);
            $parent = $dom->parentNode;

            while ($dom->firstChild) {
                $parent->insertBefore($dom->firstChild, $dom);
            }

            $parent->removeChild($dom);
        });

        return $bodyCrawler->html();
    }

    private function extractCreatedAt(Crawler $crawler): ?Carbon
    {
        $navs = $crawler->filter('p.nav');
        if ($navs->count() === 0) {
            return null;
        }

        $target = null;
        foreach ($navs as $p) {
            $html = $p->ownerDocument->saveHTML($p);
            if (stripos($html, '<br>') !== false) {
                $target = $html;
                break;
            }
        }
        if ($target == null) {
            $target = $navs->last()->outerHtml();
        }
        $text = trim(strip_tags($target));

        if (!preg_match('/\b(20\d{2})[.\/-](\d{1,2})[.\/-](\d{1,2})\b/u', $text, $m)) {
            return null;
        }

        $y = (int) $m[1];
        $mo = (int) $m[2];
        $d = (int) $m[3];

        try {
            return Carbon::create($y, $mo, $d, 0, 0, 0, 'Asia/Tokyo');
        } catch (\Throwable $e) {
            return null;
        }
    }
}
