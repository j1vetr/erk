import { Helmet } from "react-helmet-async"

interface SEOProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  noIndex?: boolean
}

const SITE_NAME = "Erk Forge Coaching"
const DEFAULT_OG_IMAGE = "/images/logo.png"
const BASE_URL = "https://erkforgecoaching.com"

export function SEO({ title, description, canonical, ogImage, noIndex }: SEOProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
  const ogImg = ogImage ?? DEFAULT_OG_IMAGE
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={ogImg} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImg} />

      {/* Ek */}
      <meta name="author" content="Erk Forge Coaching" />
      <meta name="language" content="tr" />
    </Helmet>
  )
}
