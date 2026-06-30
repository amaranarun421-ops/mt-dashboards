/* ========================================================================
   Logistics dashboard mock data — realistic operations numbers.
   ======================================================================== */

export const logisticsDisclaimer = 'Live operations data for dashboard preview.';

/* ---- Live Delivery Map ---- */
export const mapMetrics = {
  activeShipments: 12840,
  inTransit: 8620,
  delayed: 284,
  onTimeRate: 94.6,
  avgDeliveryTime: '2h 18m',
};

export type MapMarker = {
  id: string;
  lat: number;
  lng: number;
  type: 'truck' | 'van' | 'bike' | 'warehouse' | 'delayed';
  shipmentId: string;
  driver: string;
  route: string;
  eta: string;
  slaStatus: 'on-time' | 'at-risk' | 'delayed';
};

export const mapMarkers: MapMarker[] = [
  { id: 'm1', lat: 40.71, lng: -74.01, type: 'truck', shipmentId: '#28745-72809BJK', driver: 'Alex Chen', route: 'WH4 → Downtown Hub → Customer', eta: 'Today 4:35 PM', slaStatus: 'on-time' },
  { id: 'm2', lat: 34.05, lng: -118.24, type: 'van', shipmentId: '#28746-83920KLM', driver: 'Maria Lopez', route: 'WH2 → Westside → Customer', eta: 'Today 5:15 PM', slaStatus: 'on-time' },
  { id: 'm3', lat: 51.51, lng: -0.13, type: 'truck', shipmentId: '#28747-90182NPR', driver: 'James Park', route: 'WH1 → Central London → Customer', eta: 'Today 3:45 PM', slaStatus: 'at-risk' },
  { id: 'm4', lat: 52.52, lng: 13.40, type: 'van', shipmentId: '#28748-10293QRS', driver: 'Sara Nguyen', route: 'WH3 → Berlin Mitte → Customer', eta: 'Tomorrow 10:00 AM', slaStatus: 'delayed' },
  { id: 'm5', lat: 35.68, lng: 139.69, type: 'bike', shipmentId: '#28749-30415TUV', driver: 'Devon Lane', route: 'WH5 → Shibuya → Customer', eta: 'Today 6:00 PM', slaStatus: 'on-time' },
  { id: 'm6', lat: -33.87, lng: 151.21, type: 'van', shipmentId: '#28750-50628WXY', driver: 'Jane Cooper', route: 'WH6 → Sydney CBD → Customer', eta: 'Today 2:30 PM', slaStatus: 'on-time' },
  { id: 'm7', lat: 37.77, lng: -122.42, type: 'warehouse', shipmentId: 'WH4-North', driver: '—', route: 'North Hub Warehouse', eta: '—', slaStatus: 'on-time' },
  { id: 'm8', lat: 41.88, lng: -87.63, type: 'truck', shipmentId: '#28751-70839ZAB', driver: 'Albert Flores', route: 'WH4 → Chicago Loop → Customer', eta: 'Today 5:45 PM', slaStatus: 'at-risk' },
  { id: 'm9', lat: 25.76, lng: -80.19, type: 'delayed', shipmentId: '#28752-91042CDE', driver: 'Kristin Watson', route: 'WH7 → Miami → Customer', eta: 'Delayed +4h', slaStatus: 'delayed' },
];

/* ---- Shipment Tracker (selected shipment) ---- */
export const selectedShipment = {
  trackingId: '#28745-72809BJK',
  status: 'In Transit',
  carrier: 'DHL Express',
  eta: 'Today 4:35 PM',
  route: 'Warehouse 4 → Downtown Hub → Customer',
  timeline: [
    { step: 'Picked up', time: '9:15 AM', done: true, detail: 'Package scanned at Warehouse 4' },
    { step: 'In transit', time: '11:42 AM', done: true, detail: 'Departed Downtown Hub' },
    { step: 'Out for delivery', time: '2:30 PM', done: false, detail: 'Estimated — awaiting scan' },
    { step: 'Delivered', time: '4:35 PM', done: false, detail: 'Estimated delivery time' },
  ],
};

/* ---- Fleet Health ---- */
export const fleetHealth = {
  vehiclesActive: 428,
  idle: 36,
  maintenanceDue: 18,
  fuelAverage: 72,
  vehicles: [
    { type: 'Truck', active: 284, total: 320, icon: 'truck' },
    { type: 'Van', active: 96, total: 120, icon: 'van' },
    { type: 'Bike', active: 48, total: 60, icon: 'bike' },
    { type: 'EV Van', active: 62, total: 80, icon: 'ev' },
  ],
};

/* ---- Delivery Statistics ---- */
export type DeliveryStat = {
  date: string;
  shipments: number;
  delivered: number;
  delayed: number;
  returned: number;
};

