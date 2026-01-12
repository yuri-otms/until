import ContentLayout from '@/layouts/content-layout'
import { type BreadcrumbItem } from '@/types'
import { home } from '@/routes'

export default function Index() {
    const title: string = 'プライバシーポリシー・免責事項';
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
                <div>2025年12月25日 公開</div>
            </div>

            <h2 className="text-2xl font-bold mt-6 mb-4">運営者情報</h2>

            <p>yuri</p>

            <h3 className="text-xl font-semibold mt-6 mb-3">URL</h3>

            <p><a className="text-blue-600 underline" href="https://skskfun.com/">https://skskfun.com/</a></p>

            <h3 className="text-xl font-semibold mt-6 mb-3">お問合せフォーム</h3>

            <p><a className="text-blue-600 underline" href="https://forms.gle/r8BcQYVg8Ku9v3ZN7">https://forms.gle/r8BcQYVg8Ku9v3ZN7</a></p>

            <h2 className="text-2xl font-bold mt-6 mb-4" id="privacy">プライバシーポリシー</h2>

            <p>本プライバシーポリシーは、「80歳まで続けるサイト」（<a className="text-blue-600 underline" href="https://skskfun.com/">https://skskfun.com/</a>）（以下、「当サイト」とします）の各種サービス（当サイトによる情報提供、各種お問合せの受付等）において、当サイトの訪問者（以下、「訪問者」とします）の個人情報もしくはそれに準ずる情報を取り扱う際に、当サイトが遵守する方針を示したものです。</p>

            <h3 className="text-xl font-semibold mt-6 mb-3">個人情報の利用目的</h3>

            <p>当サイトでは、お問い合わせフォームやコメント投稿時に次の個人情報を取得します。</p>
            <ul className="list-disc pl-6 my-4">
                <li>送信者のお名前</li>
                <li>送信元メールアドレス</li>
            </ul>

            <p>これらは、必要な連絡のために利用し、それ以外の目的では利用いたしません。</p>

            <p>また、お問い合わせいただいた個人情報は、お問い合わせ内容が解決あるいは終了するまで保存します。</p>


            <h3 className="text-xl font-semibold mt-6 mb-3">個人情報の開示</h3>

            <p>個人情報は適切に管理し、以下に該当する場合を除いて第三者に開示することはありません。</p>

            <ul className="list-disc pl-6 my-4">
                <li>本人のご了解がある場合</li>
                <li>法令等への協力のため、開示が必要となる場合</li>
            </ul>

            <p>個人情報の開示・訂正・追加・削除・利用停止をご希望の場合には、ご本人であることを確認したうえで、速やかに対応致します。</p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Cookieについて</h3>

            <p>当サイトは、一部のコンテンツにて Cookie（クッキー）を利用しています。</p>

            <p>Cookie とは、web コンテンツへのアクセスに関する情報であり、お名前・メールアドレス・住所・電話番号など、個人を特定する情報は含まれません。</p>

            <p>効果的な広告の配信やアクセス解析の際に、Cookie 情報を利用させていただく場合がございます。</p>

            <p>Cookie を無効にする方法は以下を参照してください。</p>

            <p><a className="text-blue-600 underline"
             href="https://policies.google.com/technologies/ads?gl=jp">広告 – ポリシーと規約 – Google</a></p>

            <h3 className="text-xl font-semibold mt-6 mb-3">アクセス解析ツールについて</h3>

            <p>当サイトでは、Google によるアクセス解析ツール「<a className="text-blue-600 underline" href="https://developers.google.com/analytics?hl=ja">Google アナリティクス</a>」を利用しています。</p>

            <p>Google アナリティクスはアクセス情報の収集のために Cookie を使用しています。このアクセス情報は匿名で収集されており、個人を特定するものではありません。</p>

            <p>Google 社のデータ収集・処理の仕組みについては、以下をご覧ください。</p>

            <p><a className="text-blue-600 underline"
             href="https://policies.google.com/technologies/partner-sites?hl=ja">Google のサービスを使用するサイトやアプリから収集した情報の Google による使用 – ポリシーと規約 – Google</a></p>


            <h3 className="text-xl font-semibold mt-6 mb-3">Amazonアソシエイト</h3>

            <p>当サイト「80歳まで続けるサイト」（<a className="text-blue-600 underline" href="https://skskfun.com/">https://skskfun.com/</a>）は Amazon.co.jp を宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、<a className="text-blue-600 underline" href="https://affiliate.amazon.co.jp/">Amazon アソシエイト</a>プログラムの参加者です。Amazonのアソシエイトとして、当サイト管理者の「yuri」は適格販売により収入を得ています。</p>

            <h3 className="text-xl font-semibold mt-6 mb-3">プライバシーポリシーの変更について</h3>

            <p>当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本プライバシーポリシーの内容を適宜見直しその改善に努めます。</p>

            <p>修正された最新のプライバシーポリシーは常に本ページにて開示されます。</p>

            <p>2026年1月12日 策定</p>

            <h2 className="text-2xl font-bold mt-6 mb-4" id="disclaimer">免責事項</h2>

            <p>「80歳まで続けるサイト」（<a className="text-blue-600 underline" href="https://skskfun.com/">https://skskfun.com/</a>）（以下、「当サイト」とします）（以下、「当サイト」としますを利用されるにあたっての免責事項を記載します。</p>

            <h3 className="text-xl font-semibold mt-6 mb-3">損害等の責任について</h3>

            <p>当サイトの利用によって生じた何らかのトラブル・損失・損害等の一切の責任を負いかねますのでご了承ください。</p>

            <p>当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。</p>

            <p>当サイトの保守、火災、停電、その他の自然災害、ウイルスや第三者の妨害行為による不可抗力によって、当サイトによるサービスが停止したことに起因して利用者に生じた損害についても、何ら責任を負うものではありません。</p>

            <p>当サイトを利用する場合は、自己責任で行う必要があります。</p>

            <h3 className="text-xl font-semibold mt-6 mb-3">掲載情報の正確性について</h3>

            <p>当サイトのコンテンツについては、可能な限り正確な情報を掲載するよう努めていますが、誤情報が入り込んだり、情報が古くなっている場合がございます。</p>

            <p>内容について、情報の正確性を確保するため予告なしで変更・公開停止を行う場合がございます。</p>

            <h3 className="text-xl font-semibold mt-6 mb-3">著作権について</h3>

            <p>当サイトに掲載されている文章・画像の著作権は、運営者「yuri」に帰属しています。</p>

            <p>当サイトのコンテンツ（記事・画像・その他データやプログラム）について、著作権法により認められている引用の範囲である場合を除き、許可なく転載することを禁じます。引用の際は、当サイトへのリンクを掲載するとともに、転載であることを明記してください。</p>

            <p>当サイトは著作権や肖像権の侵害を目的としたものではありません。著作権や肖像権に関して問題がございましたら、お問い合わせフォームよりご連絡ください。迅速に対応いたします。</p>

            <h3 className="text-xl font-semibold mt-6 mb-3">リンクについて</h3>

            <p>当サイトは基本的にリンクフリーです。リンクを行う場合の許可や連絡は不要です。</p>

            <p>ただし、インラインフレームの使用や画像の直リンクといった直接的な参照はご遠慮ください。</p>

            <p>2026年1月12日 策定</p>








        </ContentLayout>
    );
}
