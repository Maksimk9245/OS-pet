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

export const toggleApp = (appName: keyof typeof appState) => {
    appState[appName] = !appState[appName];

    if (appState[appName]) {
        focusApp(appName);
    }
};

export const closeApp = (appName: keyof typeof appState) => {
    appState[appName] = false;
};