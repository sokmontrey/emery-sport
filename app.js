
class App{
    _state = {
        page: 'home'
    };
    _current_page = new Home();

    constructor(){
    }

    renderApp(){
        let pageCreator = new PageCreator();
        let page = pageCreator.createPage('home');

        page.renderPage();
    }
}

class PageCreator{
    createPage({page}){
        if(page === 'home') return new HomePage();
        if(page === 'photo') return new PhotoPage();

        let splited = page.split('/');
        page = splited[0];
        if(page === 'view') return new ViewPage(splited[1]);
        if(page === 'category') return new PhotoPage(splited[1]);
    }
}
class Page{
}

class HomePage extends Page{}
class PhotoPage extends Page{}

class ViewPage{}
class CategoryPage{}