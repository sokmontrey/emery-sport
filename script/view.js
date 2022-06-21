class View extends Component{
	constructor({onHome}){
		super();
		this.setName('view');
		this.setType('page');
		this.onHome = onHome;
	}
	onValueChange(){
		const id = this.value.id;
		if(id === null) return;

		const post = postReader.getOnePost(id);
		this.setValue({
			event_title: post['title'],
			event_description: post['description'],
			event_date: post['createAt'].toLocaleDateString(),
		}, false);

	}
	setEvent(){
		return{
			onHome: ()=>{this.onHome()}
		}
	}
}
