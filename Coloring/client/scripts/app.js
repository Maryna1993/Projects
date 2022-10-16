import '../styles/app';

import {parseCurrentURL} from './helpers/utils';

import Header from './views/partials/header';
import Footer from './views/partials/footer';

import SelectImages from './views/pages/images/select-images';
import Coloring from './views/pages/images/coloring';

import About from './views/pages/about';
import Error404 from './views/pages/error404';

const Routes = {
    '/': About,
    '/images': SelectImages,
    '/image/:id': Coloring
};

function router() {
    (async() => {
    const headerContainer = document.getElementsByClassName('header-container')[0],
        contentContainer = document.getElementsByClassName('content-container')[0];

    const urlParts = parseCurrentURL(),
        pagePath = `/${urlParts.page || ''}${urlParts.id ? '/:id' : ''}`,
        Page = Routes[pagePath] ? Routes[pagePath] : Error404;

    headerContainer.innerHTML = await Header.render();

    const pageData = await Page.getData();
    contentContainer.innerHTML = await Page.render(pageData);
    Page.afterRender();
    })();
}

(async() => {
    const footerContainer = document.getElementsByClassName('footer-container')[0];

    footerContainer.innerHTML = await Footer.render();
})();

module.hot ? module.hot.accept(router()) : (window.onload = router);
window.onhashchange = router;