export const deliveryStats: DeliveryStat[] = [
  { date: 'May 25', shipments: 8420, delivered: 7820, delayed: 180, returned: 42 },
  { date: 'May 28', shipments: 9180, delivered: 8640, delayed: 220, returned: 38 },
  { date: 'Jun 01', shipments: 10240, delivered: 9680, delayed: 198, returned: 52 },
  { date: 'Jun 04', shipments: 11280, delivered: 10720, delayed: 248, returned: 48 },
  { date: 'Jun 07', shipments: 12840, delivered: 12180, delayed: 284, returned: 62 },
  { date: 'Jun 10', shipments: 11820, delivered: 11240, delayed: 212, returned: 44 },
  { date: 'Jun 13', shipments: 13420, delivered: 12780, delayed: 268, returned: 58 },
  { date: 'Jun 16', shipments: 12680, delivered: 12040, delayed: 232, returned: 50 },
  { date: 'Jun 19', shipments: 14280, delivered: 13620, delayed: 298, returned: 64 },
  { date: 'Jun 22', shipments: 13840, delivered: 13280, delayed: 254, returned: 56 },
  { date: 'Jun 23', shipments: 12840, delivered: 12180, delayed: 284, returned: 62 },
];

/* ---- Warehouse Capacity ---- */
export type Warehouse = {
  id: string;
  name: string;
  capacity: number;
  status: 'healthy' | 'warning' | 'critical';
  inbound: number;
  outbound: number;
  pickQueue: number;
  staffLoad: number;
};

export const warehouses: Warehouse[] = [
  { id: 'w1', name: 'North Hub', capacity: 82, status: 'healthy', inbound: 420, outbound: 380, pickQueue: 24, staffLoad: 78 },
  { id: 'w2', name: 'South Hub', capacity: 64, status: 'healthy', inbound: 280, outbound: 320, pickQueue: 18, staffLoad: 62 },
  { id: 'w3', name: 'East Hub', capacity: 91, status: 'warning', inbound: 520, outbound: 440, pickQueue: 48, staffLoad: 88 },
  { id: 'w4', name: 'West Hub', capacity: 58, status: 'healthy', inbound: 240, outbound: 280, pickQueue: 12, staffLoad: 54 },
  { id: 'w5', name: 'Central Hub', capacity: 76, status: 'healthy', inbound: 380, outbound: 360, pickQueue: 28, staffLoad: 72 },
];

/* ---- Route Efficiency ---- */
export type Route = {
  id: string;
  name: string;
  onTimeRate: number;
  stops: number;
  status: 'on-time' | 'traffic' | 'weather' | 'efficient';
  delayReason?: string;
  miles: number;
  driver: string;
};

export const routes: Route[] = [
  { id: 'r1', name: 'Route A12', onTimeRate: 96, stops: 42, status: 'efficient', miles: 128, driver: 'Alex Chen' },
  { id: 'r2', name: 'Route B08', onTimeRate: 88, stops: 38, status: 'traffic', delayReason: 'Traffic delay on I-95', miles: 112, driver: 'Maria Lopez' },
  { id: 'r3', name: 'Route C19', onTimeRate: 97, stops: 31, status: 'on-time', miles: 94, driver: 'James Park' },
  { id: 'r4', name: 'Route D04', onTimeRate: 72, stops: 45, status: 'weather', delayReason: 'Weather risk — thunderstorm', miles: 156, driver: 'Sara Nguyen' },
];

/* ---- Exceptions Board ---- */
export type Exception = {
  id: string;
  type: string;
  count: number;
  severity: 'info' | 'warning' | 'critical';
  detail: string;
  action: string;
};

export const exceptions: Exception[] = [
  { id: 'e1', type: 'Address issue', count: 42, severity: 'warning', detail: 'Invalid or incomplete delivery addresses', action: 'Contact customers for address verification' },
  { id: 'e2', type: 'Weather delay', count: 18, severity: 'warning', detail: 'Severe weather affecting 3 routes', action: 'Reroute through alternative hubs' },
  { id: 'e3', type: 'Failed delivery', count: 31, severity: 'critical', detail: 'Customer unavailable or refused', action: 'Schedule redelivery or return to hub' },
  { id: 'e4', type: 'Customs hold', count: 9, severity: 'info', detail: 'International shipments awaiting clearance', action: 'Submit documentation to customs broker' },
  { id: 'e5', type: 'Damaged package', count: 12, severity: 'critical', detail: 'Packages damaged in transit', action: 'File claim and process replacement' },
];

/* ---- Carrier Performance ---- */
export type Carrier = {
  id: string;
  name: string;
  onTimeRate: number;
  costPerDelivery: number;
  avgDeliveryTime: string;
  damageRate: number;
  slaBreaches: number;
  color: string;
};

