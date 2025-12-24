import ContentLayout from '@/layouts/content-layout'
import { type BreadcrumbItem } from '@/types'
import { home } from '@/routes'

export default function Index() {
    const title: string = 'プロフィール';
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
            <h2 className="text-2xl font-bold mt-6 mb-4">基本情報</h2>
                <p>yuri</p>

                <p>1985年生まれ、女性。</p>
                <p>不登校、ひきこもりを経て、事務員として働いたのち、Webエンジニアへ。現在は無職。</p>

            <h2 className="text-2xl font-bold mt-6 mb-4">趣味・好きなもの</h2>


                <p>語学（英語、ドイツ語、韓国語）</p>
                <p>プログラミング（PHP中心、Python、JavaScript/TypeScript永遠に勉強中）</p>
                <p>読書（ジェイン・オースティンの小説、その他雑多に）</p>
                <p>漫画（寄生獣、漂流教室、ヒカルの碁、動物のお医者さん、進撃の巨人）</p>
                <p>映画（ロード・オブ・ザ・リング、サウンド・オブ・ミュージック、ブリジット・ジョーンズの日記、アポロ13、タイタニック、ヒトラー最後の12日間）</p>
                <p>ミュージカル（オペラ座の怪人、レ・ミゼラブル、ウィケッド）</p>
                <p>動物（動物園、水族館等）</p>
                <p>登山（百名山だと茨城の筑波山、栃木の男体山、日光白根山、那須岳、そして富士山）</p>
                <p>スキー（数年に1〜2回だけど好き）</p>
                <p>ゲーム（最近だとFF7リメイク）</p>

            <h2 className="text-2xl font-bold mt-6 mb-4">経歴概要</h2>

                <p>中学1年生(12歳)で不登校に。</p>
                <p>中学3年生は1年間学校に通うものの、高校1年生で再び不登校、中退。</p>
                <p>大検に合格するもののひきこもり状態になり、23歳で大学受験、入学。</p>
                <p>大学も早々に不登校になり、2年目は休学、3、4年目で29単位習得し、中退、放送大学に入学。</p>

                <p>20代で7年間アルバイトできず、28歳で学習塾のアルバイト、29歳でフルタイム事務のアルバイト、その後短期の非正規の事務の仕事を複数経て、翻訳、ICT支援員などを経験する。</p>

                <p>37歳でWebエンジニア（バックエンド）で就職し、2年間勤務。その間に結婚し、諸事情で40歳を手前に退職、現在に至る。</p>

            <h2 className="text-2xl font-bold mt-6 mb-4">SNS等</h2>
            <ul className="list-disc pl-6 mb-4">
                <li><a className="text-blue-600 underline" href="https://x.com/lstliauou" target="_blank">X (旧Twitter)</a></li>
                <li><a className="text-blue-600 underline" href="https://qiita.com/yuri_t" target="_blank">Qiita</a></li>
                <li><a className="text-blue-600 underline" href="https://note.com/yuri_bbr/" target="_blank">yuri｜note</a>(エンジニア関係)</li>
                <li><a className="text-blue-600 underline" href="https://note.com/omuraisu_kk" target="_blank">オムライス｜note</a>(婚活関係)</li>
                <li><a className="text-blue-600 underline" href="https://link.skskfun.com/" target="_blank">その他リンクまとめ</a></li>
            </ul>

        </ContentLayout>
    );
}
