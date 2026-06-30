"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@iconify/react";

const CarouselPage = () => {
  return (
    <PageContainer
      title="Carousel"
      description="Sliding content carousel for testimonials, product galleries, and onboarding flows."
    >
      <div className="grid grid-cols-1 gap-6">
        <DemoBlock title="Basic Carousel" description="Auto-sliding cards with prev/next controls">
          <Carousel className="w-full">
            <CarouselContent>
              {[
                { title: "Fast Performance", desc: "Optimized bundle size and lazy loading for instant page transitions.", icon: "solar:bolt-bold-duotone", color: "primary" },
                { title: "Fully Responsive", desc: "Looks great on mobile, tablet, and desktop out of the box.", icon: "solar:smartphone-bold-duotone", color: "success" },
                { title: "Dark Mode", desc: "One-click theme switching with system preference detection.", icon: "solar:moon-stars-bold-duotone", color: "warning" },
                { title: "Premium Support", desc: "Dedicated support team available 24/7 via email and chat.", icon: "solar:headset-round-sound-bold-duotone", color: "info" },
              ].map((s, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                  <Card>
                    <CardContent className="p-6">
                      <div className={`h-12 w-12 rounded-2xl bg-light${s.color} text-${s.color} flex items-center justify-center mb-4`}>
                        <Icon icon={s.icon} width={26} />
                      </div>
                      <h6 className="font-semibold text-base">{s.title}</h6>
                      <p className="text-sm opacity-70 mt-2">{s.desc}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </DemoBlock>

        <DemoBlock title="Testimonials">
          <Carousel className="w-full">
            <CarouselContent>
              {[
                { name: "Sarah Johnson", role: "Product Manager at Acme", text: "mtverse transformed our admin workflow. The components are beautiful and the documentation is excellent.", img: 4 },
                { name: "Michael Chen", role: "Lead Developer at TechCo", text: "Best admin template I've used in 10 years. The code is clean, customizable, and production-ready.", img: 5 },
                { name: "Emily Rodriguez", role: "UX Designer at DesignHub", text: "The attention to detail is remarkable. Every interaction feels polished and intentional.", img: 6 },
                { name: "David Park", role: "CTO at StartupX", text: "We shipped our SaaS dashboard in 2 weeks instead of 2 months. mtverse is a game-changer.", img: 7 },
              ].map((t, i) => (
                <CarouselItem key={i}>
                  <div className="rounded-xl bg-background p-8 shadow-xs text-center max-w-2xl mx-auto">
                    <Icon icon="solar:chat-round-dots-bold-duotone" width={40} className="text-primary mx-auto mb-4" />
                    <p className="text-base opacity-80 italic">"{t.text}"</p>
                    <div className="flex items-center justify-center gap-3 mt-6">
                      <Avatar className="h-12 w-12"><AvatarImage src={`/images/profile/user-${t.img}.jpg`} /><AvatarFallback>U</AvatarFallback></Avatar>
                      <div className="text-left">
                        <p className="font-semibold">{t.name}</p>
                        <p className="text-xs opacity-70">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </DemoBlock>

        <DemoBlock title="Single Item">
          <Carousel opts={{ align: "center" }} className="w-full max-w-md mx-auto">
            <CarouselContent>
              {["/images/blog/blog-img1.jpg","/images/blog/blog-img2.jpg","/images/blog/blog-img3.jpg","/images/blog/blog-img4.jpg"].map((src, i) => (
                <CarouselItem key={i}>
                  <div className="rounded-xl overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`Slide ${i+1}`} className="w-full h-64 object-cover" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default CarouselPage;
