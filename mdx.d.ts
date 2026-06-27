declare module "*.mdx" {
  import type { ComponentType } from "preact";
  const MDXComponent: ComponentType<{ components?: Record<string, unknown> }>;
  export default MDXComponent;
}
