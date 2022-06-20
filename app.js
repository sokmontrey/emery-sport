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
				backgroundImageName: `url(./media/${value['id']}/1.jpg)`
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
		const postPhotoLoop = new Loop();
		postPhotoLoop.each(0, null);

		const controller = new MinifControl();
		controller.setPages(['home', 'view']);
		controller.setComponents({
			home: new Home({
				onViewPost: (id)=>{
					const post = postReader.getOnePost(id);
					postPhotoLoop.each(post['num_img'], (value, index)=>{
						return {
							image_url: `url(./media/${id}/${value+1}.jpg)`
						}
					})
					controller.changePage('view', {id: id});
				},
				onViewCategory: (category)=>{
					console.log(category)
				}
			}),
			view: new View({
				onHome: ()=>{
					controller.changePage('home');
				}
			})
		})
		controller.setLoops({
			'recentLoop': recentLoop,
			'categoryLoop': categoryLoop,
			'postPhotoLoop': postPhotoLoop,
		})
		controller.run();
	}
}
new App();
