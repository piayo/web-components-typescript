import { resolve } from "path";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";
import genTypes from "vite-plugin-dts";
import minifyLiterals from "rollup-plugin-minify-template-literals";

const isProd  = process.env.NODE_ENV === "production";
const runName = process.env.npm_lifecycle_event;

export default defineConfig({
    root: "./",
    base: "./",
    envDir: "./",
    publicDir: "./public",
    build: {
        outDir: "dist",
        assetsDir: "./",
        lib: {
            formats: [ "es" ],
            entry: {
                // components
                "components/index"             : "src/components/index.ts",
                "components/type-script/index" : "src/components/type-script/index.ts",
                // example for run dev
                ...(runName === "dev" && {
                    "example/index": "src/example/index.html",
                }),
            },
        },
        sourcemap: !isProd,
        minify: true,
        rollupOptions: {
            treeshake: false,
            external: [
                // /^tslib/,
                // /^@lit/,
                // /^lit/,
            ],
        },
    },
    resolve: {
        alias: [
            // tsconfig.json の $.compilerOptions.paths と合わせる
            { find: "@", replacement: resolve(__dirname, "src") },
        ],
    },
    optimizeDeps: {
        include: ['vite-plugin-eslint'],
    },
    json: {
        stringify: true,
    },
    plugins: [
        // minify html`...`
        minifyLiterals({
            failOnError: false,
            options: {
                minifyOptions: {
                    minifyCSS: false,
                }
            }
        }),

        // eslint
        eslint({
            cache: true,
            include: [
                "src/**/*.ts",
                "example/**/*.ts"
            ],
        }),

        // generate *.d.ts
        genTypes({
            outDir: "dist",
            insertTypesEntry: true,
            include: [
                "src/components/**/*.ts",
            ],
        }),
    ],

    // see: https://ja.vitejs.dev/config/server-options
    server: runName === "dev" ? {
        port: 5173,
        open: "/example/index.html",
        hmr: {
            overlay: true,
        },
    } : undefined,
});
