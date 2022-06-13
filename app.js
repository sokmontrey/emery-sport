class Home extends Component{
    constructor(){super()}
    loadState(){
        const button = `<button event='updateA' on='click'>ButtonClick</button>`
        this.setVar({
            test: button,
            a: 1
        })
        this.setEvent({
            updateA: ()=>{
                this.setVar({
                    a: this.var.a + 1
                })
            }
        });
    }
}
class App{
    constructor(){
        const pageManager = new PageManager();
        pageManager.setPage({
            home: new Home()
        })
        pageManager.render();
    }
}

const app = new App();
