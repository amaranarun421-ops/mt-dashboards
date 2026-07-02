import { Gallery } from "@/components/pages/gallery-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Image gallery with lightbox.',
};

export default function Page() {
  return <Gallery />;
}
