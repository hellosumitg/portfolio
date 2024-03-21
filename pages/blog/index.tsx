import { GetStaticProps } from 'next'
import Head from 'next/head'
import {
  PageViewer,
  cleanPage,
  fetchPage,
  fetchPages,
  fetchTags,
  types,
  useReactBricksContext,
} from 'react-bricks/frontend'

import PostListItem from '../../components/PostListItem'
import TagListItem from '../../components/TagListItem'
import ErrorNoKeys from '../../components/errorNoKeys'
import Layout from '../../components/layout'
import config from '../../react-bricks/config'

interface HomeProps {
  errorNoKeys: string
  tags: string[]
  posts: types.Page[]
}

const BlogList: React.FC<HomeProps> = ({
  tags,
  posts,
  errorNoKeys,
}) => {
  const { pageTypes, bricks } = useReactBricksContext()
  
  return (
    <Layout>
      {!errorNoKeys && (
        <>
          <Head>
            <title>Post List</title>
            <meta name="description" content="React Bricks blog starter" />
          </Head>
          <div className="bg-white dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-8 py-16">
              <h1 className="max-w-2xl text-4xl sm:text-6xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white pb-4 mt-10 sm:mt-12 mb-4">
                Our latest articles
              </h1>

              <div className="flex flex-wrap items-center">
                {tags?.map((tag) => (
                  <TagListItem tag={tag} key={tag} />
                ))}
              </div>

              <hr className="mt-6 mb-10 dark:border-gray-600" />

              <div className="grid lg:grid-cols-2 xl:grid-cols-3 sm:gap-12">
                {posts?.map((post) => {
                  return (
                    <PostListItem
                      key={post.id}
                      title={post.meta.title}
                      href={post.slug}
                      content={post.meta.description}
                      author={post.author}
                      date={post.publishedAt}
                      featuredImg={post.meta.image}
                    />
                  )
                })}
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

  if (!config.apiKey) {
    errorNoKeys = true
    return { props: { errorNoKeys } }
  }
  try {
    const { items: tags } = await fetchTags(process.env.API_KEY)
    tags.sort()

    const posts = await fetchPages(process.env.API_KEY, {
      type: 'blog',
      pageSize: 1000,
      sort: '-publishedAt',
    })

  } catch {
    return { props: {} }
  }
}

export default BlogList
