import type { Component, Plugin } from 'vue';
export type SFCWithInstallType<T> = T & Plugin;
export declare const _withInstall: <T>(comp: Component) => SFCWithInstallType<T>;
