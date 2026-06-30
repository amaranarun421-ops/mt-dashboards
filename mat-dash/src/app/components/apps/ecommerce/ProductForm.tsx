"use client";
import { useState } from "react";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Icon } from "@iconify/react";

export const ProductForm = () => {
  const [discount, setDiscount] = useState(true);

  return (
    <form className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main */}
      <div className="lg:col-span-2 space-y-6">
        <DemoBlock title="Basic Information">
          <div className="space-y-4">
            <div><Label>Product Name *</Label><Input placeholder="e.g. Wireless Headphones Pro" className="mt-2" /></div>
            <div><Label>Description *</Label><Textarea placeholder="Describe your product..." rows={5} className="mt-2" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Category *</Label>
                <Select><SelectTrigger className="mt-2 w-full"><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>{["Audio","Wearables","Accessories","Furniture","Smart Home","Storage"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Brand</Label><Input placeholder="e.g. mtverse" className="mt-2" /></div>
            </div>
            <div><Label>SKU</Label><Input placeholder="e.g. WHP-PRO-2024" className="mt-2" /></div>
          </div>
        </DemoBlock>

        <DemoBlock title="Pricing">
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Price ($) *</Label><Input type="number" placeholder="99.00" className="mt-2" /></div>
            <div><Label>Compare-at Price ($)</Label><Input type="number" placeholder="129.00" className="mt-2" /></div>
            <div><Label>Cost per Item ($)</Label><Input type="number" placeholder="45.00" className="mt-2" /></div>
            <div><Label>Tax Rate (%)</Label><Input type="number" placeholder="8" className="mt-2" /></div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-defaultBorder">
            <div><p className="text-sm font-medium">Enable discount</p><p className="text-xs opacity-60">Show &quot;Sale&quot; badge when compare-at &gt; price</p></div>
            <Switch checked={discount} onCheckedChange={setDiscount} />
          </div>
        </DemoBlock>

        <DemoBlock title="Inventory">
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Stock Quantity *</Label><Input type="number" placeholder="100" defaultValue="100" className="mt-2" /></div>
            <div><Label>Low Stock Alert</Label><Input type="number" placeholder="10" defaultValue="10" className="mt-2" /></div>
            <div><Label>SKU</Label><Input placeholder="MD-001" className="mt-2" /></div>
            <div><Label>Barcode</Label><Input placeholder="0123456789012" className="mt-2" /></div>
          </div>
        </DemoBlock>

        <DemoBlock title="Shipping">
          <div className="grid grid-cols-3 gap-4">
            <div><Label>Weight (kg)</Label><Input type="number" placeholder="0.5" className="mt-2" /></div>
            <div><Label>Length (cm)</Label><Input type="number" placeholder="20" className="mt-2" /></div>
            <div><Label>Width (cm)</Label><Input type="number" placeholder="15" className="mt-2" /></div>
            <div><Label>Height (cm)</Label><Input type="number" placeholder="5" className="mt-2" /></div>
            <div className="col-span-2"><Label>Shipping Class</Label>
              <Select><SelectTrigger className="mt-2 w-full"><SelectValue placeholder="Standard" /></SelectTrigger>
                <SelectContent><SelectItem value="standard">Standard</SelectItem><SelectItem value="express">Express</SelectItem><SelectItem value="free">Free Shipping</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
        </DemoBlock>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <DemoBlock title="Product Images">
          <div className="border-2 border-dashed border-defaultBorder rounded-lg p-6 text-center hover:border-primary hover:bg-lightprimary transition-colors cursor-pointer">
            <Icon icon="solar:gallery-add-bold-duotone" width={36} className="text-primary mx-auto mb-2" />
            <p className="text-sm font-medium">Click to upload</p>
            <p className="text-xs opacity-60 mt-1">PNG, JPG up to 5MB</p>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[1,2,3].map((i) => (
              <div key={i} className="aspect-square rounded-lg bg-lightgray dark:bg-dark flex items-center justify-center">
                <Icon icon="solar:gallery-bold-duotone" width={24} className="opacity-40" />
              </div>
            ))}
          </div>
        </DemoBlock>

        <DemoBlock title="Status">
          <Select defaultValue="draft">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs opacity-60 mt-2">Draft products are not visible to customers.</p>
        </DemoBlock>

        <DemoBlock title="Tags">
          <Input placeholder="Add tags (press Enter)" />
          <div className="flex flex-wrap gap-1.5 mt-2">
            {["new","featured","sale"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1 bg-lightprimary text-primary px-2 py-0.5 rounded-md text-xs">{t}<Icon icon="solar:close-circle-bold" width={12} className="cursor-pointer" /></span>
            ))}
          </div>
        </DemoBlock>

        <DemoBlock title="Visibility">
          <div className="space-y-3">
            <div className="flex items-center justify-between"><Label className="font-normal text-sm">Online Store</Label><Switch defaultChecked /></div>
            <div className="flex items-center justify-between"><Label className="font-normal text-sm">Marketplace</Label><Switch /></div>
            <div className="flex items-center justify-between"><Label className="font-normal text-sm">Search Engines</Label><Switch defaultChecked /></div>
          </div>
        </DemoBlock>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">Save Draft</Button>
          <Button className="flex-1 gap-2"><Icon icon="solar:check-circle-bold" width={16} /> Publish</Button>
        </div>
      </div>
    </form>
  );
};
