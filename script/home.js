class Home extends Component{
	constructor({onViewPost, onViewCategory}){
		super();
		this.setName('home');
		this.setType('page');
		this.onViewPost = onViewPost;
		this.onViewCategory = onViewCategory;
	}
	load(){
		this.setValue({
			recent_des: 'Sports Events That Happend recently<br/>(Hover for more information)',
			recent_date: ''
		})
	}
	setEvent(){
		return{
			updateRecentDetail: ({des, date})=>{
				this.setValue({
					recent_des: des,
					recent_date: date
				});
			},
			viewPost: ({id})=>{
				this.onViewPost(id);
			},
			viewCategory: ({category})=>{
				this.onViewCategory(category);
			}
		}
	}
}
