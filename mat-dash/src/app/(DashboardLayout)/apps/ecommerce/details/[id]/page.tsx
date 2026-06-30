"use client";
import { useState, useEffect } from "react";
import PageContainer from "../../../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { shopProducts } from "../../../../data/ecommerce";

const ProductDetails = ({ params }: { params: { id: string } }) => {
  const [qty, setQty] = useState(1);
  const product = shopProducts.find((p) => p.id === Number(params.id)) || shopProducts[0];
  const related = shopProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <PageContainer
      title="Product Details"
      breadcrumb={[{ to: "/", title: "Home" }, { to: "/apps/ecommerce/shop", title: "Shop" }, { title: product.name }]}
      actions={<Button variant="outline" asChild><Link href="/apps/ecommerce/shop">Back to Shop</Link></Button>}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image gallery */}
        <div>
          <div className="rounded-xl overflow-hidden border border-defaultBorder aspect-square bg-lightgray dark:bg-dark">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-3 mt-3">
            {[product.image, product.image, product.image, product.image].map((img, i) => (
              <div key={i} className={`rounded-lg overflow-hidden border-2 cursor-pointer aspect-square ${i === 0 ? "border-primary" : "border-defaultBorder hover:border-primary"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="lightPrimary">{product.category}</Badge>
            {product.badge && <Badge variant={product.badge.includes("-") ? "error" : "lightSuccess"}>{product.badge}</Badge>}
          </div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex">
              {[1,2,3,4,5].map((s) => (
                <Icon key={s} icon={s <= Math.floor(product.rating) ? "solar:star-bold" : "solar:star-linear"} className="text-warning" width={16} />
              ))}
            </div>
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm opacity-60">({product.reviews} reviews)</span>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <span className="text-3xl font-bold">${product.price}</span>
            {product.oldPrice && <span className="text-lg opacity-50 line-through">${product.oldPrice}</span>}
            {product.oldPrice && <Badge variant="error">Save ${product.oldPrice - product.price}</Badge>}
          </div>

          <p className="text-sm opacity-80 mt-4 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-3 mt-5">
            <div className="flex items-center border border-defaultBorder rounded-lg overflow-hidden">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-10 w-10 hover:bg-lightprimary flex items-center justify-center"><Icon icon="solar:minimize-linear" width={16} /></button>
              <input type="text" value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))} className="w-12 text-center outline-none bg-background" />
              <button onClick={() => setQty((q) => q + 1)} className="h-10 w-10 hover:bg-lightprimary flex items-center justify-center"><Icon icon="solar:add-linear" width={16} /></button>
            </div>
            <Button size="lg" className="flex-1 gap-2"><Icon icon="solar:cart-large-2-bold" width={18} /> Add to Cart</Button>
            <Button size="lg" variant="outline" className="gap-2"><Icon icon="solar:heart-linear" width={18} /></Button>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-defaultBorder">
            <div className="flex items-center gap-2">
              <Icon icon="solar:truck-bold-duotone" className="text-primary" width={24} />
              <div><p className="text-xs font-medium">Free Shipping</p><p className="text-xs opacity-60">Orders over $50</p></div>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="solar:shield-check-bold-duotone" className="text-success" width={24} />
              <div><p className="text-xs font-medium">2-Year Warranty</p><p className="text-xs opacity-60">Full coverage</p></div>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="solar:rotate-broken-bold-duotone" className="text-info" width={24} />
              <div><p className="text-xs font-medium">30-Day Returns</p><p className="text-xs opacity-60">No questions asked</p></div>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="solar:headset-round-sound-bold-duotone" className="text-warning" width={24} />
              <div><p className="text-xs font-medium">24/7 Support</p><p className="text-xs opacity-60">Always here</p></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8">
        <Tabs defaultValue="description">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4">
            <div className="rounded-xl border border-defaultBorder p-6">
              <p className="text-sm opacity-80 leading-relaxed">{product.description} This premium product is crafted with attention to every detail, ensuring years of reliable use. Our team of engineers has spent countless hours perfecting the design, materials, and user experience.</p>
              <ul className="mt-4 space-y-2 text-sm">
                {["Premium materials and build quality","Designed for everyday use","Backed by industry-leading warranty","Sustainable packaging"].map((f) => (
                  <li key={f} className="flex items-center gap-2"><Icon icon="solar:check-circle-bold" className="text-success" width={16} /> {f}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="mt-4">
            <div className="rounded-xl border border-defaultBorder p-6">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ["Brand", "mtverse Premium"],
                    ["Model", `MD-${product.id.toString().padStart(4, "0")}`],
                    ["Category", product.category],
                    ["Weight", "1.2 kg"],
                    ["Dimensions", "20 × 15 × 5 cm"],
                    ["Color", "Black"],
                    ["Material", "Aluminum / Plastic"],
                    ["Warranty", "2 Years"],
                  ].map(([k, v]) => (
                    <tr key={k} className="border-b border-defaultBorder last:border-b-0">
                      <td className="py-3 font-medium w-1/3">{k}</td>
                      <td className="py-3 opacity-80">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            <div className="rounded-xl border border-defaultBorder p-6 space-y-4">
              {[
                { name: "Sarah Johnson", img: 4, rating: 5, date: "2 weeks ago", text: "Absolutely love this! Exceeded my expectations in every way. The build quality is premium and it works flawlessly." },
                { name: "Michael Chen", img: 5, rating: 5, date: "1 month ago", text: "Best purchase I've made this year. Highly recommend to anyone considering it." },
                { name: "Emily Rodriguez", img: 6, rating: 4, date: "2 months ago", text: "Great product overall. Took one star off because the setup could be more intuitive." },
              ].map((r) => (
                <div key={r.name} className="flex gap-3 pb-4 border-b border-defaultBorder last:border-b-0 last:pb-0">
                  <Avatar className="h-10 w-10"><AvatarImage src={`/images/profile/user-${r.img}.jpg`} /><AvatarFallback>{r.name[0]}</AvatarFallback></Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{r.name}</p>
                      <span className="text-xs opacity-60">{r.date}</span>
                    </div>
                    <div className="flex mt-0.5">{[1,2,3,4,5].map((s) => <Icon key={s} icon={s <= r.rating ? "solar:star-bold" : "solar:star-linear"} className="text-warning" width={12} />)}</div>
                    <p className="text-sm opacity-80 mt-2">{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related */}
      <DemoBlock title="Related Products" className="mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {related.map((p) => (
            <Link key={p.id} href={`/apps/ecommerce/details/${p.id}`} className="rounded-xl border border-defaultBorder overflow-hidden hover:shadow-md transition-shadow group">
              <div className="aspect-square overflow-hidden bg-lightgray dark:bg-dark">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-3">
                <p className="text-xs opacity-60">{p.category}</p>
                <p className="text-sm font-medium line-clamp-2 mt-0.5">{p.name}</p>
                <p className="font-bold text-sm mt-1">${p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </DemoBlock>
    </PageContainer>
  );
};

export default ProductDetails;
