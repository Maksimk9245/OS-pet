import { reactive } from 'vue';

let globalZIndex = 100;

export const appState = reactive({
    Browser: false,
    Documents: false,
    Images: false,
    Settings: false,
});

export const appZIndex = reactive({
    Browser: 100,
    Documents: 100,
    Images: 100,
    Settings: 100,
});

export const focusApp = (appName: keyof typeof appState) => {
    globalZIndex += 1;
    appZIndex[appName] = globalZIndex;
};

export const toggleApp = (appName: keyof typeof appState): void => {
    if (!appState[appName]) {
        appState[appName] = true;
        appMinimized[appName] = false;
        focusApp(appName);
    } else if (appMinimized[appName]) {
        appMinimized[appName] = false;
        focusApp(appName);
    } else {
        appMinimized[appName] = true;
    }
};

export const closeApp = (appName: keyof typeof appState) => {
    appState[appName] = false;
};
export const appMinimized = reactive({
    Browser: false,
    Documents: false,
    Images: false,
    Settings: false,
})
export const minimizeApp=(appName:keyof typeof appState) => {
    appMinimized[appName] = true;
}