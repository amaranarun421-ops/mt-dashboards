import { SVGProps } from "react";

export type PropsType = SVGProps<SVGSVGElement>;

export function ChevronUp(props: PropsType) {
  return (
    <svg width={16} height={8} viewBox="0 0 16 8" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.553.728a.687.687 0 01.895 0l6.416 5.5a.688.688 0 01-.895 1.044L8 2.155 2.03 7.272a.688.688 0 11-.894-1.044l6.417-5.5z"
      />
    </svg>
  );
}

export function ChevronRight(props: PropsType) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M6 3.5L10.5 8L6 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomeIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M9 17.25a.75.75 0 000 1.5h6a.75.75 0 000-1.5H9z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 1.25c-.725 0-1.387.2-2.11.537-.702.327-1.512.81-2.528 1.415l-1.456.867c-1.119.667-2.01 1.198-2.686 1.706C2.523 6.3 2 6.84 1.66 7.551c-.342.711-.434 1.456-.405 2.325.029.841.176 1.864.36 3.146l.293 2.032c.237 1.65.426 2.959.707 3.978.29 1.05.702 1.885 1.445 2.524.742.64 1.63.925 2.716 1.062 1.056.132 2.387.132 4.066.132h2.316c1.68 0 3.01 0 4.066-.132 1.086-.137 1.974-.422 2.716-1.061.743-.64 1.155-1.474 1.445-2.525.281-1.02.47-2.328.707-3.978l.292-2.032c.185-1.282.332-2.305.36-3.146.03-.87-.062-1.614-.403-2.325C22 6.84 21.477 6.3 20.78 5.775c-.675-.508-1.567-1.039-2.686-1.706l-1.456-.867c-1.016-.605-1.826-1.088-2.527-1.415-.724-.338-1.386-.537-2.111-.537zM8.096 4.511c1.057-.63 1.803-1.073 2.428-1.365.609-.284 1.047-.396 1.476-.396.43 0 .867.112 1.476.396.625.292 1.37.735 2.428 1.365l1.385.825c1.165.694 1.986 1.184 2.59 1.638.587.443.91.809 1.11 1.225.199.416.282.894.257 1.626-.026.75-.16 1.691-.352 3.026l-.28 1.937c-.246 1.714-.422 2.928-.675 3.845-.247.896-.545 1.415-.977 1.787-.433.373-.994.593-1.925.71-.951.119-2.188.12-3.93.12h-2.213c-1.743 0-2.98-.001-3.931-.12-.93-.117-1.492-.337-1.925-.71-.432-.372-.73-.891-.977-1.787-.253-.917-.43-2.131-.676-3.845l-.279-1.937c-.192-1.335-.326-2.277-.352-3.026-.025-.732.058-1.21.258-1.626.2-.416.521-.782 1.11-1.225.603-.454 1.424-.944 2.589-1.638l1.385-.825z"
      />
    </svg>
  );
}

