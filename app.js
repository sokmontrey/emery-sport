class Home extends Component{
	constructor(){
		super();
		this.setName('home');
		this.setType('page');
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
		recentLoop.each(latest_post, (value, id)=>{
			return {
				des: value['description'],
				date: value['createAt'].toLocaleDateString(),
				backgroundImageName: `url(./media/${value['id']}.png)`
			};
		});

		const controller = new MinifControl();
		controller.setComponents({
			'home': new Home()
		})
		controller.setLoops({
			'recentLoop': recentLoop
		})
		controller.run();
	}
}
new App();
