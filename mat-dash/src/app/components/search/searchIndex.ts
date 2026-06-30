// Centralized search index for the mtverse dashboard.
// Covers every page across all sections — A to Z.

export type SearchEntry = {
  label: string;
  path: string;
  section: string;
  keywords: string[];
  icon: string;
};

export const searchIndex: SearchEntry[] = [
  // Dashboards
  { label: "Dashboard", path: "/", section: "Dashboards", icon: "solar:widget-add-line-duotone", keywords: ["home", "main", "overview", "default"] },
  { label: "Analytics Dashboard", path: "/dashboards/analytics", section: "Dashboards", icon: "solar:chart-line-duotone", keywords: ["traffic", "sessions", "users", "conversion", "countries"] },
  { label: "Modern Dashboard", path: "/dashboards/modern", section: "Dashboards", icon: "solar:screencast-2-line-duotone", keywords: ["gradient", "hero", "revenue", "bold"] },
  { label: "Minimal Dashboard", path: "/dashboards/minimal", section: "Dashboards", icon: "solar:server-line-duotone", keywords: ["clean", "balance", "cashflow", "transactions"] },

  // AI Builders
  { label: "AI Table Builder", path: "/ai/table-builder", section: "AI", icon: "solar:tablet-line-duotone", keywords: ["generate", "auto", "data", "ai prompt"] },
  { label: "AI Form Builder", path: "/ai/form-builder", section: "AI", icon: "solar:align-vertical-spacing-line-duotone", keywords: ["generate", "auto", "input", "ai prompt"] },
  { label: "AI Chart Builder", path: "/ai/chart-builder", section: "AI", icon: "solar:chart-square-line-duotone", keywords: ["generate", "auto", "visualize", "ai prompt"] },

  // UI Elements (A-Z)
  { label: "Accordion", path: "/ui/accordion", section: "UI Elements", icon: "solar:align-vertical-spacing-line-duotone", keywords: ["collapse", "faq", "expand"] },
  { label: "Alert", path: "/ui/alert", section: "UI Elements", icon: "solar:danger-triangle-line-duotone", keywords: ["notice", "warning", "message", "feedback"] },
  { label: "Avatar", path: "/ui/avatar", section: "UI Elements", icon: "solar:user-circle-line-duotone", keywords: ["profile", "user", "image", "picture"] },
  { label: "Badge", path: "/ui/badge", section: "UI Elements", icon: "solar:medal-ribbon-star-line-duotone", keywords: ["tag", "pill", "label", "status"] },
  { label: "Breadcrumb", path: "/ui/breadcrumbs", section: "UI Elements", icon: "solar:route-line-duotone", keywords: ["navigation", "trail", "path"] },
  { label: "Button", path: "/ui/button", section: "UI Elements", icon: "solar:button-line-duotone", keywords: ["cta", "action", "click", "submit"] },
  { label: "Button Group", path: "/ui/button-group", section: "UI Elements", icon: "solar:widget-5-line-duotone", keywords: ["toolbar", "segmented", "toggle group"] },
  { label: "Card", path: "/ui/card", section: "UI Elements", icon: "solar:card-line-duotone", keywords: ["container", "panel", "box"] },
  { label: "Carousel", path: "/ui/carousel", section: "UI Elements", icon: "solar:gallery-line-duotone", keywords: ["slider", "testimonials", "images"] },
  { label: "Drawer", path: "/ui/drawer", section: "UI Elements", icon: "solar:side-bar-line-duotone", keywords: ["sheet", "panel", "slide"] },
  { label: "Dropdown", path: "/ui/dropdowns", section: "UI Elements", icon: "solar:alt-arrow-down-line-duotone", keywords: ["menu", "popover", "select"] },
  { label: "Lists", path: "/ui/lists", section: "UI Elements", icon: "solar:list-line-duotone", keywords: ["items", "tasks", "notifications", "feed"] },
  { label: "Modal", path: "/ui/modals", section: "UI Elements", icon: "solar:window-frame-line-duotone", keywords: ["dialog", "popup", "overlay"] },
  { label: "Pagination", path: "/ui/pagination", section: "UI Elements", icon: "solar:arrow-left-right-line-duotone", keywords: ["pages", "next", "previous", "nav"] },
  { label: "Progress Bar", path: "/ui/progressbar", section: "UI Elements", icon: "solar:progress-down-line-duotone", keywords: ["loading", "completion", "upload"] },
  { label: "Spinner", path: "/ui/spinner", section: "UI Elements", icon: "solar:restart-line-duotone", keywords: ["loader", "loading", "indicator"] },
  { label: "Tab", path: "/ui/tab", section: "UI Elements", icon: "solar:tab-line-duotone", keywords: ["tabs", "switch", "panel"] },
  { label: "Toast", path: "/ui/toast", section: "UI Elements", icon: "solar:bell-bing-line-duotone", keywords: ["notification", "snackbar", "alert"] },
  { label: "Tooltip", path: "/ui/tooltip", section: "UI Elements", icon: "solar:information-line-duotone", keywords: ["hint", "info", "hover"] },

  // Charts
  { label: "Line Chart", path: "/charts/line", section: "Charts", icon: "solar:chart-square-line-duotone", keywords: ["trend", "graph", "series"] },
  { label: "Area Chart", path: "/charts/area", section: "Charts", icon: "solar:graph-new-broken", keywords: ["filled", "trend", "gradient"] },
  { label: "Gradient Chart", path: "/charts/gradient", section: "Charts", icon: "solar:round-graph-outline", keywords: ["multi-color", "gradient fill"] },
  { label: "Candlestick Chart", path: "/charts/candlestick", section: "Charts", icon: "solar:chandelier-outline", keywords: ["ohlc", "stock", "finance", "trading"] },
  { label: "Column Chart", path: "/charts/column", section: "Charts", icon: "solar:chart-2-bold-duotone", keywords: ["bar", "vertical"] },
  { label: "Doughnut & Pie", path: "/charts/doughnut-pie", section: "Charts", icon: "solar:pie-chart-2-linear", keywords: ["donut", "circle", "composition"] },
  { label: "Radialbar & Radar", path: "/charts/radialbar-radar", section: "Charts", icon: "solar:graph-line-duotone", keywords: ["gauge", "skills", "progress"] },

  // Forms
  { label: "Form Elements", path: "/utilities/form", section: "Forms", icon: "solar:text-selection-line-duotone", keywords: ["input", "select", "checkbox", "radio"] },
  { label: "Form Layouts", path: "/forms/layouts", section: "Forms", icon: "solar:document-text-outline", keywords: ["stacked", "grid", "inline"] },
  { label: "Horizontal Form", path: "/forms/horizontal", section: "Forms", icon: "solar:slider-horizontal-line-duotone", keywords: ["label left", "desktop"] },
  { label: "Vertical Form", path: "/forms/vertical", section: "Forms", icon: "solar:slider-vertical-line-duotone", keywords: ["stacked", "mobile"] },
  { label: "Custom Form", path: "/forms/custom", section: "Forms", icon: "solar:document-text-outline", keywords: ["slider", "rating", "chips", "color picker"] },
  { label: "Form Validation", path: "/forms/validation", section: "Forms", icon: "solar:bill-check-linear", keywords: ["password strength", "error", "required"] },

  // Tables
  { label: "Basic Table", path: "/tables/basic", section: "Tables", icon: "solar:tablet-line-duotone", keywords: ["simple", "html"] },
  { label: "Striped Table", path: "/tables/striped", section: "Tables", icon: "solar:tablet-line-duotone", keywords: ["alternating", "rows"] },
  { label: "Hover Table", path: "/tables/hover", section: "Tables", icon: "solar:tablet-line-duotone", keywords: ["interactive", "highlight"] },
  { label: "Checkbox Table", path: "/tables/checkbox", section: "Tables", icon: "solar:tablet-line-duotone", keywords: ["select", "bulk"] },
  { label: "React Table — Basic", path: "/tables/react/basic", section: "Tables", icon: "solar:round-transfer-vertical-broken", keywords: ["tanstack", "data"] },
  { label: "React Table — Sorting", path: "/tables/react/sorting", section: "Tables", icon: "solar:round-transfer-vertical-broken", keywords: ["order", "asc", "desc"] },
  { label: "React Table — Filtering", path: "/tables/react/filtering", section: "Tables", icon: "solar:round-transfer-vertical-broken", keywords: ["search", "filter"] },
  { label: "React Table — Pagination", path: "/tables/react/pagination", section: "Tables", icon: "solar:round-transfer-vertical-broken", keywords: ["pages", "per page"] },
  { label: "React Table — Row Selection", path: "/tables/react/row-selection", section: "Tables", icon: "solar:round-transfer-vertical-broken", keywords: ["bulk", "select rows"] },

  // Apps
  { label: "Notes App", path: "/apps/notes", section: "Apps", icon: "solar:notes-line-duotone", keywords: ["memo", "write"] },
  { label: "Tickets", path: "/apps/tickets", section: "Apps", icon: "solar:ticket-line-duotone", keywords: ["support", "issue"] },
  { label: "Create Ticket", path: "/apps/tickets/create", section: "Apps", icon: "solar:add-circle-line-duotone", keywords: ["new", "support"] },
  { label: "Contacts", path: "/apps/contacts", section: "Apps", icon: "solar:users-group-rounded-line-duotone", keywords: ["people", "directory"] },
  { label: "Ecommerce Shop", path: "/apps/ecommerce/shop", section: "Apps", icon: "solar:cart-large-2-line-duotone", keywords: ["store", "products", "buy"] },
  { label: "Product List", path: "/apps/ecommerce/list", section: "Apps", icon: "solar:list-check-line-duotone", keywords: ["catalog", "manage"] },
  { label: "Product Details", path: "/apps/ecommerce/details/1", section: "Apps", icon: "solar:box-line-duotone", keywords: ["single", "view"] },
  { label: "Checkout", path: "/apps/ecommerce/checkout", section: "Apps", icon: "solar:cart-large-line-duotone", keywords: ["pay", "cart", "order"] },
  { label: "Add Product", path: "/apps/ecommerce/add-product", section: "Apps", icon: "solar:add-square-line-duotone", keywords: ["new", "create"] },
  { label: "Blog Post", path: "/apps/blog/post", section: "Apps", icon: "solar:document-add-line-duotone", keywords: ["article", "write"] },
  { label: "Blog Detail", path: "/apps/blog/detail/1", section: "Apps", icon: "solar:document-text-line-duotone", keywords: ["article", "read"] },
  { label: "Invoice List", path: "/apps/invoice/list", section: "Apps", icon: "solar:bill-list-line-duotone", keywords: ["billing", "payment"] },
  { label: "Invoice Details", path: "/apps/invoice/details/1", section: "Apps", icon: "solar:bill-line-duotone", keywords: ["view", "receipt"] },
  { label: "Create Invoice", path: "/apps/invoice/create", section: "Apps", icon: "solar:add-circle-line-duotone", keywords: ["new", "bill"] },
  { label: "Chats", path: "/apps/chats", section: "Apps", icon: "solar:chat-round-line-line-duotone", keywords: ["message", "chat", "dm"] },
  { label: "Calendar", path: "/apps/calendar", section: "Apps", icon: "solar:calendar-line-duotone", keywords: ["schedule", "events"] },
  { label: "Email", path: "/apps/email", section: "Apps", icon: "solar:letter-unread-line-duotone", keywords: ["inbox", "mail"] },
  { label: "Kanban Board", path: "/apps/kanban", section: "Apps", icon: "solar:clipboard-check-line-duotone", keywords: ["tasks", "drag", "drop"] },
  { label: "Followers", path: "/apps/social/followers", section: "Apps", icon: "solar:users-group-two-line-duotone", keywords: ["social", "network"] },
  { label: "Friends", path: "/apps/social/friends", section: "Apps", icon: "solar:user-heart-line-duotone", keywords: ["connections", "social"] },
  { label: "Gallery", path: "/apps/social/gallery", section: "Apps", icon: "solar:gallery-line-duotone", keywords: ["photos", "images", "lightbox"] },

  // Pages
  { label: "Account Settings", path: "/pages/account-setting", section: "Pages", icon: "solar:settings-line-duotone", keywords: ["profile", "security", "billing"] },
  { label: "FAQ", path: "/pages/faq", section: "Pages", icon: "solar:question-circle-line-duotone", keywords: ["help", "questions", "support"] },
  { label: "Pricing", path: "/pages/pricing", section: "Pages", icon: "solar:tag-price-line-duotone", keywords: ["plans", "subscription", "cost"] },
  { label: "Landing Page", path: "/pages/landing", section: "Pages", icon: "solar:rocket-line-duotone", keywords: ["marketing", "hero", "cta"] },
  { label: "Role-Based Access", path: "/pages/rbac", section: "Pages", icon: "solar:shield-keyhole-line-duotone", keywords: ["permissions", "rbac", "roles"] },

  // Widgets
  { label: "Widget Cards", path: "/widgets/cards", section: "Widgets", icon: "solar:card-line-duotone", keywords: ["stats", "kpis"] },
  { label: "Widget Banners", path: "/widgets/banners", section: "Widgets", icon: "solar:flag-2-line-duotone", keywords: ["promo", "cta", "alert"] },
  { label: "Widget Charts", path: "/widgets/charts", section: "Widgets", icon: "solar:chart-2-line-duotone", keywords: ["sparkline", "mini"] },

  // Auth
  { label: "Login", path: "/auth/login", section: "Auth", icon: "solar:login-2-linear", keywords: ["signin", "sign in"] },
  { label: "Register", path: "/auth/register", section: "Auth", icon: "solar:shield-user-outline", keywords: ["signup", "sign up", "create account"] },
  { label: "Side Login", path: "/auth/side-login", section: "Auth", icon: "solar:login-3-line-duotone", keywords: ["split", "signin"] },
  { label: "Boxed Login", path: "/auth/boxed-login", section: "Auth", icon: "solar:login-3-line-duotone", keywords: ["centered", "signin"] },
  { label: "Side Register", path: "/auth/side-register", section: "Auth", icon: "solar:user-plus-rounded-line-duotone", keywords: ["split", "signup"] },
  { label: "Boxed Register", path: "/auth/boxed-register", section: "Auth", icon: "solar:user-plus-rounded-line-duotone", keywords: ["centered", "signup"] },
  { label: "Side Forgot Password", path: "/auth/side-forgot", section: "Auth", icon: "solar:password-outline", keywords: ["reset", "split"] },
  { label: "Boxed Forgot Password", path: "/auth/boxed-forgot", section: "Auth", icon: "solar:password-outline", keywords: ["reset", "centered"] },
  { label: "Error 404", path: "/auth/error", section: "Auth", icon: "solar:bug-minimalistic-line-duotone", keywords: ["404", "not found"] },
  { label: "Maintenance", path: "/auth/maintenance", section: "Auth", icon: "solar:settings-outline", keywords: ["down", "offline"] },

  // Icons
  { label: "Solar Icons", path: "/icons/solar", section: "Icons", icon: "solar:sticker-smile-circle-outline", keywords: ["iconify"] },
  { label: "Tabler Icons", path: "/icons/tabler", section: "Icons", icon: "solar:sticker-smile-circle-outline", keywords: ["iconify"] },

  // Utilities
  { label: "Typography", path: "/utilities/typography", section: "Utilities", icon: "solar:text-field-focus-line-duotone", keywords: ["headings", "fonts", "text"] },
  { label: "Shadow", path: "/utilities/shadow", section: "Utilities", icon: "solar:box-3d-line-duotone", keywords: ["elevation", "depth"] },
  { label: "Sample Page", path: "/sample-page", section: "Utilities", icon: "solar:notes-minimalistic-outline", keywords: ["example", "demo"] },
  { label: "User Profile", path: "/user-profile", section: "Utilities", icon: "solar:user-id-line-duotone", keywords: ["account", "me"] },

  // Front Pages
  { label: "Homepage", path: "/front/homepage", section: "Front Pages", icon: "solar:home-angle-linear", keywords: ["landing", "marketing", "hero"] },
  { label: "About Us", path: "/front/about", section: "Front Pages", icon: "solar:info-circle-linear", keywords: ["company", "team", "mission"] },
  { label: "Blog (Front)", path: "/front/blog", section: "Front Pages", icon: "solar:document-line-duotone", keywords: ["articles", "posts", "news"] },
  { label: "Blog Details (Front)", path: "/front/blog-details", section: "Front Pages", icon: "solar:document-text-line-duotone", keywords: ["article", "read"] },
  { label: "Contact Us", path: "/front/contact", section: "Front Pages", icon: "solar:phone-line-duotone", keywords: ["email", "phone", "support"] },
  { label: "Portfolio", path: "/front/portfolio", section: "Front Pages", icon: "solar:gallery-line-duotone", keywords: ["projects", "work", "showcase"] },
  { label: "Pricing (Front)", path: "/front/pricing", section: "Front Pages", icon: "solar:tag-price-line-duotone", keywords: ["plans", "subscription"] },

  // Additional UI Elements
  { label: "Banner", path: "/ui/banner", section: "UI Elements", icon: "solar:flag-2-line-duotone", keywords: ["promo", "cta", "alert"] },
  { label: "Datepicker", path: "/ui/datepicker", section: "UI Elements", icon: "solar:calendar-line-duotone", keywords: ["calendar", "date", "schedule"] },
  { label: "Footer", path: "/ui/footer", section: "UI Elements", icon: "solar:document-line-duotone", keywords: ["bottom", "links", "copyright"] },
  { label: "KBD", path: "/ui/kbd", section: "UI Elements", icon: "solar:keyboard-line-duotone", keywords: ["keyboard", "shortcut", "hotkey"] },
  { label: "Mega Menu", path: "/ui/mega-menu", section: "UI Elements", icon: "solar:widget-6-line-duotone", keywords: ["navigation", "dropdown", "categories"] },
  { label: "Navbar", path: "/ui/navbar", section: "UI Elements", icon: "solar:menu-line-duotone", keywords: ["navigation", "header", "top"] },
  { label: "Popover (UI)", path: "/ui/popover", section: "UI Elements", icon: "solar:chat-square-line-duotone", keywords: ["floating", "tooltip", "info"] },
  { label: "Rating", path: "/ui/rating", section: "UI Elements", icon: "solar:star-line-duotone", keywords: ["stars", "review", "feedback"] },
  { label: "Sidebar (UI)", path: "/ui/sidebar", section: "UI Elements", icon: "solar:side-bar-line-duotone", keywords: ["navigation", "nav", "menu"] },
  { label: "Tables (UI)", path: "/ui/tables", section: "UI Elements", icon: "solar:tablet-line-duotone", keywords: ["data", "grid", "rows"] },
  { label: "Timeline", path: "/ui/timeline", section: "UI Elements", icon: "solar:clock-circle-line-duotone", keywords: ["activity", "feed", "history"] },

  // Headless UI
  { label: "Headless Dropdown", path: "/headless/dropdown", section: "Headless UI", icon: "solar:alt-arrow-down-line-duotone", keywords: ["menu", "select"] },
  { label: "Headless Disclosure", path: "/headless/disclosure", section: "Headless UI", icon: "solar:align-vertical-spacing-line-duotone", keywords: ["collapse", "expand"] },
  { label: "Headless Dialog", path: "/headless/dialog", section: "Headless UI", icon: "solar:window-frame-line-duotone", keywords: ["modal", "popup"] },
  { label: "Headless Popover", path: "/headless/popover", section: "Headless UI", icon: "solar:chat-square-line-duotone", keywords: ["floating", "info"] },
  { label: "Headless Tabs", path: "/headless/tabs", section: "Headless UI", icon: "solar:tab-line-duotone", keywords: ["switch", "panel"] },
  { label: "Headless Transition", path: "/headless/transition", section: "Headless UI", icon: "solar:transfer-horizontal-line-duotone", keywords: ["animation", "fade", "slide"] },
  { label: "Headless Buttons", path: "/headless/buttons", section: "Headless UI", icon: "solar:button-line-duotone", keywords: ["cta", "click"] },
  { label: "Headless Checkbox", path: "/headless/checkbox", section: "Headless UI", icon: "solar:check-square-line-duotone", keywords: ["select", "toggle"] },
  { label: "Headless Combobox", path: "/headless/combobox", section: "Headless UI", icon: "solar:list-line-duotone", keywords: ["searchable", "select"] },
  { label: "Headless Fieldset", path: "/headless/fieldset", section: "Headless UI", icon: "solar:document-text-line-duotone", keywords: ["group", "form"] },
  { label: "Headless Input", path: "/headless/input", section: "Headless UI", icon: "solar:text-field-line-duotone", keywords: ["text", "type"] },
  { label: "Headless Listbox", path: "/headless/listbox", section: "Headless UI", icon: "solar:list-check-line-duotone", keywords: ["list", "select"] },
  { label: "Headless Radio Group", path: "/headless/radio-group", section: "Headless UI", icon: "solar:record-circle-line-duotone", keywords: ["single", "select"] },
  { label: "Headless Select", path: "/headless/select", section: "Headless UI", icon: "solar:alt-arrow-down-line-duotone", keywords: ["dropdown", "choose"] },
  { label: "Headless Switch", path: "/headless/switch", section: "Headless UI", icon: "solar:toggle-line-duotone", keywords: ["toggle", "on", "off"] },
  { label: "Headless Textarea", path: "/headless/textarea", section: "Headless UI", icon: "solar:document-text-line-duotone", keywords: ["multi-line", "text"] },

  // Additional React Tables
  { label: "React Table — Dense", path: "/tables/react/dense", section: "Tables", icon: "solar:round-transfer-vertical-broken", keywords: ["compact", "tight"] },
  { label: "React Table — Column Visibility", path: "/tables/react/column-visibility", section: "Tables", icon: "solar:round-transfer-vertical-broken", keywords: ["toggle", "show", "hide"] },
  { label: "React Table — Editable", path: "/tables/react/editable", section: "Tables", icon: "solar:round-transfer-vertical-broken", keywords: ["edit", "inline"] },
  { label: "React Table — Sticky", path: "/tables/react/sticky", section: "Tables", icon: "solar:round-transfer-vertical-broken", keywords: ["pinned", "header"] },
  { label: "React Table — Drag & Drop", path: "/tables/react/drag-drop", section: "Tables", icon: "solar:round-transfer-vertical-broken", keywords: ["reorder", "drag"] },
  { label: "React Table — Empty", path: "/tables/react/empty", section: "Tables", icon: "solar:round-transfer-vertical-broken", keywords: ["no data", "empty state"] },
  { label: "React Table — Expanding", path: "/tables/react/expanding", section: "Tables", icon: "solar:round-transfer-vertical-broken", keywords: ["expand", "detail"] },

  // Additional Auth
  { label: "Side Two Steps", path: "/auth/side-two-steps", section: "Auth", icon: "solar:password-outline", keywords: ["2fa", "verification", "otp"] },
  { label: "Boxed Two Steps", path: "/auth/boxed-two-steps", section: "Auth", icon: "solar:password-outline", keywords: ["2fa", "verification", "otp"] },
];

export const searchSections = [
  "Dashboards",
  "AI",
  "UI Elements",
  "Charts",
  "Forms",
  "Tables",
  "Apps",
  "Pages",
  "Widgets",
  "Auth",
  "Icons",
  "Utilities",
  "Front Pages",
  "Headless UI",
];
