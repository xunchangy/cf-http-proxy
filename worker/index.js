addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const target = url.searchParams.get('url')

  if (!target) {
    return new Response('Missing url parameter', { status: 400 })
  }

  try {
    const response = await fetch(target, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    })

    return new Response(response.body, {
      status: response.status,
      headers: response.headers,
    })
  } catch (err) {
    return new Response('Fetch error: ' + err.message, { status: 502 })
  }
}
