<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Content;
use App\Models\Category;
use App\Models\Theme;

class ComicSeeder extends Seeder
{
    public function run(): void
    {


        Theme::firstOrCreate(
            [
                'id' => 1,
                'name' => 'コミックエセ英',
                'slug' => 'comic_essay',
                'description' => '今までに描いてきたコミックエッセイです。'
            ]
        );
        /**
         * category2 → Content
         */
        $contents = [
            // category2.id => データ
            1 => ['name' => 'ひきこもりの時', 'slug' => 'hiki', 'sort_order' => 1],
            2 => ['name' => '少し動いてみる', 'slug' => 'move', 'sort_order' => 2],
            3 => ['name' => 'ひきこもり状態から学ぶ', 'slug' => 'learn', 'sort_order' => 3],
            4 => ['name' => 'ひきこもり状態から働く', 'slug' => 'work', 'sort_order' => 4],
            5 => ['name' => '身軽な生活', 'slug' => 'karu', 'sort_order' => 5],
            6 => ['name' => '生活のこと', 'slug' => 'life', 'sort_order' => 6],
            7 => ['name' => '外国語の勉強', 'slug' => 'languages', 'sort_order' => 7],
            8 => ['name' => '放送大学の記録', 'slug' => 'open_university', 'sort_order' => 8],
            9 => ['name' => 'プログラミング', 'slug' => 'programming', 'sort_order' => 9],
        ];


        $contentModels = [];

        foreach ($contents as $id => $data) {
            $contentModels[$id] = Content::create([
                'name' => $data['name'],
                'slug' => $data['slug'],
                'sort_order' => $data['sort_order'],
                'theme_id' => 1,
            ]);
        }

        /**
         * category3 → Category
         */
        $categories = [
            // category3.id => データ
            3 => [
                'content_id' => 1,
                'name' => '人が怖かった',
                'slug' => 'scary',
                'sort_order' => 2,
            ],
            4 => [
                'content_id' => 2,
                'name' => '無職の体力づくり計画',
                'slug' => 'build',
                'sort_order' => 1,
            ],
            5 => [
                'content_id' => 1,
                'name' => '脱ひきこもり',
                'slug' => 'escapte',
                'sort_order' => 4,
            ],
            6 => [
                'content_id' => 4,
                'name' => 'アルバイト応募から初日まで',
                'slug' => 'part_time',
                'sort_order' => 1,
            ],
            7 => [
                'content_id' => 1,
                'name' => '脱ひきこもり挫折後',
                'slug' => 'give_up',
                'sort_order' => 5,
            ],
            8 => [
                'content_id' => 1,
                'name' => 'ひきこもりで辛い時',
                'slug' => 'hard_time',
                'sort_order' => 3,
            ],
            9 => [
                'content_id' => 8,
                'name' => '元ひきこもりの放送大学生活',
                'slug' => 'moto_hiki',
                'sort_order' => 2,
            ],
            10 => [
                'content_id' => 3,
                'name' => '楽しいだけの外国語学習',
                'slug' => 'fun',
                'sort_order' => 3,
            ],
            11 => [
                'content_id' => 4,
                'name' => '私の仕事の最初の1ヶ月',
                'slug' => 'first_month',
                'sort_order' => 2,
            ],
            12 => [
                'content_id' => 2,
                'name' => '社交不安とコミュニケーション',
                'slug' => 'social_anxiety',
                'sort_order' => 2,
            ],
            13 => [
                'content_id' => 3,
                'name' => '不登校・ひきこもりと勉強',
                'slug' => 'hutoko',
                'sort_order' => 1,
            ],
            14 => [
                'content_id' => 2,
                'name' => 'ひきこもりバランス',
                'slug' => 'balance',
                'sort_order' => 3,
            ],
            15 => [
                'content_id' => 8,
                'name' => '放送大学日記',
                'slug' => 'ouj_diary',
                'sort_order' => 1,
            ],
            16 => [
                'content_id' => 5,
                'name' => '身軽な生活を目指して',
                'slug' => 'karui',
                'sort_order' => 1,
            ],
            17 => [
                'content_id' => 5,
                'name' => 'キャッシュレス生活',
                'slug' => 'cashless',
                'sort_order' => 2,
            ],
            18 => [
                'content_id' => 6,
                'name' => '料理日記',
                'slug' => 'cooking',
                'sort_order' => 1,
            ],
            19 => [
                'content_id' => 5,
                'name' => 'iPadでペーパーレス',
                'slug' => 'paperless',
                'sort_order' => 3,
            ],
            20 => [
                'content_id' => 5,
                'name' => 'カフェインレス生活',
                'slug' => 'decaf',
                'sort_order' => 4,
            ],
            21 => [
                'content_id' => 5,
                'name' => 'デジタル・ミニマリズム',
                'slug' => 'digital_minimalism',
                'sort_order' => 5,
            ],
            22 => [
                'content_id' => 5,
                'name' => '手放したもの',
                'slug' => 'throw_away',
                'sort_order' => 6,
            ],
            23 => [
                'content_id' => 7,
                'name' => '英検1級に向けて',
                'slug' => 'grade_1',
                'sort_order' => 10,
            ],
            24 => [
                'content_id' => 7,
                'name' => 'iPadと外国語学習',
                'slug' => 'ipad_language',
                'sort_order' => 1,
            ],
            25 => [
                'content_id' => 7,
                'name' => '韓国語の勉強',
                'slug' => 'korean',
                'sort_order' => 2,
            ],
            26 => [
                'content_id' => 9,
                'name' => 'C言語',
                'slug' => 'c_language',
                'sort_order' => 1,
            ],
            27 => [
                'content_id' => 7,
                'name' => 'ドイツ語の勉強',
                'slug' => 'german',
                'sort_order' => 3,
            ],
            28 => [
                'content_id' => 9,
                'name' => 'Java',
                'slug' => 'java',
                'sort_order' => 2,
            ],
            29 => [
                'content_id' => 7,
                'name' => '英語多読',
                'slug' => 'tadoku',
                'sort_order' => 4,
            ],
            30 => [
                'content_id' => 9,
                'name' => 'Macでプログラミング',
                'slug' => 'mac_programming',
                'sort_order' => 3,
            ],
            31 => [
                'content_id' => 9,
                'name' => '基本情報技術者試験',
                'slug' => 'fe',
                'sort_order' => 4,
            ],
            32 => [
                'content_id' => 9,
                'name' => 'PHP',
                'slug' => 'php',
                'sort_order' => 5,
            ],
            33 => [
                'content_id' => 9,
                'name' => 'MySQL',
                'slug' => 'mysql',
                'sort_order' => 6,
            ],
            34 => [
                'content_id' => 9,
                'name' => 'Python',
                'slug' => 'python',
                'sort_order' => 7,
            ],
            35 => [
                'content_id' => 9,
                'name' => 'Flask',
                'slug' => 'flask',
                'sort_order' => 8,
            ],
            36 => [
                'content_id' => 9,
                'name' => 'Git/GitHub',
                'slug' => 'git',
                'sort_order' => 9,
            ],
            37 => [
                'content_id' => 5,
                'name' => '手芸日記',
                'slug' => 'sewing',
                'sort_order' => 7,
            ],
        ];


        foreach ($categories as $category) {
            Category::create([
                'content_id' => $contentModels[$category['content_id']]->id,
                'name' => $category['name'],
                'slug' => $category['slug'],
                'sort_order' => $category['sort_order'],
            ]);
        }
    }
}
