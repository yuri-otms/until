<?php

namespace Tests\Unit\Traits;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Post;
use App\Models\Category;

class HasPrevNextNavigationTest extends TestCase
{
    use RefreshDatabase;

    public function test_same_category_previous_and_next_are_resolved(): void
    {
        Post::factory()->create([
            'category_id' => 1,
            'content_id' => 1,
        ]);
        Post::factory()->create([
            'category_id' => 1,
            'content_id' => 1,
        ]);
        Post::factory()->create([
            'category_id' => 1,
            'content_id' => 1,
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
        Category::factory()->create([
            'id' => 1,
            'content_id' => 1,
        ]);
        Category::factory()->create([
            'id' => 2,
            'content_id' => 1,
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

    public function next_falls_back_to_next_category_first_post()
    {
        Post::factory()->create([
            'category_id' => 1,
            'content_id' => 1,
        ]);
        Post::factory()->create([
            'category_id' => 2,
            'content_id' => 1,
        ]);

        $postC1 = Post::find(1);
        $postC2 = Post::find(2);

        $this->assertTrue($postC1->next()->is($postC2));
    }
}
