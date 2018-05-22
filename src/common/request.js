import querystring from 'querystring'

async function request(path, options) {
  const response = await fetch(path, options)
  if (response.status === 404 || response.status === 200) {
    return response.json()
  } else {
    return {}
  }
}

export async function post(path, data) {
  return request(path, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function get(path, data) {
  return request(path + '?' + querystring.stringify(data), {})
}

export async function cors(method, endpoint, data) {
  const form = document.createElement('form')
  form.setAttribute('method', method)
  form.setAttribute('action', endpoint)

  for (const p in data) {
    const input = document.createElement('input')
    input.setAttribute('type', 'hidden')
    input.setAttribute('name', p)
    input.setAttribute('value', data[p])
    form.appendChild(input)
  }

  document.body.appendChild(form)
  form.submit()
}
