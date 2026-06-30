"use client";
import { useState } from "react";
import PageContainer from "../../../layout/shared/page-container/PageContainer";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

const photos = [
  { src: "/images/blog/blog-img1.jpg", likes: 234, comments: 12 },
  { src: "/images/blog/blog-img2.jpg", likes: 456, comments: 28 },
  { src: "/images/blog/blog-img3.jpg", likes: 789, comments: 45 },
  { src: "/images/blog/blog-img4.jpg", likes: 123, comments: 8 },
  { src: "/images/blog/blog-img5.jpg", likes: 567, comments: 32 },
  { src: "/images/blog/blog-img6.jpg", likes: 890, comments: 56 },
  { src: "/images/blog/blog-img8.jpg", likes: 345, comments: 19 },
  { src: "/images/blog/blog-img9.jpg", likes: 678, comments: 41 },
  { src: "/images/blog/blog-img10.jpg", likes: 234, comments: 15 },
  { src: "/images/blog/blog-img11.jpg", likes: 567, comments: 33 },
  { src: "/images/backgrounds/img1.jpg", likes: 432, comments: 22 },
  { src: "/images/backgrounds/profilebg.jpg", likes: 999, comments: 78 },
];

const GalleryPage = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <PageContainer
      title="Gallery"
      description="Photo gallery with grid layout and lightbox preview."
      actions={<Button className="gap-1.5"><Icon icon="solar:gallery-add-bold-duotone" width={16} /> Upload Photos</Button>}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {photos.map((p, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="relative aspect-square rounded-xl overflow-hidden group bg-lightgray dark:bg-dark"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt={`Photo ${i+1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <div className="text-white text-xs flex items-center gap-3">
                <span className="flex items-center gap-1"><Icon icon="solar:heart-bold" width={14} /> {p.likes}</span>
                <span className="flex items-center gap-1"><Icon icon="solar:chat-dots-bold" width={14} /> {p.comments}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          onClick={() => setActive(null)}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-in fade-in"
        >
          <button className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white text-dark hover:bg-white/90 flex items-center justify-center">
            <Icon icon="solar:close-circle-bold" width={24} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setActive((a) => a === null ? null : (a - 1 + photos.length) % photos.length); }}
            className="absolute left-4 h-12 w-12 rounded-full bg-white text-dark hover:bg-white/90 flex items-center justify-center"
          >
            <Icon icon="solar:alt-arrow-left-linear" width={24} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photos[active].src} alt="" className="max-h-[80vh] max-w-[80vw] rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} />
          <button
            onClick={(e) => { e.stopPropagation(); setActive((a) => a === null ? null : (a + 1) % photos.length); }}
            className="absolute right-4 h-12 w-12 rounded-full bg-white text-dark hover:bg-white/90 flex items-center justify-center"
          >
            <Icon icon="solar:alt-arrow-right-linear" width={24} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm flex items-center gap-4">
            <span className="flex items-center gap-1"><Icon icon="solar:heart-bold" width={16} /> {photos[active].likes}</span>
            <span className="flex items-center gap-1"><Icon icon="solar:chat-dots-bold" width={16} /> {photos[active].comments}</span>
            <span>{active + 1} / {photos.length}</span>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default GalleryPage;
