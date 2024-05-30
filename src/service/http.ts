import qs from 'qs'
import { useCallback } from 'react'

// const apiUrl = process.env.REACT_APP_API_URL
const apiUrl = '/api'

interface Config extends RequestInit {
  params?: object
  token?: string
}

export const http = async (endpoint: string, { params, token, ...customConfig }: Config = {}) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': params ? 'application/json' : ''
    },
    ...customConfig
  }

  if (config.method.toUpperCase() === 'GET') endpoint += `?${qs.stringify(params)}`
  else config.body = JSON.stringify(params || {})

  return window.fetch(`${apiUrl}${endpoint}`, config).then(async response => {
    if (!response.ok) return Promise.reject('Network Error!')
    const text = await response.text()
    if (text) return JSON.parse(text)
    else return {}
    // const data = await response.json()
    // if (response.ok) return data
    // else return Promise.reject(data)
  })
}

export const useHttp = () => {
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config }),
    []
  )
}
