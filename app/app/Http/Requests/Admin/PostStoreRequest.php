<?php

namespace App\Http\Requests\Admin;

use App\Models\Post;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PostStoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => [
                'required',
                'string',
                'max:255'
            ],
            'category_id' => [
                'required',
                'numeric'
            ],
            'body' => [
                'required',
            ],
            'status' => [
                'required',
            ],
            'published_at' => [
                'nullable',
                'date'
            ]
        ];
    }

}
