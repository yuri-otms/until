<?php

namespace Tests\Unit\Traits;

use App\Models\Category;
use App\Models\Post;
use App\Models\Content;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class HasSortOrderTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic unit test example.
     */
    public function test_sort_order_is_compacted_in_old_category_web_moved(): void
    {
        $categoryA = Category::factory()->create();
        $categoryB = Category::factory()->create();

        $ids = [1,2,3,4,5];

        foreach ($ids as $id) {
            Post::factory()->create([
                            'category_id' => $categoryA->id,
                            'content_id' => $categoryA->content_id,
                            ]);
        }

        // カテゴリAの3つ目（sort_order3）を取得
        $post_3 = Post::find(3);
        $post_3->update(['category_id' => $categoryB->id]);

        $this->assertEquals(
            [1, 2, 3, 4],
            $categoryA->posts()->orderBy('sort_order')->pluck('sort_order')->toArray(),
        );
    }

    public function test_sort_order_is_appended_in_new_category_when_moved()
    {
        $categoryA = Category::factory()->create();
        $categoryB = Category::factory()->create();

        $ids = [1,2,3,4,5];

        foreach ($ids as $id) {
            Post::factory()->create([
                            'category_id' => $categoryB->id,
                            'content_id' => $categoryB->content_id,
                            ]);
        }
        foreach ($ids as $id) {
            Post::factory()->create([
                            'category_id' => $categoryA->id,
                            'content_id' => $categoryA->content_id,
                            ]);
        }

        // カテゴリAの3つ目（sort_order3）を取得
        $post = Post::find(8);

        $post->update(['category_id' => $categoryB->id]);

        $this->assertEquals(
            [1, 2, 3, 4, 5, 6],
            $categoryB->posts()->orderBy('sort_order')->pluck('sort_order')->toArray(),
        );

    }

    public function test_reorder_when_the_content_has_categories()
    {
        $content1 = Content::factory()->create(['has_categories' => true]);
        $content2 = Content::factory()->create(['has_categories' => true]);
        $category1_1 = Category::factory()->create(['content_id' => $content1->id]);
        $category1_2 = Category::factory()->create(['content_id' => $content1->id]);
        $category2_1 = Category::factory()->create(['content_id' => $content2->id]);

        Post::factory()->count(3)->create(['content_id' => $content1->id, 'category_id' => $category1_1->id]);
        Post::factory()->count(3)->create(['content_id' => $content1->id, 'category_id' => $category1_2->id]);
        Post::factory()->count(3)->create(['content_id' => $content2->id, 'category_id' => $category2_1->id]);

        $post3 = Post::where('category_id', $category1_2->id)
                    ->where('sort_order', 3)
                    ->first();

        $post3->reorder(3, 1);
        $this->assertEquals([
                3, 2, 1, 1, 3, 2, 3, 2, 1
            ],
            Post::orderBy('id')->pluck('sort_order')
            ->toArray()
        );
    }

    public function test_sort_order_is_set_when_content_has_no_categories()
    {
        $content1 = Content::factory()->create(['has_categories' => false]);
        $content2 = Content::factory()->create(['has_categories' => false]);

        // content1に3つ、content2に3つのpostを作成
        Post::factory()->count(3)->create(['content_id' => $content1->id, 'category_id' => 0]);
        Post::factory()->count(3)->create(['content_id' => $content2->id, 'category_id' => 0]);

        // content1のpostはcontent1内で1,2,3のsort_orderを持つ
        $content1Posts = Post::where('content_id', $content1->id)
                            ->orderBy('sort_order')
                            ->pluck('sort_order')
                            ->toArray();
        $this->assertEquals([1, 2, 3], $content1Posts);

        // content2のpostもcontent2内で1,2,3のsort_orderを持つ（独立している）
        $content2Posts = Post::where('content_id', $content2->id)
                            ->orderBy('sort_order')
                            ->pluck('sort_order')
                            ->toArray();
        $this->assertEquals([1, 2, 3], $content2Posts);
    }

    public function test_reorder_when_content_has_no_categories()
    {
        $content1 = Content::factory()->create(['has_categories' => false]);
        $content2 = Content::factory()->create(['has_categories' => false]);

        Post::factory()->count(5)->create(['content_id' => $content1->id, 'category_id' => 0]);
        Post::factory()->count(3)->create(['content_id' => $content2->id, 'category_id' => 0]);

        // content1の3番目のpostを1番目に移動（contentリレーションをロード）
        $post3 = Post::with('content')
                    ->where('content_id', $content1->id)
                    ->where('sort_order', 3)
                    ->first();

        $post3->reorder(3, 1);

        // content1のsort_orderが正しく並び替えられている
        $this->assertEquals(
            [5, 4, 1, 3, 2],
            Post::where('content_id', $content1->id)
                ->orderBy('id')
                ->pluck('sort_order')
                ->toArray()
        );

        // content2のsort_orderは影響を受けていない
        $this->assertEquals(
            [1, 2, 3],
            Post::where('content_id', $content2->id)
                ->orderBy('sort_order')
                ->pluck('sort_order')
                ->toArray()
        );
    }

    public function test_sort_order_is_updated_when_content_id_changed_for_content_without_categories()
    {
        $contentA = Content::factory()->create(['has_categories' => false]);
        $contentB = Content::factory()->create(['has_categories' => false]);

        // contentAに5個、contentBに3個のpostを作成
        Post::factory()->count(5)->create(['content_id' => $contentA->id, 'category_id' => 0]);
        Post::factory()->count(3)->create(['content_id' => $contentB->id, 'category_id' => 0]);

        // contentAのsort_order=3のpostを取得（id=3）
        $post = Post::with('content')
                    ->where('content_id', $contentA->id)
                    ->where('sort_order', 3)
                    ->first();

        // このpostをcontentBに移動
        $post->update(['content_id' => $contentB->id]);

        // contentAのsort_orderが正しく詰められている
        // 元: [5,4,3,2,1]（id順）、id=3(sort_order=3)が抜ける
        // id=3より大きいsort_order(4,5)がdecrement → id:1,2 が 4,3になる
        // 結果: [4,3,2,1]
        $this->assertEquals(
            [4, 3, 2, 1],
            Post::where('content_id', $contentA->id)
                ->orderBy('id')
                ->pluck('sort_order')
                ->toArray()
        );

        // contentBのsort_orderが正しく更新されている
        // 元: id:6,7,8 が sort_order: 3,2,1
        // 全てincrement → 4,3,2
        // 移動したpost(id=3)がsort_order=1として追加
        // sort_order順: [1,2,3,4]
        $this->assertEquals(
            [1, 2, 3, 4],
            Post::where('content_id', $contentB->id)
                ->orderBy('sort_order')
                ->pluck('sort_order')
                ->toArray()
        );

        // 移動したpostのsort_orderが1になっている
        $this->assertEquals(1, $post->fresh()->sort_order);
    }

}
