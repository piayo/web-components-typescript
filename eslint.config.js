import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

const files = [
    "src/components/**/*.ts",
];
if ( process.env.npm_lifecycle_event === "dev" ) {
    files.push( "example/**/*.ts" );
}

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files,
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                project: "./tsconfig.json",
            },
        },
        plugins: {
            "@typescript-eslint": tseslint,
        },
        rules: {
            "no-console": "warn",
        },
    },
];