export function Calendar(props: PropsType) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M17 14a1 1 0 100-2 1 1 0 000 2zM17 18a1 1 0 100-2 1 1 0 000 2zM13 13a1 1 0 11-2 0 1 1 0 012 0zM13 17a1 1 0 11-2 0 1 1 0 012 0zM7 14a1 1 0 100-2 1 1 0 000 2zM7 18a1 1 0 100-2 1 1 0 000 2z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 1.75a.75.75 0 01.75.75v.763c.662-.013 1.391-.013 2.193-.013h4.113c.803 0 1.532 0 2.194.013V2.5a.75.75 0 011.5 0v.827c.26.02.506.045.739.076 1.172.158 2.121.49 2.87 1.238.748.749 1.08 1.698 1.238 2.87.153 1.14.153 2.595.153 4.433v2.112c0 1.838 0 3.294-.153 4.433-.158 1.172-.49 2.121-1.238 2.87-.749.748-1.698 1.08-2.87 1.238-1.14.153-2.595.153-4.433.153H9.944c-1.838 0-3.294 0-4.433-.153-1.172-.158-2.121-.49-2.87-1.238-.748-.749-1.08-1.698-1.238-2.87-.153-1.14-.153-2.595-.153-4.433v-2.112c0-1.838 0-3.294.153-4.433.158-1.172.49-2.121 1.238-2.87.749-.748 1.698-1.08 2.87-1.238.233-.031.48-.056.739-.076V2.5A.75.75 0 017 1.75zM5.71 4.89c-1.005.135-1.585.389-2.008.812-.423.423-.677 1.003-.812 2.009-.023.17-.042.35-.058.539h18.336c-.016-.19-.035-.369-.058-.54-.135-1.005-.389-1.585-.812-2.008-.423-.423-1.003-.677-2.009-.812-1.027-.138-2.382-.14-4.289-.14h-4c-1.907 0-3.261.002-4.29.14zM2.75 12c0-.854 0-1.597.013-2.25h18.474c.013.653.013 1.396.013 2.25v2c0 1.907-.002 3.262-.14 4.29-.135 1.005-.389 1.585-.812 2.008-.423.423-1.003.677-2.009.812-1.027.138-2.382.14-4.289.14h-4c-1.907 0-3.261-.002-4.29-.14-1.005-.135-1.585-.389-2.008-.812-.423-.423-.677-1.003-.812-2.009-.138-1.027-.14-2.382-.14-4.289v-2z"
        fill="currentColor"
      />
    </svg>
  );
}

export function User(props: PropsType) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 1.25a4.75 4.75 0 100 9.5 4.75 4.75 0 000-9.5zM8.75 6a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zM12 12.25c-2.313 0-4.445.526-6.024 1.414C4.42 14.54 3.25 15.866 3.25 17.5v.102c-.001 1.162-.002 2.62 1.277 3.662.629.512 1.51.877 2.7 1.117 1.192.242 2.747.369 4.773.369s3.58-.127 4.774-.369c1.19-.24 2.07-.605 2.7-1.117 1.279-1.042 1.277-2.5 1.276-3.662V17.5c0-1.634-1.17-2.96-2.725-3.836-1.58-.888-3.711-1.414-6.025-1.414zM4.75 17.5c0-.851.622-1.775 1.961-2.528 1.316-.74 3.184-1.222 5.29-1.222 2.104 0 3.972.482 5.288 1.222 1.34.753 1.961 1.677 1.961 2.528 0 1.308-.04 2.044-.724 2.6-.37.302-.99.597-2.05.811-1.057.214-2.502.339-4.476.339-1.974 0-3.42-.125-4.476-.339-1.06-.214-1.68-.509-2.05-.81-.684-.557-.724-1.293-.724-2.601z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Alphabet(props: PropsType) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.25 7A.75.75 0 013 6.25h10a.75.75 0 010 1.5H3A.75.75 0 012.25 7zm14.25-.75a.75.75 0 01.684.442l4.5 10a.75.75 0 11-1.368.616l-1.437-3.194H14.12l-1.437 3.194a.75.75 0 11-1.368-.616l4.5-10a.75.75 0 01.684-.442zm-1.704 6.364h3.408L16.5 8.828l-1.704 3.786zM2.25 12a.75.75 0 01.75-.75h7a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zm0 5a.75.75 0 01.75-.75h5a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Table(props: PropsType) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.29 4.89c-1.028-.138-2.383-.14-4.29-.14h-4c-1.907 0-3.261.002-4.29.14-1.005.135-1.585.389-2.008.812-.423.423-.677 1.003-.812 2.009-.138 1.028-.14 2.382-.14 4.289 0 1.907.002 3.261.14 4.29.135 1.005.389 1.585.812 2.008.423.423 1.003.677 2.009.812 1.028.138 2.382.14 4.289.14h4c1.907 0 3.262-.002 4.29-.14 1.005-.135 1.585-.389 2.008-.812.423-.423.677-1.003.812-2.009.138-1.028.14-2.382.14-4.289 0-1.907-.002-3.261-.14-4.29-.135-1.005-.389-1.585-.812-2.008-.423-.423-1.003-.677-2.009-.812zm.199-1.487c1.172.158 2.121.49 2.87 1.238.748.749 1.08 1.698 1.238 2.87.153 1.14.153 2.595.153 4.433v.112c0 1.838 0 3.294-.153 4.433-.158 1.172-.49 2.121-1.238 2.87-.749.748-1.698 1.08-2.87 1.238-1.14.153-2.595.153-4.433.153H9.944c-1.838 0-3.294 0-4.433-.153-1.172-.158-2.121-.49-2.87-1.238-.748-.749-1.08-1.698-1.238-2.87-.153-1.14-.153-2.595-.153-4.433v-.112c0-1.838 0-3.294.153-4.433.158-1.172.49-2.121 1.238-2.87.749-.748 1.698-1.08 2.87-1.238 1.14-.153 2.595-.153 4.433-.153h4.112c1.838 0 3.294 0 4.433.153zM8.25 17a.75.75 0 01.75-.75h6a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z"
      />
    </svg>
  );
}

