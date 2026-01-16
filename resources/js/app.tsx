import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';

createInertiaApp({
    resolve: name => require(`./Pages/${name}`).default,
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
