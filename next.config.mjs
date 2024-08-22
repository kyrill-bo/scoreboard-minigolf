/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
    output: 'export',
    basePath: "/scoreboard-minigolf",
    images: {
        loader: "akamai",
        path: "",
    },
};

export default nextConfig;
