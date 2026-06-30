
export interface ChildItem {
  id?: number | string
  name?: string
  icon?: any
  children?: ChildItem[]
  item?: any
  url?: any
  color?: string
  disabled?: boolean
  subtitle?: string
  badge?: boolean
  badgeType?: string
  isPro?: boolean
}

export interface MenuItem {
  heading?: string
  name?: string
  icon?: any
  id?: number
  to?: string
  items?: MenuItem[]
  children?: ChildItem[]
  url?: any
  disabled?: boolean
  subtitle?: string
  badgeType?: string
  badge?: boolean
  isPro?: boolean
}

const SidebarContent: MenuItem[] = [
  {
    heading: 'Dashboards',
    children: [
      {
        name: "Dashboard",
        icon: "solar:widget-add-line-duotone",
        id: "menu-1",
        url: "/",
        isPro: false
      },
      {
        name: "Analytics",
        icon: "solar:chart-line-duotone",
        id: "menu-2",
        url: "/dashboards/analytics",
        isPro: false
      },
      {
        name: "Modern",
        icon: "solar:screencast-2-line-duotone",
        id: "menu-3",
        url: "/dashboards/modern",
        isPro: false
      },
      {
        name: "Minimal",
        icon: "solar:server-line-duotone",
        id: "menu-4",
        url: "/dashboards/minimal",
        isPro: false
      },
    ],
  },
  {
    heading: 'Front Pages',
    children: [
      { name: 'Homepage', icon: 'solar:home-angle-linear', id: 'menu-front-1', url: '/front/homepage', isPro: false },
      { name: 'About Us', icon: 'solar:info-circle-linear', id: 'menu-front-2', url: '/front/about', isPro: false },
      { name: 'Blog', icon: 'solar:document-line-duotone', id: 'menu-front-3', url: '/front/blog', isPro: false },
      { name: 'Blog Details', icon: 'solar:document-text-line-duotone', id: 'menu-front-4', url: '/front/blog-details', isPro: false },
      { name: 'Contact Us', icon: 'solar:phone-line-duotone', id: 'menu-front-5', url: '/front/contact', isPro: false },
      { name: 'Portfolio', icon: 'solar:gallery-line-duotone', id: 'menu-front-6', url: '/front/portfolio', isPro: false },
      { name: 'Pricing', icon: 'solar:tag-price-line-duotone', id: 'menu-front-7', url: '/front/pricing', isPro: false },
    ],
  },
  {
    heading: 'AI',
    children: [
      {
        name: 'Ai Table Builder',
        icon: 'solar:tablet-line-duotone',
        id: "menu-5",
        url: '/ai/table-builder',
        isPro: false,
      },
      {
        name: 'Ai Form Builder',
        icon: 'solar:align-vertical-spacing-line-duotone',
        id: "menu-6",
        url: '/ai/form-builder',
        isPro: false,
      },
      {
        name: 'Ai Chart Builder',
        icon: 'solar:chart-square-line-duotone',
        id: "menu-7",
        url: '/ai/chart-builder',
        isPro: false,
      },
    ],
  },
  {
    heading: 'Utilities',
    children: [
      {
        name: 'Typography',
        icon: 'solar:text-field-focus-line-duotone',
        id: "menu-8",
        url: '/utilities/typography',
        isPro: false,
      },
      {
        name: 'Table',
        icon: 'solar:tablet-line-duotone',
        id: "menu-9",
        url: '/utilities/table',
        isPro: false,
      },
      {
        name: 'Form',
        icon: 'solar:align-vertical-spacing-line-duotone',
        id: "menu-10",
        url: '/utilities/form',
        isPro: false,
      },
      {
        name: "Shadow",
        icon: "solar:box-3d-line-duotone",
        id: "menu-11",
        url: "/utilities/shadow",
        isPro: false,
      },
      {
        name: 'User Profile',
        icon: 'solar:user-circle-line-duotone',
        id: "menu-12",
        url: '/user-profile',
        isPro: false,
      },
    ],
  },
  {
    heading: 'Apps',
    children: [
      {
        name: 'Notes',
        icon: 'solar:notes-line-duotone',
        id: "menu-13",
        url: '/apps/notes',
        isPro: false,
      },
      {
        name: 'Tickets',
        icon: 'solar:ticket-line-duotone',
        id: "menu-14",
        url: '/apps/tickets',
        isPro: false,
      },
      {
        name: 'Contacts',
        icon: 'solar:users-group-rounded-line-duotone',
        id: "menu-15",
        url: '/apps/contacts',
        isPro: false,
      },
      {
        name: "Ecommerce",
        icon: "solar:cart-large-2-line-duotone",
        id: "menu-16",
        url: '#',
        children: [
          { name: "Shop", url: "/apps/ecommerce/shop", isPro: false },
          { name: "List", url: "/apps/ecommerce/list", isPro: false },
          { name: "Details", url: "/apps/ecommerce/details/1", isPro: false },
          { name: "Checkout", url: "/apps/ecommerce/checkout", isPro: false },
          { name: "Add Product", url: "/apps/ecommerce/add-product", isPro: false },
          { name: "Edit Product", url: "/apps/ecommerce/edit-product/1", isPro: false },
        ],
      },
      {
        name: "Blog",
        icon: "solar:document-add-line-duotone",
        id: "menu-17",
        url: '#',
        children: [
          { name: "Blog Post", url: "/apps/blog/post", isPro: false },
          { name: "Blog Detail", url: "/apps/blog/detail/1", isPro: false },
        ],
      },
      {
        name: "User Profile",
        icon: "solar:user-id-line-duotone",
        id: "menu-18",
        url: '#',
        children: [
          { name: "Profile", url: "/user-profile", isPro: false },
          { name: "Followers", url: "/apps/social/followers", isPro: false },
          { name: "Friends", url: "/apps/social/friends", isPro: false },
          { name: "Gallery", url: "/apps/social/gallery", isPro: false },
        ],
      },
      {
        name: "Invoice",
        icon: "solar:bill-list-line-duotone",
        id: "menu-19",
        url: '#',
        children: [
          { name: "List", url: "/apps/invoice/list", isPro: false },
          { name: "Details", url: "/apps/invoice/details/1", isPro: false },
          { name: "Create", url: "/apps/invoice/create", isPro: false },
          { name: "Edit", url: "/apps/invoice/edit/1", isPro: false },
        ],
      },
      {
        name: "Chats",
        icon: "solar:chat-round-line-line-duotone",
        id: "menu-20",
        url: "/apps/chats",
        isPro: false,
      },
      {
        name: "Calendar",
        icon: "solar:calendar-line-duotone",
        id: "menu-21",
        url: "/apps/calendar",
        isPro: false,
      },
      {
        name: "Email",
        icon: "solar:letter-unread-line-duotone",
        id: "menu-22",
        url: "/apps/email",
        isPro: false,
      },
      {
        name: "Kanban",
        icon: "solar:clipboard-check-line-duotone",
        id: "menu-23",
        url: "/apps/kanban",
        isPro: false,
      },
    ],
  },
  {
    heading: "Pages",
    children: [
      {
        name: "Pages",
        icon: "solar:document-line-duotone",
        id: "menu-24",
        url: '#',
        children: [
          { name: "Account Setting", url: "/pages/account-setting", isPro: false },
          { name: "FAQ", url: "/pages/faq", isPro: false },
          { name: "Pricing", url: "/pages/pricing", isPro: false },
          { name: "Landing Page", url: "/pages/landing", isPro: false },
          { name: "Role Based Access", url: "/pages/rbac", isPro: false },
        ],
      },
    ],
  },
  {
    heading: "Widgets",
    children: [
      { name: "Cards", icon: "solar:card-line-duotone", id: "menu-25", url: "/widgets/cards", isPro: false },
      { name: "Banners", icon: "solar:flag-2-line-duotone", id: "menu-26", url: "/widgets/banners", isPro: false },
      { name: "Charts", icon: "solar:chart-2-line-duotone", id: "menu-27", url: "/widgets/charts", isPro: false },
    ],
  },
  {
    heading: "UI",
    children: [
      {
        name: "UI Elements",
        icon: "solar:widget-5-line-duotone",
        id: "menu-28",
        url: '#',
        children: [
          { name: "Accordion", url: "/ui/accordion", isPro: false },
          { name: "Alert", url: "/ui/alert", isPro: false },
          { name: "Avatar", url: "/ui/avatar", isPro: false },
          { name: "Badge", url: "/ui/badge", isPro: false },
          { name: "Breadcrumb", url: "/ui/breadcrumbs", isPro: false },
          { name: "Button", url: "/ui/button", isPro: false },
          { name: "Button Group", url: "/ui/button-group", isPro: false },
          { name: "Card", url: "/ui/card", isPro: false },
          { name: "Carousel", url: "/ui/carousel", isPro: false },
          { name: "Drawer", url: "/ui/drawer", isPro: false },
          { name: "Dropdown", url: "/ui/dropdowns", isPro: false },
          { name: "Lists", url: "/ui/lists", isPro: false },
          { name: "Modal", url: "/ui/modals", isPro: false },
          { name: "Pagination", url: "/ui/pagination", isPro: false },
          { name: "Progressbar", url: "/ui/progressbar", isPro: false },
          { name: "Spinner", url: "/ui/spinner", isPro: false },
          { name: "Tab", url: "/ui/tab", isPro: false },
          { name: "Toast", url: "/ui/toast", isPro: false },
          { name: "Tooltip", url: "/ui/tooltip", isPro: false },
        ],
      },
    ],
  },
  {
    heading: "Headless UI",
    children: [
      {
        name: "UI Elements",
        icon: "solar:widget-6-line-duotone",
        id: "menu-headless-ui",
        url: '#',
        children: [
          { name: "Dropdown", url: "/headless/dropdown", isPro: false },
          { name: "Disclosure", url: "/headless/disclosure", isPro: false },
          { name: "Dialog", url: "/headless/dialog", isPro: false },
          { name: "Popover", url: "/headless/popover", isPro: false },
          { name: "Tabs", url: "/headless/tabs", isPro: false },
          { name: "Transition", url: "/headless/transition", isPro: false },
        ],
      },
      {
        name: "Form Elements",
        icon: "solar:align-vertical-spacing-line-duotone",
        id: "menu-headless-form",
        url: '#',
        children: [
          { name: "Buttons", url: "/headless/buttons", isPro: false },
          { name: "Checkbox", url: "/headless/checkbox", isPro: false },
          { name: "Combobox", url: "/headless/combobox", isPro: false },
          { name: "Fieldset", url: "/headless/fieldset", isPro: false },
          { name: "Input", url: "/headless/input", isPro: false },
          { name: "Listbox", url: "/headless/listbox", isPro: false },
          { name: "Radio Group", url: "/headless/radio-group", isPro: false },
          { name: "Select", url: "/headless/select", isPro: false },
          { name: "Switch", url: "/headless/switch", isPro: false },
          { name: "Textarea", url: "/headless/textarea", isPro: false },
        ],
      },
    ],
  },
  {
    heading: "Tables",
    children: [
      { name: "Basic Tables", icon: "solar:tablet-line-duotone", id: "menu-29", url: "/tables/basic", isPro: false },
      { name: "Striped Rows Table", icon: "solar:tablet-line-duotone", id: "menu-30", url: "/tables/striped", isPro: false },
      { name: "Hover Table", icon: "solar:tablet-line-duotone", id: "menu-31", url: "/tables/hover", isPro: false },
      { name: "Checkbox Table", icon: "solar:tablet-line-duotone", id: "menu-32", url: "/tables/checkbox", isPro: false },
      {
        name: "React Tables",
        icon: "solar:round-transfer-vertical-broken",
        id: "menu-33",
        url: '#',
        children: [
          { name: "Basic", url: "/tables/react/basic", isPro: false },
          { name: "Sorting", url: "/tables/react/sorting", isPro: false },
          { name: "Filtering", url: "/tables/react/filtering", isPro: false },
          { name: "Pagination", url: "/tables/react/pagination", isPro: false },
          { name: "Row Selection", url: "/tables/react/row-selection", isPro: false },
          { name: "Dense", url: "/tables/react/dense", isPro: false },
          { name: "Column Visibility", url: "/tables/react/column-visibility", isPro: false },
          { name: "Editable", url: "/tables/react/editable", isPro: false },
          { name: "Sticky", url: "/tables/react/sticky", isPro: false },
          { name: "Drag & Drop", url: "/tables/react/drag-drop", isPro: false },
          { name: "Empty", url: "/tables/react/empty", isPro: false },
          { name: "Expanding", url: "/tables/react/expanding", isPro: false },

        ],
      },
    ],
  },
  {
    heading: "Charts",
    children: [
      { name: "Line Chart", icon: "solar:chart-square-line-duotone", id: "menu-34", url: "/charts/line", isPro: false },
      { name: "Area Chart", icon: "solar:graph-new-broken", id: "menu-35", url: "/charts/area", isPro: false },
      { name: "Gradient Chart", icon: "solar:round-graph-outline", id: "menu-36", url: "/charts/gradient", isPro: false },
      { name: "Candlestick", icon: "solar:chandelier-outline", id: "menu-37", url: "/charts/candlestick", isPro: false },
      { name: "Column", icon: "solar:chart-2-bold-duotone", id: "menu-38", url: "/charts/column", isPro: false },
      { name: "Doughnut & Pie", icon: "solar:pie-chart-2-linear", id: "menu-39", url: "/charts/doughnut-pie", isPro: false },
      { name: "Radialbar & Radar", icon: "solar:graph-line-duotone", id: "menu-40", url: "/charts/radialbar-radar", isPro: false },
    ],
  },
  {
    heading: "Forms",
    children: [
      { name: "Form Elements", icon: "solar:text-selection-line-duotone", id: "menu-41", url: "/utilities/form", isPro: false },
      { name: "Form Layouts", icon: "solar:document-text-outline", id: "menu-42", url: "/forms/layouts", isPro: false },
      { name: "Form Horizontal", icon: "solar:slider-horizontal-line-duotone", id: "menu-43", url: "/forms/horizontal", isPro: false },
      { name: "Form Vertical", icon: "solar:slider-vertical-line-duotone", id: "menu-44", url: "/forms/vertical", isPro: false },
      { name: "Form Custom", icon: "solar:document-text-outline", id: "menu-45", url: "/forms/custom", isPro: false },
      { name: "Form Validation", icon: "solar:bill-check-linear", id: "menu-46", url: "/forms/validation", isPro: false },
    ],
  },
  {
    heading: "Auth",
    children: [
      { name: "Login", icon: "solar:login-2-linear", id: "menu-47", url: "/auth/login", isPro: false },
      { name: "Register", icon: "solar:shield-user-outline", id: "menu-48", url: "/auth/register", isPro: false },
      {
        name: "Auth Pages",
        icon: "solar:user-plus-rounded-line-duotone",
        id: "menu-49",
        url: '#',
        children: [
          { name: "Error 404", url: "/auth/error", isPro: false },
          { name: "Side Login", url: "/auth/side-login", isPro: false },
          { name: "Boxed Login", url: "/auth/boxed-login", isPro: false },
          { name: "Side Register", url: "/auth/side-register", isPro: false },
          { name: "Boxed Register", url: "/auth/boxed-register", isPro: false },
          { name: "Side Forgot Pwd", url: "/auth/side-forgot", isPro: false },
          { name: "Boxed Forgot Pwd", url: "/auth/boxed-forgot", isPro: false },
          { name: "Side Two Steps", url: "/auth/side-two-steps", isPro: false },
          { name: "Boxed Two Steps", url: "/auth/boxed-two-steps", isPro: false },
          { name: "Maintenance", url: "/auth/maintenance", isPro: false },
        ],
      },
    ],
  },
  {
    heading: "Icons",
    children: [
      { name: "Solar Icons", icon: "solar:sticker-smile-circle-outline", id: "menu-50", url: "/icons/solar", isPro: false },
      { name: "Tabler Icons", icon: "solar:sticker-smile-circle-outline", id: "menu-51", url: "/icons/tabler", isPro: false },
    ],
  },
  {
    heading: "Extra",
    children: [
      { name: "Sample Page", icon: "solar:notes-minimalistic-outline", id: "menu-52", url: "/sample-page", isPro: false },
    ],
  },
]

export default SidebarContent
