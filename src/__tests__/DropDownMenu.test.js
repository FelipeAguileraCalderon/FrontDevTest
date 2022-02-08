import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { DropDownMenu } from '../components/DropDownMenu'

test('Render content', () => {
    const text = `Select your news`

    const component = render(<DropDownMenu />)

    component.getByText(text)
})