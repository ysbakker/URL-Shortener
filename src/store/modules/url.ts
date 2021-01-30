/* eslint-disable @typescript-eslint/no-explicit-any */
import { Module } from 'vuex'
import { Slug } from '../../../common/types'

export interface UrlState {
  slug: string
  url: string
  https: boolean
  fetching: boolean
  error?: string
}

export const url: Module<UrlState, any> = {
  namespaced: true,
  state: {
    slug: '',
    url: '',
    https: true,
    fetching: false,
    error: undefined,
  },
  getters: {
    isFetching: (state: UrlState) => state.fetching,
  },
  mutations: {
    setFetching(state: UrlState, payload: boolean) {
      state.fetching = payload
    },
    setUrl(state: UrlState, payload: { url: string; https: boolean }) {
      state = { ...state, url: payload.url, https: payload.https }
    },
    setSlug(state: UrlState, payload: string) {
      state.slug = payload
    },
    setError(state: UrlState, payload?: string) {
      state.error = payload
    },
  },
  actions: {
    async createSlug({ commit }, payload: { url: string; https: boolean }) {
      const { url, https } = payload
      const fullUrl = `http${https == true ? 's' : ''}://${url}`
      const request = fetch(`${process.env.VUE_APP_API_URL}/slugs/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: fullUrl }),
      })
      commit('setFetching', true)
      commit('setUrl', { url, https })

      try {
        const response = await request
        const data = await response.json()
        if (!response.ok) throw new Error(data.error)
        commit('setSlug', (data as Slug).slug)
      } catch (e) {
        console.error(e)
        commit('setError', e.message)
      }

      commit('setFetching', false)
    },
  },
}
