import {
    HomeCard,
    HomeCardHeader,
    HomeCardTitle,
    HomeCardDescription,
    HomeCardContent
} from '@/components/ui/home-card';
import { ContentButton } from '@/components/ui/content-button';
import ContentLayout from '@/layouts/content-layout'
import { type ContentGroup } from '@/types';

export default function Index({
    contentGroups
}: {
    contentGroups : ContentGroup[]
   }) {

    return (
        <ContentLayout>
            <div className="mt-10 mb-5">
                <p className="mb-4">80歳になる2065年まで40年続けるサイトです。</p>
            </div>
            {contentGroups.map((themeRow) =>
                <HomeCard key={themeRow.id}>
                    <HomeCardHeader>
                        <HomeCardTitle>{themeRow.name}</HomeCardTitle>
                        <HomeCardDescription>
                            {themeRow.description}
                        </HomeCardDescription>
                    </HomeCardHeader>
                    <HomeCardContent>
                        {themeRow.contents.map((contentRow) =>
                            <ContentButton key={contentRow.id}
                                href={'/contents/' + contentRow.slug}>
                            {contentRow.display_name || contentRow.name}
                            </ContentButton>
                        )}
                    </HomeCardContent>
                </HomeCard>
            )}
            <HomeCard>
                <HomeCardHeader>
                    <HomeCardTitle>プロフィール</HomeCardTitle>
                    <HomeCardDescription>
                        <p>未経験で37歳から2年間、地方のWeb制作会社でバックエンドエンジニア(退職済み)。<br />
                        不登校、ひきこもり、長期無職、対人恐怖（社交不安障害）、短期離職の繰り返しから、自分の夢を叶える方法を模索しています。</p>
                    </HomeCardDescription>
                </HomeCardHeader>
                <HomeCardContent>
                    <ContentButton
                    href="/"
                    >
                    不登校・ひきこもり<br />経歴
                    </ContentButton>
                </HomeCardContent>
            </HomeCard>
        </ContentLayout>
    );
}
