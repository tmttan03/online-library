import { NavigationComponent } from "src/app/components/partials/navigation/navigation.component";

export function ContentOnly(content) {
    return { content: content };
}

export function NavContent(content) {
    return {
        navigation: NavigationComponent,
        content: content,
    }
}
