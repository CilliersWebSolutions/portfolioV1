new EventSource(`${SERVE_ORIGIN}/esbuild`).addEventListener('change', () => location.reload());

const eventSource = new EventSource(`${SERVE_ORIGIN}/esbuild`);

eventSource.addEventListener('message', (event) => {
    if (event.data === 'reload') {
        location.reload();
    }
});

eventSource.addEventListener('error', (error) => {
    console.error('EventSource failed:', error);
});