/**
 * Simple wrapper for @vercel/kv
 * Note: @vercel/kv needs VERCEL_KV_URL env in Vercel.
 */
import { KV } from '@vercel/kv';

const kv = new KV({ url: process.env.VERCEL_KV_URL });
export default kv;