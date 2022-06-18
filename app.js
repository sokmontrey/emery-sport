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

class App{
	constructor(){
		const postReader = new PostReader(posts);
		const all_posts = postReader.getAllSortBy('createAt', 'decending');
		const num_recent_post= 3;
		const latest_post = all_posts.slice(0, num_recent_post).map(v=>v)

		const recentLoop = new Loop();
		recentLoop.each(latest_post, (value, index)=>{
			return {
				id: value['id'],
				des: value['description'],
				date: value['createAt'].toLocaleDateString(),
				backgroundImageName: `url(./media/${value['id']}.png)`
			};
		});

		const sports_types = [
			'soccerball',
			'volleyball',
			'basketball',
			'wrestling',
		];
		const categoryLoop = new Loop();
		categoryLoop.each(sports_types, (v, i)=>{
			return {
				type: v,
				type_image_url: `url(./media/${v}.png)`
			}
		});

		const controller = new MinifControl();
		controller.setComponents({
			'home': new Home({
				onViewPost: (id)=>{
					console.log(id);
					//TODO:
				},
				onViewCategory: (category)=>{
					console.log(category)
				}
				
			})
		})
		controller.setLoops({
			'recentLoop': recentLoop,
			'categoryLoop': categoryLoop
		})
		controller.run();
	}
}
new App();
