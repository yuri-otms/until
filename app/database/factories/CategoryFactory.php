<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Content;
use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory
{
    protected $model = Category::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'content_id' => Content::factory(),
            'name' => $this->faker->words(2, true),
            'slug' => $this->faker->unique()->slug(),
        ];
    }
}
