const extractArr = [];

export default function myExtractCssRollupPlugin(opts) {
  return {
    name: "myExtractCssRollupPlugin",
    resolveId(source, importer) {
      // 解析 import
      const flag = "@/";
      if (source.startsWith(flag)) {
        return {
          id: `./src/${source.slice(flag.length)}`,
          external: false, // 非外部模块
        };
      }
      return null; // 默认解析机制
    },
    transform(code, id) {
      // code: 模块的原始代码
      // id: 模块的路径或标识符
      if (!id.endsWith(".css")) return null;

      extractArr.push(code);

      // 返回一个包含转换后的code和可选的source - map（如果支持）的对象。
      return {
        code: "export default '111'",
        map: {
          mappings: "",
        },
      };
    },
    generateBundle(options, bundle) {
      // 允许向最终的输出中添加额外的文件
      this.emitFile({
        name: "2333.css", // 会添加文件指纹，存在 fileName 时不生效
        fileName: opts.fileName || "index.css",
        type: "asset",
        source: extractArr.join("\n/*发发发发*/\n"),
      });
    },
  };
}
