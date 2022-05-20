import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Search from '.'
import '@testing-library/jest-dom/extend-expect'

describe('Input value', () => {
    it('updates on change', () => {
      
      const { queryByPlaceholderText } = render(<Search/>)
  
      const searchInput = (queryByPlaceholderText('Search')) as HTMLInputElement
  
      fireEvent.change(searchInput as any , { target: { value: 'test' } })
  
      expect(searchInput?.value as any ).toBe('test')
    })
  })