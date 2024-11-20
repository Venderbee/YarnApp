addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const { pathname } = url

  if (pathname === '/') {
    const response = await fetch('https://venderbee.github.io/YarnApp/public/index.html')
    const html = await response.text()
    return new Response(html, {
      headers: { 'Content-Type': 'text/html' }
    })
  } else if (pathname.startsWith('/public/')) {
    // Serve static assets from the public directory
    const response = await fetch(`https://venderbee.github.io/YarnApp${pathname}`)
    if (!response.ok) {
      return new Response('Not found', { status: 404 })
    }
    const contentType = getContentType(pathname)
    const asset = await response.text()
    return new Response(asset, {
      headers: { 'Content-Type': contentType }
    })
  } else if (pathname === '/save') {
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
  } else if (pathname === '/save-project') {
    if (request.method === 'POST') {
      const data = await request.json()
      const existingData = await PROJECT_DATA.get(data.userId)
      const projectData = existingData ? JSON.parse(existingData) : []
      projectData.push(data.projectData)
      await PROJECT_DATA.put(data.userId, JSON.stringify(projectData))
      return new Response('Project saved', { status: 200 })
    }
  } else if (pathname === '/load-projects') {
    if (request.method === 'GET') {
      const userId = url.searchParams.get('userId')
      const projectData = await PROJECT_DATA.get(userId)
      return new Response(projectData, { status: 200 })
    }
  }

  return new Response('Not found', { status: 404 })
}

function getContentType(pathname) {
  if (pathname.endsWith('.html')) {
    return 'text/html'
  } else if (pathname.endsWith('.css')) {
    return 'text/css'
  } else if (pathname.endsWith('.js')) {
    return 'application/javascript'
  } else if (pathname.endsWith('.png')) {
    return 'image/png'
  } else if (pathname.endsWith('.jpg') || pathname.endsWith('.jpeg')) {
    return 'image/jpeg'
  } else if (pathname.endsWith('.gif')) {
    return 'image/gif'
  } else {
    return 'application/octet-stream'
  }
}