export default function extensionOrder(options?: ExtensionOrderPluginOption): {
    name?: undefined;
} | {
    name: string;
    resolveId(source: string, importer: string): string | undefined;
};
