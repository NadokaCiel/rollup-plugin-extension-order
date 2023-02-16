import path from "path";
import fs from "fs";

export default function extensionOrder(options: ExtensionOrderPluginOption = {}) {
  const extensionList = options?.extensions ?? [];
  const root = path.join(process.cwd(), options?.root ?? "src");
  if (!extensionList?.length) return {};
  return {
    name: "extension-order",
    resolveId(source: string, importer: string) {
      let originPath = source;
      if (source.includes("@")) {
        originPath = originPath.replace("@", ".");
      }
      const dir =
        source.includes("@") || !importer ? root : path.dirname(importer);
      const filePath = path.resolve(dir, originPath);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        for (let i = 0; i < extensionList.length; i++) {
          const extension = extensionList[i];
          const absolute = `${filePath}/index${extension}`;
          if (fs.existsSync(absolute)) {
            return path.normalize(absolute);
          }
        }
      }
      for (let i = 0; i < extensionList.length; i++) {
        const extension = extensionList[i];
        const absolute = `${filePath}${extension}`;
        if (fs.existsSync(absolute)) {
          return path.normalize(absolute);
        }
      }
    },
  };
}
