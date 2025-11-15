<?php

namespace App\Http\Requests\Admin;

use App\Models\Category;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CategoryStoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique(Category::class)
            ],
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique(Category::class)
            ],
            'content_id' => [
                'required',
                'numeric'
            ],
        ];
    }

}
