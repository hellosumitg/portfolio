import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import {
  PageViewer,
  cleanPage,
  fetchPage,
  fetchPages,
  types,
  useReactBricksContext,
  renderJsonLd,
  renderMeta,
} from 'react-bricks/frontend'

import ErrorNoKeys from '../components/errorNoKeys'
import Layout from '../components/layout'
import config from '../react-bricks/config'

interface PageProps {
  page: types.Page
  errorNoKeys: boolean
  errorPage: boolean
}

const Page: React.FC<PageProps> = ({
  page,
  errorNoKeys,
  errorPage,
}) => {
  // Clean the received content
  // Removes unknown or not allowed bricks
  const { pageTypes, bricks } = useReactBricksContext()
  const pageOk = page ? cleanPage(page, pageTypes, bricks) : null

  return (
    <Layout>
      {pageOk && !errorPage && !errorNoKeys && (
        <>
          <Head>
            {renderMeta(pageOk)}
            {renderJsonLd(pageOk)}
          </Head>
          
          <PageViewer page={pageOk} main />
        </>
      )}
      {errorNoKeys && <ErrorNoKeys />}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  let errorNoKeys: boolean = false
  let errorPage: boolean = false

  if (!config.apiKey) {
    errorNoKeys = true
    return { props: { errorNoKeys } }
  }

  const { slug } = context.params

  let cleanSlug = ''

  if (!slug) {
    cleanSlug = '/'
  } else if (typeof slug === 'string') {
    cleanSlug = slug
  } else {
    cleanSlug = slug.join('/')
  }

  const [page] = await Promise.all([
    fetchPage(cleanSlug, config.apiKey, context.locale, config.pageTypes)
      .then(({ author, ...page }) => page)
      .catch(() => {
        errorPage = true
        return {}
      }),
  ])

  return {
    props: {
      page,
      errorNoKeys,
      errorPage,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  if (!config.apiKey) {
    return { paths: [], fallback: true }
  }

  const allPages = await fetchPages(config.apiKey, {
    types: ['page', 'pokemon'],
  })

  const paths = allPages
    .map((page) =>
      page.translations
        .filter(
          (translation) => context.locales.indexOf(translation.language) > -1
        )
        .map((translation) => ({
          params: {
            slug: [...translation.slug.split('/')],
          },
          locale: translation.language,
        }))
    )
    .flat()

  return { paths, fallback: false }
}

export default Page
