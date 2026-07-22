/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    // if (process.env.NODE_ENV === "development") {
    return [
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, must-revalidate",
          },
        ],
      },
    ];
    // }
    return [];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // async rewrites() {
  //   //che giấu thành url mới
  //   const backend = process.env.API_PROXY_URL ?? "http://localhost:3000";
  //   return [
  //     {
  //       source: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
  //       destination: `${backend}${process.env.NEXT_PUBLIC_API_URL}/:path*`,
  //     },
  //     // {
  //     //   // Khớp chính xác với mọi request bắt đầu bằng /api/v1/
  //     //   source: "/api/v1/:path*",
  //     //   // Chuyển thẳng tới server NestJS port 3000
  //     //   destination: "http://localhost:3000/api/v1/:path*",
  //     // },
  //   ];
  // },
};

export default nextConfig;
