import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { prisma } from "../prisma/db";
// Mengambil tipe data dari package shared
import type { ApiResponse, HealthCheck, User } from "shared";

const app = new Elysia()
  // Sesuaikan port origin jika frontend kamu jalan di port lain (misal 5174)
  .use(cors({ 
    origin: ["http://localhost:5173", "http://localhost:5174"] 
  }))
  .use(swagger())
  
  // Route Health Check
  .get("/", (): ApiResponse<HealthCheck> => {
    return {
      data: { status: "ok" },
      message: "Server running"
    };
  })

  // Route Ambil Semua User dari Database
  .get("/users", async (): Promise<ApiResponse<User[]>> => {
    try {
      const users = await prisma.user.findMany();
      return {
        data: users,
        message: "User list retrieved successfully"
      };
    } catch (error) {
      return {
        data: [],
        message: "Failed to fetch users"
      };
    }
  })

  .listen(3000);

console.log(`🦊 Backend jalan di http://localhost:${app.server?.port}`);
console.log(`📖 Dokumentasi Swagger di http://localhost:${app.server?.port}/swagger`);

export type App = typeof app;