export function PieChart(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.254 1.365c-1.096-.306-2.122.024-2.851.695-.719.66-1.153 1.646-1.153 2.7v6.695a2.295 2.295 0 002.295 2.295h6.694c1.055 0 2.042-.434 2.701-1.153.67-.729 1.001-1.755.695-2.851a12.102 12.102 0 00-8.38-8.381zM11.75 4.76c0-.652.27-1.232.668-1.597.386-.355.886-.508 1.433-.355 3.55.991 6.349 3.79 7.34 7.34.153.548 0 1.048-.355 1.434-.365.397-.945.667-1.597.667h-6.694a.795.795 0 01-.795-.795V4.761z"
        fill="currentColor"
      />
      <path
        d="M8.672 4.716a.75.75 0 00-.45-1.432C4.183 4.554 1.25 8.328 1.25 12.79c0 5.501 4.46 9.961 9.96 9.961 4.462 0 8.236-2.932 9.505-6.973a.75.75 0 10-1.43-.45 8.465 8.465 0 01-8.074 5.923 8.46 8.46 0 01-8.461-8.46 8.465 8.465 0 015.922-8.074z"
        fill="currentColor"
      />
    </svg>
  );
}

export function FourCircle(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.5 1.75a4.75 4.75 0 100 9.5 4.75 4.75 0 000-9.5zM3.25 6.5a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zM17.5 12.75a4.75 4.75 0 100 9.5 4.75 4.75 0 000-9.5zm-3.25 4.75a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zM12.75 6.5a4.75 4.75 0 119.5 0 4.75 4.75 0 01-9.5 0zm4.75-3.25a3.25 3.25 0 100 6.5 3.25 3.25 0 000-6.5zM6.5 12.75a4.75 4.75 0 100 9.5 4.75 4.75 0 000-9.5zM3.25 17.5a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Authentication(props: PropsType) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14.945 1.25c-1.367 0-2.47 0-3.337.117-.9.12-1.658.38-2.26.981-.524.525-.79 1.17-.929 1.928-.135.737-.161 1.638-.167 2.72a.75.75 0 001.5.008c.006-1.093.034-1.868.142-2.457.105-.566.272-.895.515-1.138.277-.277.666-.457 1.4-.556.755-.101 1.756-.103 3.191-.103h1c1.436 0 2.437.002 3.192.103.734.099 1.122.28 1.4.556.276.277.456.665.555 1.4.102.754.103 1.756.103 3.191v8c0 1.435-.001 2.436-.103 3.192-.099.734-.279 1.122-.556 1.399-.277.277-.665.457-1.399.556-.755.101-1.756.103-3.192.103h-1c-1.435 0-2.436-.002-3.192-.103-.733-.099-1.122-.28-1.399-.556-.243-.244-.41-.572-.515-1.138-.108-.589-.136-1.364-.142-2.457a.75.75 0 10-1.5.008c.006 1.082.032 1.983.167 2.72.14.758.405 1.403.93 1.928.601.602 1.36.86 2.26.982.866.116 1.969.116 3.336.116h1.11c1.368 0 2.47 0 3.337-.116.9-.122 1.658-.38 2.26-.982.602-.602.86-1.36.982-2.26.116-.867.116-1.97.116-3.337v-8.11c0-1.367 0-2.47-.116-3.337-.121-.9-.38-1.658-.982-2.26-.602-.602-1.36-.86-2.26-.981-.867-.117-1.97-.117-3.337-.117h-1.11z" />
      <path d="M2.001 11.249a.75.75 0 000 1.5h11.973l-1.961 1.68a.75.75 0 10.976 1.14l3.5-3a.75.75 0 000-1.14l-3.5-3a.75.75 0 00-.976 1.14l1.96 1.68H2.002z" />
    </svg>
  );
}

