import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import {
  PageViewer,
  cleanPage,
  fetchPage,
  fetchPages,
  fetchTags,
  types,
  useReactBricksContext,
} from 'react-bricks/frontend'

import PostListItem from '../../../components/PostListItem'
import TagListItem from '../../../components/TagListItem'
import ErrorNoKeys from '../../../components/errorNoKeys'
import Layout from '../../../components/layout'
import config from '../../../react-bricks/config'

interface PageProps {
  pagesByTag: types.Page[]
  popularPosts: types.Page[]
  errorNoKeys: string
  filterTag: string
  allTags: string[]
}

const Page: React.FC<PageProps> = ({
  filterTag,
  pagesByTag,
  allTags,
  errorNoKeys,
}) => {
  const { pageTypes, bricks } = useReactBricksContext()
  return (
    <Layout>
      {!errorNoKeys && (
        <>
          <Head>
            <title>{filterTag}</title>
            <meta name="description" content={filterTag} />
          </Head>

          <div className="bg-white dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-8 py-16">
              <div className="flex items-center justify-between  text-gray-900 dark:text-white pb-4 mt-10 sm:mt-12 mb-4">
                <h1 className="max-w-2xl text-4xl sm:text-6xl lg:text-4xl font-bold tracking-tight">
                  {filterTag} articles
                </h1>

                <Link
                  href="/blog"
                  className="hover:-translate-x-2 transition-transform duration-300"
                >
                  &laquo; Return to blog
                </Link>
              </div>

              <div className="flex flex-wrap items-center">
                {allTags?.map((tag) => (
                  <TagListItem tag={tag} key={tag} />
                ))}
              </div>

              <hr className="mt-6 mb-10 dark:border-gray-600" />

              <div className="grid lg:grid-cols-2 xl:grid-cols-3 sm:gap-12">
                {pagesByTag?.map((post) => (
                  <PostListItem
                    key={post.id}
                    title={post.meta.title}
                    href={post.slug}
                    content={post.meta.description}
                    author={post.author}
                    date={post.publishedAt}
                    featuredImg={post.meta.image}
                  />
                ))}
              </div>
            </div>
          </div>
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
    return { props: { error: 'NOKEYS' } }
  }

  const { tag } = context.params

  try {
    const [pagesByTag, tagsResult] = await Promise.all([
      fetchPages(config.apiKey, {
        tag: tag.toString(),
        type: 'blog',
        pageSize: 100,
        sort: '-publishedAt',
      }),
      fetchTags(process.env.API_KEY),
      
    ])

    return {
      props: {
        pagesByTag,
        filterTag: tag,
        allTags: tagsResult.items.sort(),
        errorNoKeys,
        errorPage,
     
      },
    }
  } catch {
    return { props: {} }
  }
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  if (!config.apiKey) {
    return { paths: [], fallback: false }
  }

  const { items: tags } = await fetchTags(process.env.API_KEY)

  const paths = tags.map((tag) => `/blog/tag/${tag}`)

  return { paths, fallback: false }
}

export default Page
