declare interface ImportMeta {
  glob: (pattern: string) => Record<string, () => Promise<any>>;
}
declare module "*.module.less";