export function ArrowLeftIcon(props: PropsType) {
  return (
    <svg width={18} height={18} viewBox="0 0 18 18" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.89775 4.10225C8.11742 4.32192 8.11742 4.67808 7.89775 4.89775L4.358 8.4375H15C15.3107 8.4375 15.5625 8.68934 15.5625 9C15.5625 9.31066 15.3107 9.5625 15 9.5625H4.358L7.89775 13.1023C8.11742 13.3219 8.11742 13.6781 7.89775 13.8977C7.67808 14.1174 7.32192 14.1174 7.10225 13.8977L2.60225 9.39775C2.38258 9.17808 2.38258 8.82192 2.60225 8.60225L7.10225 4.10225C7.32192 3.88258 7.67808 3.88258 7.89775 4.10225Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ===== Helios Pro: navigation icon set ===== */

export function GridIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
      <rect x="14" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
      <rect x="3" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
      <rect x="14" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  );
}

export function ShoppingBagIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M6 8h12l-1 12H7L6 8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M9 8V6a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

export function UsersIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="9" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M3 20c0-3 2.7-5.5 6-5.5s6 2.5 6 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M16 4.5a3 3 0 010 6M18 20c0-2-.8-3.7-2-4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

export function WalletIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="6" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="17" cy="14.5" r="1.4" fill="currentColor"/>
    </svg>
  );
}

export function CloudIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M7 18a4 4 0 010-8 5 5 0 019.6-1.5A3.5 3.5 0 0117 18H7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  );
}

export function BriefcaseIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M3 13h18" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  );
}

export function MegaphoneIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M3 10v4a1 1 0 001 1h3l8 4V5L7 9H4a1 1 0 00-1 1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M19 8a4 4 0 010 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

export function CpuIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.6"/>
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

export function LifeBuoyIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M5 5l4.5 4.5M14.5 14.5L19 19M19 5l-4.5 4.5M9.5 14.5L5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

export function TruckIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M3 6h11v9H3V6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M14 9h4l3 3v3h-7V9z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <circle cx="7" cy="18" r="2" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="17" cy="18" r="2" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  );
}

export function MailIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function ChatIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 5h16a1 1 0 011 1v10a1 1 0 01-1 1H8l-4 4V6a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <circle cx="9" cy="11" r="1" fill="currentColor"/>
      <circle cx="13" cy="11" r="1" fill="currentColor"/>
      <circle cx="17" cy="11" r="1" fill="currentColor"/>
    </svg>
  );
}

export function KanbanIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="5" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
      <rect x="10" y="3" width="5" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
      <rect x="17" y="3" width="4" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  );
}

export function StickyNoteIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 4h12l4 4v12H4V4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M16 4v4h4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  );
}

export function CheckSquareIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function FolderIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M3 6a1 1 0 011-1h5l2 3h9a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  );
}

export function ContactBookIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 4h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M19 8h2v3h-2M19 13h2v3h-2" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="11" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7.5 16c.6-1.7 2-2.6 3.5-2.6s2.9.9 3.5 2.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function TicketIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 6a1 1 0 011-1h14a1 1 0 011 1v3a2 2 0 000 4v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3a2 2 0 000-4V6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M14 5v14" stroke="currentColor" strokeWidth="1.6" strokeDasharray="2 2"/>
    </svg>
  );
}

