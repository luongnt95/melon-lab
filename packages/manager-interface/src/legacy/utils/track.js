import { tracks } from '@melonproject/melon.js';

export const track = global.TRACK || process.env.TRACK || 'kovan-demo';
export const isCompetition = track === tracks.KOVAN_COMPETITION || track === tracks.LIVE;
