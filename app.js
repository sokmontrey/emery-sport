class DOM{
    getID(id){ return document.getElementById(id); }
    getClass(class_name){return document.getElementsByClassName(class_name);}
    getTagName(tag_name){return document.getElementsByTagName(tag_name);}
}
const dom = new DOM();

class RouteManager{
    _page = {};
    _route = '';

    constructor(page_objects, initial_page){
        this._page = page_objects;
        this.changeRouteTo(initial_page);
    }
    addPage(name, object){
        this._page[name] = object;
    }
    setPage(pages){
        this._page = pages;
    }

    _hideAllRouteDOM(){
        const all_route = dom.getTagName('Route');
        for(let route of all_route) {
            route.style.visibility = 'hidden';
            route.style.display = 'none';
        }
    }
    _load(){
        this._page[this._route].render();
    }
    _render(){
        this._hideAllRouteDOM();

        const rendering_route = dom.getID(this._route);
        rendering_route.style.visibility = 'visible';
        rendering_route.style.display = 'block';
    }
    changeRouteTo(new_route){
        this._route = new_route;
        this._load();
        this._render();
    }
}

class Page{
    _updateVariable(){
        for(let v_name in this.state){
            const classes = dom.getClass(v_name);
            for(let one of classes) one.innerHTML = this.state[v_name];
        }
    }
    _updateEvent(){
        for(let e_name in this.event){
            const classes = dom.getClass(e_name);

            for(let one of classes){
                const names = one.name.split(' ');
                let event_type = 'click';
                names.length >= 1 ? names.forEach(name => {
                    if(name.length>=1 && name[0] === '$') 
                        event_type = name.split('$')[1];
                }) : null;
                one.addEventListener(event_type, this.event[e_name]);
            }
        }
    }
    setState(new_state){
        for(let name in new_state){
            this.state[name] = new_state[name];
        }
        this._updateVariable();
    }
    setEvent(new_event){
        for(let name in new_event){
            this.event[name] = new_event[name];
        }
        this._updateEvent();
    }
    render(){}
}

class Home extends Page{
    state = {}
    event = {}

    constructor(){ super(); }

    render(){
        this.setState({
            $a: 2
        });

        this.setEvent({
            $$updateState:()=>{
                this.setState({ $a: this.state.$a+1 });
            }
        });
    }
}
class View extends Page{
    constructor(){super();}
    render(){}
}

class App{
    constructor(){
        const routeManager = new RouteManager({
            'home': new Home(),
            'view': new View(),
        }, 'home');
    }
}
const app = new App();

