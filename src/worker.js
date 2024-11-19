addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const { pathname } = url

  if (pathname === '/save') {
    if (request.method === 'POST') {
      const data = await request.json()
      const existingData = await YARN_DATA.get(data.userId)
      const yarnData = existingData ? JSON.parse(existingData) : []
      yarnData.push(data.yarnData)
      await YARN_DATA.put(data.userId, JSON.stringify(yarnData))
      return new Response('Data saved', { status: 200 })
    }
  } else if (pathname === '/load') {
    if (request.method === 'GET') {
      const userId = url.searchParams.get('userId')
      const yarnData = await YARN_DATA.get(userId)
      return new Response(yarnData, { status: 200 })
    }
  }

  return new Response('Not found', { status: 404 })
}