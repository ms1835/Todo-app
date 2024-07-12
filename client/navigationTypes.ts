export type RootStackParamList = {
    home: undefined;
    profile: undefined;
    register: undefined | {image: string | undefined };
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}