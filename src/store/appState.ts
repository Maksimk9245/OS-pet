import { reactive, ref } from 'vue';

let globalZIndex = 100;

export const appState = reactive({
    Browser: false,
    Documents: false,
    Images: false,
    Settings: false,
});

export const appMinimized = reactive({
    Browser: false,
    Documents: false,
    Images: false,
    Settings: false,
});

export const minimizeApp = (appName: keyof typeof appState) => {
    appMinimized[appName] = true;
};

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

export const desktopWallpaper = ref('https://picsum.photos/1920/1080?random=10');

export const systemSettings = reactive({
    wifiEnabled: navigator.onLine,
    bluetoothEnabled: false,
    nightLightEnabled: false,
    pcName: localStorage.getItem('os_pc_name') || 'PET-OS-DEV',
    userName: localStorage.getItem('os_user_name') || 'Maksym Balatskyi',
    userRole: localStorage.getItem('os_user_role') || 'Software Engineer',
});