import * as React from "react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Home, Search, Bell, Mail, User, Settings, Star, Heart, Plus, Edit, Trash2, Download, Upload, Check, X, ChevronRight, ChevronLeft, ArrowUp, ArrowDown, ArrowRight, ArrowLeft, Calendar, Clock, MapPin, Phone, MessageSquare, FileText, Folder, Image, Video, Music, Lock, Eye, EyeOff, Filter, SortAsc, SortDesc, Menu, MoreVertical, MoreHorizontal, RefreshCw, Save, Printer, Share, Copy, Link, ExternalLink, LogOut, LogIn, UserPlus, UserMinus, Shield, Key, Zap, Cloud, Sun, Moon, Star as StarIcon, Award, Gift, Flag, Bookmark, Tag, Package, Truck, ShoppingCart, CreditCard, Wallet, Banknote, TrendingUp, TrendingDown, Activity, BarChart, PieChart, LineChart, Database, Server, Cpu, HardDrive, Wifi, Code, GitBranch, Terminal, Bug, Lightbulb, Bell as BellIcon } from "lucide-react";

const icons = [Home, Search, Bell, Mail, User, Settings, Star, Heart, Plus, Edit, Trash2, Download, Upload, Check, X, ChevronRight, ChevronLeft, ArrowUp, ArrowDown, Calendar, Clock, MapPin, Phone, MessageSquare, FileText, Folder, Image, Video, Music, Lock, Eye, Filter, Menu, MoreVertical, RefreshCw, Save, Share, Copy, Link, ExternalLink, LogOut, LogIn, UserPlus, Shield, Key, Zap, Cloud, Sun, Moon, Award, Gift, Flag, Bookmark, Tag, Package, Truck, ShoppingCart, CreditCard, Wallet, TrendingUp, TrendingDown, Activity, BarChart, Database, Server, Cpu, HardDrive, Wifi, Code, GitBranch, Terminal, Bug, Lightbulb];

export function UiIconsPage() {
  return (
    <div>
      <PageHeader breadcrumb={["UI Components", "Icons"]} title="Icons" description="Lucide icon library — clean, consistent, and customizable." />
      <Card className="p-6"><div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12">{icons.map((Icon, i) => (<button key={i} className="group flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border border-border p-2 transition hover:border-brand-500/40 hover:bg-brand-500/5"><Icon className="h-5 w-5 text-gray-500 dark:text-gray-400 transition group-hover:text-brand-500" /><span className="text-[9px] text-gray-500 dark:text-gray-400/0 transition group-hover:text-gray-500 dark:text-gray-400">icon</span></button>))}</div></Card>
    </div>
  );
}
