import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { NewsOptions } from '../components/NewsOptions'

test('Render content', () => {
    const all = `All`
    const faves = `My faves`

    const component = render(<NewsOptions />)

    component.getByText(all)
    component.getByText(faves)
})