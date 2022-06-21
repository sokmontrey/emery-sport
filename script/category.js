class Category extends Component{
	constructor({onHome, onViewPost}){
		super();
		this.setName('category');
		this.setType('page');
		this.onHome = onHome;
		this.onViewPost = onViewPost;
	}
	load(){ }
	onValueChange(){
		const type = this.value.type;
		const posts = postReader.getAllWithDetailOf('type', type);
		if(posts.length < 1) {
			this.setValue({message: `Emery has no sports event in ${type}`}, false);
			return ;
		}
		this.setValue({message: `There are ${posts.length} matches of ${type} from Emery`}, false);
	}
	setEvent(){
		return{
			onHome: ()=>{this.onHome()},
			viewPost: ({id})=>{
				this.onViewPost(id)
			}
		}
	}
}
