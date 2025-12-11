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
                'id' => 1,
                'name' => 'テーマ1',
                'slug' => 'theme1',
                'description' => 'テーマ1の説明文です'
            ]
        );
        Content::firstOrCreate(
            [
                'id' => 1,
                'name' => 'コンテンツ1',
                'display_name' => 'コンテンツ
1',
                'slug' => 'content1',
                'theme_id' => 1,
                'type' => 'post'
            ]
        );
        Content::firstOrCreate(
            [
                'id' => 2,
                'name' => '漫画1',
                'display_name' => '漫画
1',
                'slug' => 'comic1',
                'theme_id' => 1,
                'type' => 'comic'
            ]
        );
        Category::firstOrCreate(
            [
                'id' => 1,
                'name' => 'カテゴリー1',
                'slug' => 'category1',
                'content_id' => 1,
            ]
        );
        Category::firstOrCreate(
            [
                'id' => 2,
                'name' => '漫画カテゴリ1',
                'slug' => 'comic1',
                'content_id' => 2,
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
                'title' => 'デフォルトmarkdown記事',
                'content_id' => 1,
                'category_id' => 1,
                'body' => $markdown,
                'status' => 'published'
            ]
        );

        Post::firstOrCreate(
            [
                'id' => 2,
                'title' => 'test2',
                'content_id' => 1,
                'category_id' => 1,
                'body' => '',
                'status' => 'published'
            ]
        );

        Post::firstOrCreate(
            [
                'id' => 3,
                'title' => 'test3',
                'content_id' => 1,
                'category_id' => 1,
                'body' => '',
                'status' => 'published'
            ]
        );

        Comic::firstOrCreate(
            [
                'id' => 1,
                'title' => 'デフォルト漫画記事',
                'content_id' => 2,
                'category_id' => 2,
                'body' => '',
                'status' => 'published'
            ]
        );

        Comic::firstOrCreate(
            [
                'id' => 2,
                'title' => 'デフォルト漫画記事2',
                'content_id' => 2,
                'category_id' => 2,
                'body' => '',
                'status' => 'published'
            ]
        );

        Comic::firstOrCreate(
            [
                'id' => 3,
                'title' => 'デフォルト漫画記事3',
                'content_id' => 2,
                'category_id' => 2,
                'body' => '',
                'status' => 'published'
            ]
        );



    }
}
