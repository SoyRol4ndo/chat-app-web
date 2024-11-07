/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				pathname: "/a/**",
			},
		],
		unoptimized: true,
	},
};

module.exports = nextConfig;
