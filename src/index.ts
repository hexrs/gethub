export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const url = new URL(request.url);
        const path = url.pathname.substring(1);

        // If the path is empty, it's a request to the root.
        // Static assets are served automatically by Cloudflare Pages/Workers Sites configuration.
        // So we don't need to handle the root path here explicitly.
        // A request to the root will serve `public/index.html`.

        // If path is not a valid URL starting with http, it's likely a request for a static asset in the public dir, 
        // and we should not process it.
        if (!path || !path.startsWith('http')) {
             // This will be handled by the static asset handler. If the file is not found, it will result in a 404.
             // We return a clear error message for cases where a user might be trying to misuse the service.
            return new Response('Invalid request. Please use the input form on the homepage.', { status: 400 });
        }

        const githubUrl = path;

        const allowedPatterns = [
            /^https:\/\/github\.com\/[^\/]+\/[^\/]+\/archive\/refs\/heads\/.+\.zip$/,
            /^https:\/\/github\.com\/[^\/]+\/[^\/]+\/releases\/download\/.+\/.+$/,
            /^https:\/\/raw\.githubusercontent\.com\/[^\/]+\/[^\/]+\/.+\/.+$/
        ];

        const isValidUrl = allowedPatterns.some(pattern => pattern.test(githubUrl));

        if (!isValidUrl) {
            return new Response('Invalid GitHub URL. Please provide a valid direct download link for source code, releases, or raw files.', {
                status: 400,
                headers: { 'Content-Type': 'text/plain' }
            });
        }

        try {
            const response = await fetch(githubUrl, {
                headers: {
                    'User-Agent': 'GetHub Worker'
                }
            });

            if (!response.ok) {
                return new Response(response.body, {
                    status: response.status,
                    statusText: response.statusText,
                    headers: response.headers
                });
            }

            const headers = new Headers(response.headers);
            const contentDisposition = headers.get('Content-Disposition');

            if (contentDisposition) {
                headers.set('Content-Disposition', contentDisposition);
            } else {
                const filename = githubUrl.substring(githubUrl.lastIndexOf('/') + 1);
                headers.set('Content-Disposition', `attachment; filename="${filename}"`);
            }
            
            // Ensure browser can display the download progress
            headers.delete('Content-Length');

            return new Response(response.body, {
                status: response.status,
                statusText: response.statusText,
                headers: headers
            });

        } catch (e: any) {
            return new Response(e.message, { status: 500 });
        }
    },
} satisfies ExportedHandler<Env>;