"use client";
import AccessoryDetails from "@/views/AccessoryDetails";
import { useParams } from "next/navigation";

export default function AccessoryDetailsPage() {
  // Ensure dynamic usage of params in client page to avoid type error
  useParams();
  return <AccessoryDetails />;
}
