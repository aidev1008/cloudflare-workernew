export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    const hostingerPaths = [
      '/',
      '/marketplace',
      '/poof-hq',
      '/brand-hq',
      '/campaign-builder',
      '/integrations',
    ];

    const isHostingerPath =
      hostingerPaths.includes(path) ||
      hostingerPaths.some(p => p !== '/' && path.startsWith(p + '/'));

    if (url.hostname === 'business.poof.ca' && isHostingerPath) {
      url.hostname = 'grey-gnat-956017.hostingersite.com';
      return fetch(url.toString(), request);
    }

    // default → Webflow
    url.hostname = 'cdn.webflow.com';
    return fetch(url.toString(), request);
  }
};