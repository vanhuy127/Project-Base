import type { Role } from "@/types";

export interface User {
  id: string;
  name: string;
  role: Role;
}