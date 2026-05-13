import { reactive } from 'vue';

export const appState = reactive({
    Browser: false,
    Documents: false,
    Images: false,
    Settings: false,
})
export const toggleApp = (appName :keyof typeof appState) => {
    appState[appName] = !appState[appName];
}
export const closeApp = (appName :keyof typeof appState) => {
    appState[appName] = false;
}