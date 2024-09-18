import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CurrentUserProvider } from '../src/contexts/CurrentUserContext';

const renderWithProviders = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);

    return render(ui, {
    wrapper: ({ children }) => (
    <BrowserRouter>
        <CurrentUserProvider>{children}</CurrentUserProvider>
    </BrowserRouter>
    ),
});
};

export default renderWithProviders;