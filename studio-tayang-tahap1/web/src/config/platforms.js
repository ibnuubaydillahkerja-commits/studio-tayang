// Target & slot posting per platform (WIB). Sumber: panduan agent bagian 2.
// Nanti (tahap Supabase) dipindah ke database supaya bisa diubah dari website.
export const PLATFORMS = {
  youtube:   { label: 'YouTube',   short: 'YT', target: 4, slots: ['10:00', '13:00', '16:00', '18:00'] },
  tiktok:    { label: 'TikTok',    short: 'TT', target: 4, slots: ['10:00', '12:00', '17:00', '19:00'] },
  instagram: { label: 'Instagram', short: 'IG', target: 4, slots: ['10:00', '12:00', '17:00', '19:00'] },
  facebook:  { label: 'Facebook',  short: 'FB', target: 4, slots: ['10:00', '12:00', '17:00', '19:00'] },
};

export const PLATFORM_KEYS = Object.keys(PLATFORMS);
