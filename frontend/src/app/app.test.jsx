import { act, fireEvent, render, screen } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux'
import { App } from './App'
import store from './redux/store'
import { setUsersError, setUsersLoading } from '../feature/users/redux/userSlice'

describe('App render tests', () => {
  let renderResult
  let history

  const rerender = () => {
    renderResult?.unmount()
    renderResult = render(
      <Router location={history.location} navigator={history}>
        <Provider store={store}>
          <App/>
        </Provider>
      </Router>,
    )
  }

  const redirect = path => {
    act(() => {
      history.push(path)
      rerender()
    })
  }

  const dispatch = async action => {
    await act(async () => {
      await store.dispatch(action)
      rerender()
    })
  }

  beforeEach(() => {
    history = createMemoryHistory()
    act(() => {
      rerender()
    })
  })

  afterEach(() => {
    renderResult.unmount()
  })

  describe('Home page', () => {
    it('should renders by default', () => {
      expect(screen.getByText(/Home page/i)).toBeInTheDocument()
      expect(history.location.pathname).eq('/')
    })

    describe('Link to users page', () => {
      it('should exist', () => {
        expect(screen.getByText(/users/i)).toBeInTheDocument()
      })

      it('should works', () => {
        act(() => {
          fireEvent.click(screen.getByText(/users/i))
        })
        expect(history.location.pathname).eq('/users')
      })
    })
  })

  describe('404 page', () => {

    beforeEach(() => {
      redirect(`/${Math.random()}`)
    })

    it('should be displayed on an unpredictable route', () => {
      expect(screen.getByText(/404/i)).toBeInTheDocument()
    })

    describe('link to home page', () => {
      it('should exist', () => {
        expect(screen.getByText(/Home page/i)).toBeInTheDocument()
      })

      it('should works', () => {
        act(() => {
          fireEvent.click(screen.getByText(/Home page/i))
        })
        expect(history.location.pathname).eq('/')
      })
    })

  })

  describe('Users page', () => {
    beforeEach(() => {
      redirect(`/users`)
    })

    it('should display heading by default', () => {
      expect(screen.getByText(/Users/i)).toBeInTheDocument()
    })

    it('should display error message', async () => {
      const message = 'test error message'
      await dispatch(setUsersError(message))
      expect(screen.getByText(new RegExp(message, 'i'))).toBeInTheDocument()
    })

    it('should display loading state', async () => {
      await dispatch(setUsersLoading(true))
      expect(screen.getByText(/loading/i)).toBeInTheDocument()
    })

  })

})
