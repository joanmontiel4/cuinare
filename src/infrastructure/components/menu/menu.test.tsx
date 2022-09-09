import { Menu } from './menu';
import { render, screen } from '@testing-library/react';
import { iMenuOptions } from '../../interfaces/imenu-options';
import { MemoryRouter, Routes } from 'react-router-dom';

describe('Given the component Menu', () => {
    describe('When it is rendered', () => {
        test('The word Home should appear', () => {
            //arrange
            const menuOptionsMock: Array<iMenuOptions> = [
                {
                    path: './test.html',
                    label: 'Test-home',
                },
            ];
            //act
            render(
                <MemoryRouter>
                    <Menu menuOptions={menuOptionsMock}></Menu>
                    <Routes></Routes>
                </MemoryRouter>
            );
            //assert
            const element = screen.getByText('Test-home');
            expect(element).toBeInTheDocument();
        });
    });
});
