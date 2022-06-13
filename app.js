const pr = new PostReader(posts);

class View extends Component{

}
class Photo extends Component{

}
class Category extends Component{

}
class Topbar extends Component{ 
    constructor(){super();}
}
class App{
    constructor(){
        const pageManager = new PageManager();
        pageManager.setPage({
            home: new Home(),
            view: new View(),
            photo: new Photo(),
            category: new Category()
        })
        pageManager.setComponent({
            topbar: new Topbar(),
        });
        pageManager.render();
    }
}

const app = new App();
