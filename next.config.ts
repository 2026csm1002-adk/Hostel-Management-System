import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keeps the libSQL database driver out of the bundle (avoids a known build error).
  serverExternalPackages: ["@libsql/client", "libsql"],
};

export default nextConfig;
