import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { Header } from '../components/Header.js'

test('Render content', () => {
    const title = `HACKER NEWS`

    const component = render(<Header />)

    component.getByText(title)
})