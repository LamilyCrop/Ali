"use client";
import ProductDetails from "@/views/ProductDetails";
import { useParams } from "next/navigation";

export default function ProductDetailsPage() {
  // Ensure dynamic usage of params in client page to avoid type error
  useParams();
  return <ProductDetails />;
}