export function FileTextIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M5 3h9l5 5v13H5V3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M14 3v5h5M8 13h8M8 17h6M8 9h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

export function PackageIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 3l9 5v8l-9 5-9-5V8l9-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M12 3v18M3 8l9 5 9-5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  );
}

export function ShoppingCartIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="9" cy="20" r="1.6" fill="currentColor"/>
      <circle cx="18" cy="20" r="1.6" fill="currentColor"/>
      <path d="M2 3h2l3 13h12l2-8H6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function StarIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 3l2.6 5.7 6.4.6-4.8 4.3 1.4 6.3L12 16.9 6.4 19.9l1.4-6.3L3 9.3l6.4-.6L12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  );
}

export function TagIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M3 3h8l10 10-8 8L3 11V3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor"/>
    </svg>
  );
}

export function BoxIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M3 9h18M9 9v12" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  );
}

export function ShieldIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 3l8 3v6c0 4.5-3 8-8 9-5-1-8-4.5-8-9V6l8-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function CreditCardIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M7 15h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

export function ActivityIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M3 12h4l3 8 4-16 3 8h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function BellIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M6 9a6 6 0 1112 0c0 5 2 7 2 7H4s2-2 2-7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M10 20a2 2 0 004 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

export function PlugIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M9 3v6M15 3v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M6 9h12v3a6 6 0 01-12 0V9z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M12 18v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

export function InputIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="8" width="18" height="8" rx="2" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M7 12h10M7 12l2-2M7 12l2 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function ToggleIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="2" y="7" width="20" height="10" rx="5" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="16" cy="12" r="2.6" fill="currentColor"/>
    </svg>
  );
}

export function CalendarPlusIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M12 13v4M10 15h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

export function UploadIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M12 3v12M8 7l4-4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function EditIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 20h4l11-11a2.8 2.8 0 00-4-4L4 16v4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M13.5 6.5l4 4" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  );
}

export function CheckIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function LayersIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M3 13l9 5 9-5M3 17l9 5 9-5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  );
}

export function CandlestickIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M6 3v4M6 17v4M6 7h0a1 1 0 011 1v8a1 1 0 01-1 1H6a1 1 0 01-1-1V8a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M18 5v3M18 16v3M18 8h0a1 1 0 011 1v5a1 1 0 01-1 1h0a1 1 0 01-1-1V9a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  );
}

export function GaugeIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M3 14a9 9 0 1118 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M12 14l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <circle cx="12" cy="14" r="1.6" fill="currentColor"/>
    </svg>
  );
}

export function RadioIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M5 5a10 10 0 010 14M19 5a10 10 0 010 14M8 8a6 6 0 010 8M16 8a6 6 0 010 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

export function FileBarIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M5 3h9l5 5v13H5V3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M8 17v-3M11 17v-5M14 17v-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

export function BtnIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="8" width="18" height="8" rx="4" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M9 12h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

export function BadgeIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 3l8 4v5c0 4-3.5 7.5-8 9-4.5-1.5-8-5-8-9V7l8-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function CardIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M7 15h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

export function AlertIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 3l9 16H3l9-16z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M12 9v4M12 16h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

export function AvatarIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M6 18c1-2.5 3.5-4 6-4s5 1.5 6 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

export function DropdownIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M7 12h6M16 11l2 2-2 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function ModalIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M3 9h18M7 7h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

export function DrawerIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M14 3v18" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M16.5 9l1.5 1.5L16.5 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function TabsIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M3 9h18M8 5v4M14 5v4" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  );
}

export function AccordionIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="4" width="18" height="5" rx="1" stroke="currentColor" strokeWidth="1.6"/>
      <rect x="3" y="11" width="18" height="5" rx="1" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M7 6.5h2M7 13.5h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

export function TooltipIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M3 5h18v10H8l-5 4V5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <circle cx="12" cy="10" r="1" fill="currentColor"/>
      <path d="M9 10h.01M15 10h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

