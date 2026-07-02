/**
 * Centralized Unsplash HD avatar/image utility.
 *
 * Uses deterministic Unsplash photo IDs (via images.unsplash.com) so the same
 * person always renders the same photo across the app. Photos are square-cropped
 * via URL params (w=, h=, fit=crop, crop=faces) so they look good in circular
 * avatars at any size.
 */

/** Build an Unsplash image URL from a photo ID. */
export function unsplashImage(
  photoId: string,
  opts: { w?: number; h?: number; quality?: number; crop?: string } = {}
): string {
  const { w = 200, h = 200, quality = 80, crop = 'faces' } = opts;
  return `https://images.unsplash.com/photo-${photoId}?w=${w}&h=${h}&q=${quality}&fit=crop&crop=${crop}&auto=format`;
}

/** Curated HD portrait photo IDs (Unsplash) — one per sales rep. */
export const REP_AVATARS: Record<string, string> = {
  r1: '1494790108377-be9c29b29330', // Sarah Chen — woman, professional
  r2: '1507003211169-0a1dd7228f2d', // Mike Johnson — man, casual pro
  r3: '1438761681033-6461ffad8d80', // Emily Davis — woman, blonde
  r4: '1500648767791-00dcc994a43e', // James Wilson — man, dark hair
  r5: '1573497019940-1c28c88b4f3e', // Lisa Park — woman, asian
  r6: '1506794778202-cad84cf45f1d', // David Okafor — man, glasses
  r7: '1531123897727-8f129e1688ce', // Priya Sharma — woman, indian
  r8: '1507591064344-4c6ce005b128', // Marcus Bell — man, beard
};

/** Get avatar URL for a rep by id. */
export function repAvatarUrl(repId: string, size = 200): string {
  const photoId = REP_AVATARS[repId] || '1494790108377-be9c29b29330';
  return unsplashImage(photoId, { w: size, h: size });
}

/** Curated HD portrait photo IDs for contacts (keyed by contact id). */
export const CONTACT_AVATARS: Record<string, string> = {
  c1: '1472099645785-5658abf4ff4e', // John Smith — man
  c2: '1487412720507-e7ab37603c6f', // Lisa Wong — woman
  c3: '1500648767791-00dcc994a43e', // Robert Davis
  c4: '1519085360753-af0119f7cbe7', // Alex Rivera
  c5: '1438761681033-6461ffad8d80', // Maya Patel
  c6: '1506794778202-cad84cf45f1d', // Michael Chen
  c7: '1488426862026-3ee34a7d66df', // Jennifer Park
  c8: '1502685104226-ee32379fefbe', // Emma Wilson
};

/** Get avatar URL for a contact by id. */
export function contactAvatarUrl(contactId: string, size = 200): string {
  const photoId = CONTACT_AVATARS[contactId] || '1494790108377-be9c29b29330';
  return unsplashImage(photoId, { w: size, h: size });
}

/** Account logo backgrounds — abstract product/office shots. */
export const ACCOUNT_LOGOS: Record<string, string> = {
  a1: '1486406146926-c627a92ad1ab', // Acme — modern building
  a2: '1486325212027-8081e485255e', // GlobalTech — factory
  a3: '1519494026892-80bbd2d6fd0d', // Innovate Labs — lab
  a4: '1551288049-bebda4e38f71', // DataStream — analytics screen
  a5: '1565514020179-026b92b84bb6', // NextGen — finance
  a6: '1451187580459-43490279c0fa', // CloudFirst — cloud
  a7: '1565008447742-97f6f38c985c', // Vertex Robotics — robot
  a8: '1492619375914-88005aa9e8fb', // BrightWave Media — media
  a9: '1586528116311-ad8dd3c8310d', // Quantum Logistics — warehouse
  a10: '1576091160550-2173dba999ef', // Pulse Health — healthcare
  a11: '1497366216548-37526070297c', // Skyline Capital — office
  a12: '1581091226825-a6a2a5aee158', // Forge & Co — workshop
};

/** Get a logo/cover image URL for an account. */
export function accountLogoUrl(accountId: string, size = 200): string {
  const photoId = ACCOUNT_LOGOS[accountId] || '1486406146926-c627a92ad1ab';
  return unsplashImage(photoId, { w: size, h: size, crop: 'center' });
}

/** Generic person avatar (for users not in the rep roster). */
export function personAvatarUrl(seed: string, size = 200): string {
  // Hash the seed to a stable photo ID
  const pool = [
    '1494790108377-be9c29b29330',
    '1507003211169-0a1dd7228f2d',
    '1438761681033-6461ffad8d80',
    '1500648767791-00dcc994a43e',
    '1573497019940-1c28c88b4f3e',
    '1506794778202-cad84cf45f1d',
    '1531123897727-8f129e1688ce',
    '1507591064344-4c6ce005b128',
    '1472099645785-5658abf4ff4e',
    '1487412720507-e7ab37603c6f',
    '1519085360753-af0119f7cbe7',
    '1488426862026-3ee34a7d66df',
  ];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  const photoId = pool[Math.abs(hash) % pool.length];
  return unsplashImage(photoId, { w: size, h: size });
}

/** Hero/cover image for welcome banners and profile headers. */
export function coverImageUrl(variant: 'dashboard' | 'profile' | 'team' = 'dashboard'): string {
  const covers: Record<string, string> = {
    dashboard: '1551288049-bebda4e38f71',
    profile: '1517245386807-bb43f82c33c4',
    team: '1522071820081-009f0129c71c',
  };
  return `https://images.unsplash.com/photo-${covers[variant]}?w=1200&h=400&q=80&fit=crop&auto=format`;
}
