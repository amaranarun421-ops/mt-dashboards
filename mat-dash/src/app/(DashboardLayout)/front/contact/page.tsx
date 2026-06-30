"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";

const FrontContact = () => {
  const [sent, setSent] = useState(false);

  return (
    <PageContainer title="Contact Us" description="Get in touch with our team. We'd love to hear from you.">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Contact info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl bg-primary text-white p-6">
            <h3 className="text-lg font-bold mb-1">Let's Talk</h3>
            <p className="text-sm opacity-90 mb-4">Have a question? We're here to help.</p>
            <div className="space-y-3">
              {[
                { icon: "solar:letter-bold", label: "Email", value: "support@mtverse.io" },
                { icon: "solar:phone-bold", label: "Phone", value: "+1 555 000 1234" },
                { icon: "solar:map-point-bold", label: "Address", value: "123 Market St, San Francisco, CA" },
                { icon: "solar:headset-round-sound-bold", label: "Live Chat", value: "Available 24/7" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <Icon icon={c.icon} width={20} />
                  </div>
                  <div><p className="text-xs opacity-80">{c.label}</p><p className="text-sm font-medium">{c.value}</p></div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-background border border-defaultBorder p-6">
            <h4 className="font-semibold text-sm mb-3">Follow Us</h4>
            <div className="flex gap-2">
              {["solar:twitter-logo-bold", "solar:facebook-logo-bold", "solar:linkedin-logo-bold", "solar:instagram-logo-bold", "solar:youtube-logo-bold"].map((i) => (
                <button key={i} className="h-9 w-9 rounded-lg bg-lightgray dark:bg-dark hover:bg-primary hover:text-white flex items-center justify-center transition-colors">
                  <Icon icon={i} width={16} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-3 rounded-xl bg-background border border-defaultBorder p-6">
          {sent ? (
            <div className="text-center py-16">
              <div className="h-16 w-16 rounded-full bg-lightsuccess text-success mx-auto flex items-center justify-center mb-4">
                <Icon icon="solar:check-circle-bold-duotone" width={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
              <p className="text-sm text-muted-foreground mb-4">We'll get back to you within 24 hours.</p>
              <Badge variant="lightSuccess" className="gap-1"><Icon icon="solar:check-circle-bold" width={12} /> Success</Badge>
              <div className="mt-6"><Button variant="outline" onClick={() => setSent(false)}>Send Another Message</Button></div>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
              <div className="pb-3 border-b border-defaultBorder mb-2">
                <h3 className="text-lg font-semibold">Send us a message</h3>
                <p className="text-sm text-muted-foreground">Fill out the form below and we'll respond within 24 hours.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>First Name *</Label><Input className="mt-1.5" placeholder="John" required /></div>
                <div><Label>Last Name *</Label><Input className="mt-1.5" placeholder="Doe" required /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Email *</Label><Input type="email" className="mt-1.5" placeholder="you@example.com" required /></div>
                <div><Label>Phone</Label><Input type="tel" className="mt-1.5" placeholder="+1 555 000 1234" /></div>
              </div>
              <div><Label>Subject *</Label><Input className="mt-1.5" placeholder="How can we help?" required /></div>
              <div><Label>Message *</Label><Textarea placeholder="Tell us more about your project..." rows={5} className="mt-1.5" required /></div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">We'll never share your information.</p>
                <Button type="submit" className="gap-2"><Icon icon="solar:letter-bold" width={16} /> Send Message</Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default FrontContact;
