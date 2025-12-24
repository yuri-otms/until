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
            <div className="mt-6 mb-5">
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
                                href={ contentRow.url ?? '/contents/' + contentRow.slug}>
                            {contentRow.display_name || contentRow.name}
                            </ContentButton>
                        )}
                    </HomeCardContent>
                </HomeCard>
            )}
        </ContentLayout>
    );
}
