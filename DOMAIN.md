# Custom domain setup (GitHub Pages)

To use **jaykaneriya.com** (or your preferred domain):

1. Buy the domain at your registrar (Namecheap, Cloudflare, Google Domains, etc.).
2. In GitHub → repo **Settings → Pages → Custom domain**, enter `jaykaneriya.com`.
3. At the registrar, add DNS records:

| Type  | Name | Value                          |
|-------|------|--------------------------------|
| A     | @    | 185.199.108.153                |
| A     | @    | 185.199.109.153                |
| A     | @    | 185.199.110.153                |
| A     | @    | 185.199.111.153                |
| CNAME | www  | jaykaneriya.github.io          |

4. Enable **Enforce HTTPS** after DNS propagates (can take up to 24h).

This repo already includes a `CNAME` file set to `jaykaneriya.com`. Change that file if you use a different domain.
