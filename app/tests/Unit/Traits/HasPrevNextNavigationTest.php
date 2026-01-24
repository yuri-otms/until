<?php

namespace Tests\Unit\Traits;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Post;
use App\Models\Category;
use App\Models\Content;

class HasPrevNextNavigationTest extends TestCase
{
    use RefreshDatabase;

    public function test_same_category_previous_and_next_are_resolved(): void
    {
        $content = Content::factory()->create([
            'has_categories' => true,
        ]);
        $category = Category::factory()->create([
            'content_id' => $content->id
        ]);
        Post::factory()->create([
            'category_id' => $category->id,
            'content_id' => $content->id,
        ]);
        Post::factory()->create([
            'category_id' => $category->id,
            'content_id' => $content->id,
        ]);
        Post::factory()->create([
            'category_id' => $category->id,
            'content_id' => $content->id,
        ]);

        // sort_order 3
        $post1 = Post::find(1);
        // sort_order 2
        $post2 = Post::find(2);
        // sort_order 1
        $post3 = Post::find(3);

        $this->assertTrue($post2->previous()->is($post3));

        $this->assertTrue($post2->next()->is($post1));
    }

    public function test_previous_falls_back_to_previous_category_last_post()
    {
        $content = Content::factory()->create([
            'has_categories' => true,
        ]);
        Category::factory()->create([
            'id' => 1,
            'content_id' => $content->id,
        ]);
        Category::factory()->create([
            'id' => 2,
            'content_id' => $content->id,
        ]);
        Post::factory()->create([
            'category_id' => 2,
            'content_id' => 1,
        ]);
        Post::factory()->create([
            'category_id' => 2,
            'content_id' => 1,
        ]);
        Post::factory()->create([
            'category_id' => 1,
            'content_id' => 1,
        ]);
        // sort_order 2
        $postC1 = Post::find(1);
        // sort_order 1
        $postC2 = Post::find(3);

        $this->assertTrue($postC2->previous()->is($postC1));
    }

    public function test_next_when_category_is_not_set()
    {
        $content1 = Content::factory()->create([
            'has_categories' => false
        ]);
        $content2 = Content::factory()->create([
            'has_categories' => false
        ]);

        Post::factory()->create([
            'content_id' => $content1->id,
            'category_id' => 0
        ]);
        Post::factory()->create([
            'content_id' => $content2->id,
            'category_id' => 0
        ]);
        Post::factory()->create([
            'content_id' => $content2->id,
            'category_id' => 0
        ]);
        $post1_1 = Post::find(1);
        $post2_1 = Post::find(2);
        $post2_2 = Post::find(3);

        $this->assertNull($post1_1->next());
        $this->assertTrue($post2_2->next()->is($post2_1));
    }

        public function test_previous_when_category_is_not_set()
    {
        $content1 = Content::factory()->create([
            'has_categories' => false
        ]);
        $content2 = Content::factory()->create([
            'has_categories' => false
        ]);

        Post::factory()->count(3)->create([
            'content_id' => $content1->id,
            'category_id' => null
        ]);
        Post::factory()->count(3)->create([
            'content_id' => $content2->id,
            'category_id' => null
        ]);
        $post2_1 = Post::find(4);
        $post2_2 = Post::find(5);
        $post2_3 = Post::find(6);

        $this->assertNull($post2_3->previous());
        $this->assertTrue($post2_1->previous()->is($post2_2));
    }
}
