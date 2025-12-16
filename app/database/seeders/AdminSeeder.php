<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Theme;
use App\Models\Content;
use App\Models\Category;
use App\Models\Post;
use App\Models\Comic;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Theme::firstOrCreate(
            [
                'id' => 2,
                'name' => '読み物',
                'slug' => 'reading',
                'description' => 'noteの内容などのまとめ＋α'
            ]
        );
        Content::firstOrCreate(
            [
                'id' => 7,
                'name' => '30代後半未経験エンジニア転職',
                'display_name' => '30代後半未経験
                エンジニア転職',
                'slug' => 'engineer',
                'theme_id' => 2,
                'type' => 'post'
            ]
        );
        Category::firstOrCreate(
            [
                'id' => 38,
                'name' => 'エンジニアを目指すまで',
                'slug' => 'before',
                'content_id' => 7,
            ]
        );

        $markdown =  <<<MD
# はじめてのブログ記事

ようこそ！この記事は **サンプルのMarkdown記事** です。

## セクション1：これは見出しです

- 箇条書き１
- 箇条書き２
- 箇条書き３

> これは引用です。
> たとえばメモとして使えます。

---

## コードブロックの例

```php
echo "Hello World";
MD;

        Post::firstOrCreate(
            [
                'id' => 1,
                'title' => '10代のころ個人サイトを作っていた',
                'content_id' => 7,
                'category_id' => 38,
                'body' => $markdown,
                'status' => 'published'
            ]
        );

    }
}
