import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  // Pin the workspace root so Next doesn't infer a parent lockfile.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
