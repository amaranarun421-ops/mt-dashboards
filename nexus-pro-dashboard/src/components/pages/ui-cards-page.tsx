"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/status-badge";
import { TrendingUp, MoreHorizontal, Bell, Users, Star } from "lucide-react";

export function UiCardsPage() {
  return (
    <div>
      <PageHeader breadcrumb={["UI Components", "Cards"]} title="Cards" description="Container variations for content organization." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="p-5"><h3 className="mb-2 text-base font-semibold">Basic Card</h3><p className="text-sm text-gray-500 dark:text-gray-400">A simple card with padding and a subtle border. Used for grouping related content.</p></Card>
        <Card className="card-hover p-5"><h3 className="mb-2 text-base font-semibold">Hoverable Card</h3><p className="text-sm text-gray-500 dark:text-gray-400">Hover me to see the lift effect. Useful for clickable items in a grid.</p></Card>
        <Card className="p-5"><div className="mb-3 flex items-center justify-between"><h3 className="text-base font-semibold">With Action</h3><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button></div><p className="text-sm text-gray-500 dark:text-gray-400">Cards can include header actions for menus and quick operations.</p></Card>
        <Card className="p-5"><div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500"><TrendingUp className="h-5 w-5" /></div><p className="text-2xl font-bold">$48,210</p><p className="text-sm text-gray-500 dark:text-gray-400">Revenue this month</p><div className="mt-2"><StatusBadge variant="success">+12.4%</StatusBadge></div></Card>
        <Card className="p-5"><div className="mb-3 flex items-center justify-between"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-light-500/10 text-blue-light-500"><Users className="h-5 w-5" /></div><StatusBadge variant="primary" dot pulse>Live</StatusBadge></div><p className="text-2xl font-bold">2,842</p><p className="text-sm text-gray-500 dark:text-gray-400">Active users right now</p></Card>
        <Card className="p-0 overflow-hidden"><div className="h-24 bg-gradient-to-br from-primary/30 to-info/20" /><div className="p-5"><h3 className="text-base font-semibold">Card with Banner</h3><p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Cards can include visual headers for richer presentation.</p><Button size="sm" className="mt-3">Learn More</Button></div></Card>
      </div>
    </div>
  );
}