export function PopoverIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M8 15l4 6 4-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  );
}

export function PaginationIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="9" width="4" height="6" rx="1" stroke="currentColor" strokeWidth="1.6"/>
      <rect x="10" y="9" width="4" height="6" rx="1" stroke="currentColor" strokeWidth="1.6"/>
      <rect x="17" y="9" width="4" height="6" rx="1" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  );
}

export function ProgressIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="6" width="18" height="6" rx="3" stroke="currentColor" strokeWidth="1.6"/>
      <rect x="3" y="14" width="18" height="6" rx="3" stroke="currentColor" strokeWidth="1.6"/>
      <rect x="3" y="6" width="12" height="6" rx="3" fill="currentColor"/>
      <rect x="3" y="14" width="6" height="6" rx="3" fill="currentColor"/>
    </svg>
  );
}

export function SpinnerIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 3a9 9 0 109 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

export function ToastIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M7 10h6M7 14h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

export function TimelineIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M5 3v18M5 6h10M5 12h7M5 18h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <circle cx="5" cy="6" r="2" fill="currentColor"/>
      <circle cx="5" cy="12" r="2" fill="currentColor"/>
      <circle cx="5" cy="18" r="2" fill="currentColor"/>
    </svg>
  );
}

export function BannerIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 4h16v10H4zM4 14v6l4-3 4 3 4-3 4 3v-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  );
}

export function CommandIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M9 9V6a2.5 2.5 0 10-2.5 2.5H9zm0 0v6m0-6h6m-6 6v3a2.5 2.5 0 11-2.5-2.5H9zm0 0h6m0-6v6m0-6h2.5A2.5 2.5 0 1015 6v3zm0 6v3a2.5 2.5 0 102.5-2.5H15z" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  );
}

export function GlobeIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M3 12h18M12 3c2.5 2.5 4 6 4 9s-1.5 6.5-4 9c-2.5-2.5-4-6-4-9s1.5-6.5 4-9z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  );
}

export function RocketIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 3c4 2 6 6 6 11l-3 2H9l-3-2c0-5 2-9 6-11z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <circle cx="12" cy="9" r="1.6" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M9 18l-2 3M15 18l2 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

export function LifeBuoy(props: PropsType) { return LifeBuoyIcon(props); }

export function BookIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 4h7a3 3 0 013 3v13a3 3 0 00-3-3H4V4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M20 4h-7a3 3 0 00-3 3v13a3 3 0 013-3h7V4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  );
}

export function HelpCircleIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M9.5 9.5a2.5 2.5 0 114 2c-.8.6-1.5 1-1.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <circle cx="12" cy="17" r="1" fill="currentColor"/>
    </svg>
  );
}

export function PhoneIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M5 4h3l1.5 5L7 10c1 3 4 6 7 7l1-2.5L20 16v3a1 1 0 01-1 1A14 14 0 014 5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  );
}

export function WrenchIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M14 4a4 4 0 015 5l-9 9-4 1 1-4 7-9z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  );
}

export function MapPinIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  );
}

export function LockIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="4" y="10" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M8 10V7a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

export function LogInIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M14 4h4a2 2 0 012 2v12a2 2 0 01-2 2h-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M3 12h12M11 8l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function UserPlusIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="9" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M3 20c0-3 2.7-5.5 6-5.5s6 2.5 6 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M18 8v6M15 11h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

export function KeyIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="8" cy="8" r="4" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M11 11l8 8M16 16l2-2M14 18l2-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

export function RefreshCwIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M3 12a9 9 0 0115-6.7L21 8M21 8V3M21 8h-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 12a9 9 0 01-15 6.7L3 16M3 16v5M3 16h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function AlertTriangleIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 3l9 16H3l9-16z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M12 9v4M12 16h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

export function XCircleIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

export function ServerIcon(props: PropsType) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="4" width="18" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
      <rect x="3" y="13" width="18" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="7" cy="7.5" r="1" fill="currentColor"/>
      <circle cx="7" cy="16.5" r="1" fill="currentColor"/>
    </svg>
  );
}
