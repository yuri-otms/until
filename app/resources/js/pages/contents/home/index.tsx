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
            <p className="mt-10 mb-5">80歳になる2065年まで40年続けるサイトです。</p>
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
                            {contentRow.name}
                            </ContentButton>
                        )}
                    </HomeCardContent>
                </HomeCard>
            )}
        </ContentLayout>
    );
}
