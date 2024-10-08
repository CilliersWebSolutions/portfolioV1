import * as esbuild from 'esbuild';
import { readdirSync } from 'fs';
import { join, sep } from 'path';

// Config output
const BUILD_DIRECTORY = 'dist';
const SERVE_PORT = 3000;
const SERVE_ORIGIN = `http://localhost:${SERVE_PORT}`;

// Config entrypoint files
const ENTRY_POINTS = ['src/index.js'];

// Create context
const context = await esbuild.context({
    bundle: true,
    entryPoints: ENTRY_POINTS,
    outdir: BUILD_DIRECTORY,
    minify: false,
    sourcemap: true,
    target: 'esnext',
    inject: ['./bin/live-reload.js'],  // Include live-reload.js in development
    define: {
        SERVE_ORIGIN: JSON.stringify(SERVE_ORIGIN),
    },
});

// Watch and serve files in development
await context.watch();
await context
    .serve({
        servedir: BUILD_DIRECTORY,
        port: SERVE_PORT,
    })
    .then(logServedFiles);

/**
 * Logs information about the files that are being served during local development.
 */
function logServedFiles() {
    /**
     * Recursively gets all files in a directory.
     * @param {string} dirPath
     * @returns {string[]} An array of file paths.
     */
    const getFiles = (dirPath) => {
        const files = readdirSync(dirPath, { withFileTypes: true }).map((dirent) => {
            const path = join(dirPath, dirent.name);
            return dirent.isDirectory() ? getFiles(path) : path;
        });

        return files.flat();
    };

    const files = getFiles(BUILD_DIRECTORY);

    const filesInfo = files
        .map((file) => {
            if (file.endsWith('.map')) return;

            // Normalize path and create file location
            const paths = file.split(sep);
            paths[0] = SERVE_ORIGIN;

            const location = paths.join('/');

            // Create import suggestion
            const tag = location.endsWith('.css')
                ? `<link href="${location}" rel="stylesheet" type="text/css"/>`
                : `<script defer src="${location}"></script>`;

            return {
                'File Location': location,
                'Import Suggestion': tag,
            };
        })
        .filter(Boolean);

    // eslint-disable-next-line no-console
    console.table(filesInfo);
}