export const carriers: Carrier[] = [
  { id: 'c1', name: 'DHL', onTimeRate: 96.2, costPerDelivery: 8.40, avgDeliveryTime: '2h 12m', damageRate: 0.8, slaBreaches: 12, color: '#FFCC00' },
  { id: 'c2', name: 'FedEx', onTimeRate: 94.8, costPerDelivery: 9.20, avgDeliveryTime: '2h 28m', damageRate: 1.2, slaBreaches: 18, color: '#4D148C' },
  { id: 'c3', name: 'UPS', onTimeRate: 95.4, costPerDelivery: 8.80, avgDeliveryTime: '2h 18m', damageRate: 0.9, slaBreaches: 14, color: '#354A21' },
  { id: 'c4', name: 'USPS', onTimeRate: 91.2, costPerDelivery: 5.60, avgDeliveryTime: '3h 42m', damageRate: 1.8, slaBreaches: 38, color: '#333366' },
  { id: 'c5', name: 'Local Fleet', onTimeRate: 97.8, costPerDelivery: 6.40, avgDeliveryTime: '1h 48m', damageRate: 0.4, slaBreaches: 6, color: '#12B76A' },
];

/* ---- Shipments table ---- */
export type Shipment = {
  id: string;
  trackingId: string;
  customer: string;
  carrier: 'DHL' | 'FedEx' | 'UPS' | 'USPS' | 'Local Fleet';
  origin: string;
  destination: string;
  eta: string;
  sla: 'On-time' | 'At-risk' | 'Delayed';
  status: 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Delayed' | 'Returned';
  driver: string;
};

export const shipments: Shipment[] = [
  { id: 's1', trackingId: '#28745-72809BJK', customer: 'Acme Studio', carrier: 'DHL', origin: 'New York, NY', destination: 'Boston, MA', eta: 'Today 4:35 PM', sla: 'On-time', status: 'In Transit', driver: 'Alex Chen' },
  { id: 's2', trackingId: '#28746-83920KLM', customer: 'Northstar AI', carrier: 'FedEx', origin: 'Los Angeles, CA', destination: 'San Diego, CA', eta: 'Today 5:15 PM', sla: 'On-time', status: 'Out for Delivery', driver: 'Maria Lopez' },
  { id: 's3', trackingId: '#28747-90182NPR', customer: 'OrbitLabs', carrier: 'UPS', origin: 'London, UK', destination: 'Manchester, UK', eta: 'Today 3:45 PM', sla: 'At-risk', status: 'In Transit', driver: 'James Park' },
  { id: 's4', trackingId: '#28748-10293QRS', customer: 'FlowDesk', carrier: 'DHL', origin: 'Berlin, DE', destination: 'Munich, DE', eta: 'Tomorrow 10:00 AM', sla: 'Delayed', status: 'Delayed', driver: 'Sara Nguyen' },
  { id: 's5', trackingId: '#28749-30415TUV', customer: 'BrightCart', carrier: 'Local Fleet', origin: 'Tokyo, JP', destination: 'Yokohama, JP', eta: 'Today 6:00 PM', sla: 'On-time', status: 'Out for Delivery', driver: 'Devon Lane' },
  { id: 's6', trackingId: '#28750-50628WXY', customer: 'AtlasCloud', carrier: 'FedEx', origin: 'Sydney, AU', destination: 'Melbourne, AU', eta: 'Today 2:30 PM', sla: 'On-time', status: 'Delivered', driver: 'Jane Cooper' },
  { id: 's7', trackingId: '#28751-70839ZAB', customer: 'CloudMint', carrier: 'UPS', origin: 'Chicago, IL', destination: 'Detroit, MI', eta: 'Today 5:45 PM', sla: 'At-risk', status: 'In Transit', driver: 'Albert Flores' },
  { id: 's8', trackingId: '#28752-91042CDE', customer: 'NovaRetail', carrier: 'USPS', origin: 'Miami, FL', destination: 'Orlando, FL', eta: 'Delayed +4h', sla: 'Delayed', status: 'Delayed', driver: 'Kristin Watson' },
  { id: 's9', trackingId: '#28753-11253FGH', customer: 'AlphaWorks', carrier: 'DHL', origin: 'Toronto, CA', destination: 'Montreal, CA', eta: 'Today 7:00 PM', sla: 'On-time', status: 'In Transit', driver: 'Martin K.' },
  { id: 's10', trackingId: '#28754-31464IJK', customer: 'ZenithCorp', carrier: 'Local Fleet', origin: 'Paris, FR', destination: 'Lyon, FR', eta: 'Tomorrow 11:30 AM', sla: 'On-time', status: 'In Transit', driver: 'Sara N.' },
];

/* ---- Date presets ---- */
export const LOGISTICS_DATE_PRESETS = [
  { key: 'today', label: 'Today', range: 'Jun 23, 2026' },
  { key: '7d', label: 'Last 7 days', range: 'Jun 17 – Jun 23, 2026' },
  { key: '30d', label: 'Last 30 days', range: 'May 24 – Jun 23, 2026' },
];

export const REGIONS = ['All regions', 'North America', 'Europe', 'Asia Pacific', 'Australia'];
export const CARRIER_FILTERS = ['All carriers', 'DHL', 'FedEx', 'UPS', 'USPS', 'Local Fleet'];
