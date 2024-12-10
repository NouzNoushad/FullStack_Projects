export const getBlogPostsAction = () => {

    const getBlogPosts = async () => {
        const url = 'https://jsonplaceholder.typicode.com/posts?_limit=10'
        const response = await fetch(url, { cache: 'no-store' })
        const posts = await response.json()
        return posts
    }
   return {
    getBlogPosts,
   }
}