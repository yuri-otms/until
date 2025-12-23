import ContentLayout from '@/layouts/content-layout'
import { type BreadcrumbItem } from '@/types'
import { home } from '@/routes'

export default function Index() {
    const title: string = 'このサイトについて';
    const breadcrubms: BreadcrumbItem[] = [
        {
            title: 'Top',
            href: home().url,
        },
        {
            title: title,
            href: '',
        }
    ];

    return (

        <ContentLayout breadcrumbs={breadcrubms} title={title}>
            <div className="text-sm py-2 mb-4">
                <div>2025年12月24日 公開</div>
            </div>
            <p>個人サイトです。</p>

            <h2 className="text-2xl font-bold mt-6 mb-4">主に取り扱う内容</h2>
            <p>私は不登校・ひきこもりから抜け出すのが非常に大変だったため、その体験談やノウハウをまとめています。</p>

            <p>コミックエッセイ（エッセイ漫画）が大好きなので、自分でも描けるようになりたいので、少しずつ描いていきたいです（3年描けていません…）。</p>

            <p>他のサイト(X、note、その他ブログ)で書いた内容がバラバラになっているので、最終的にはこのサイトに集約できれば良いなと思います。</p>

            <h2 className="text-2xl font-bold mt-6 mb-4">今後のコンテンツ予定</h2>

            <ul className="list-disc pl-6 mb-4">
                <li>未経験からのエンジニア就職・転職を目指す人向け記事</li>
                <li>マッチングアプリを使用した婚活記事</li>
            </ul>

            <p>主に、今までnote等にまとめた内容を、転載もしくは再編集して掲載する予定です。</p>

            <h2 className="text-2xl font-bold mt-6 mb-4">サイト名の背景</h2>

            <p>17歳の時、携帯電話を使って「魔法のiらんど」というサイトでウェブサイト作りを始めて23年。今までにいくつものウェブサイトを作っては削除、作っては削除、を繰り返してきました。</p>

            <p>そろそろどっしり腰を据えて運営するサイトを作ろう、という意気込みでこの名前としました。</p>


            <h2 className="text-2xl font-bold mt-6 mb-4">使用技術</h2>
            <ul className="list-disc pl-6 mb-4">
                <li>Laravel (PHP)</li>
                <li>React</li>
                <li>Inertia</li>
                <li>さくらのVPS 1G</li>
                <li>MySQL</li>
                <li>Docker</li>
                <li>Git/GitHub/GitHub Actions</li>
            </ul>

            <h2 className="text-2xl font-bold mt-6 mb-4">更新情報</h2>
            <ul className="list-disc pl-6 mb-4">
                <li>2025年12月20日: サイト公開開始</li>
            </ul>
        </ContentLayout>
    );
}
