import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { DropDownOptions } from '../components/DropDownOptions'

test('Render content', () => {
    const angular = `Angular`
    const react = `React`
    const vue = `VueJs`

    const component = render(<DropDownOptions />)

    component.getByText(angular)
    component.getByText(react)
    component.getByText(vue)
})