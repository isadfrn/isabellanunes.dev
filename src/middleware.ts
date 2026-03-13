import { defineMiddleware } from 'astro:middleware';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  if (!pathname.startsWith('/admin')) {
    return next();
  }

  if (pathname === '/admin/login') {
    return next();
  }

  const token = context.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return context.redirect('/admin/login');
  }

  const payload = await verifyToken(token);

  if (!payload) {
    context.cookies.delete(COOKIE_NAME, { path: '/' });
    return context.redirect('/admin/login');
  }

  return next();
});
