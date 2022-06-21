class App{
	constructor(){
		const postReader = new PostReader(posts);
		const all_posts = postReader.getAllSortBy('createAt', 'decending');
		const num_recent_post= 4;
		const latest_post = all_posts.slice(0, num_recent_post).map(v=>v)

		const recentLoop = new Loop();
		recentLoop.each(latest_post, (value, index)=>{
			return {
				id: value['id'],
				des: value['description'],
				date: value['createAt'].toLocaleDateString(),
				backgroundImageName: `url(./media/${value['id']}/0.jpg)`
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

		const categoryPostLoop = new Loop();
		categoryPostLoop.each(0, null);

		const controller = new MinifControl();
		controller.setPages(['home', 'view', 'category']);
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
				onViewCategory: (type)=>{
					const posts = postReader.getAllWithDetailOf('type', type);
					categoryPostLoop.each(posts, (value, index)=>{
						return {
							category_post_date: value['createAt'].toLocaleDateString(),
							image_url: `url(./media/${value['id']}/0.jpg)`,
							id: value['id']
						}
					});
					controller.changePage('category', {type: type});
				}
			}),
			view: new View({
				onHome: ()=>{
					controller.changePage('home');
				}
			}),
			category: new Category({
				onHome: ()=>{
					controller.changePage('home');
				},
				onViewPost: (id)=>{
					const post = postReader.getOnePost(id);
					postPhotoLoop.each(post['num_img'], (value, index)=>{
						return {
							image_url: `url(./media/${id}/${value+1}.jpg)`
						}
					})
					controller.changePage('view', {id: id});
				}
			})
		})
		controller.setLoops({
			'recentLoop': recentLoop,
			'categoryLoop': categoryLoop,
			'postPhotoLoop': postPhotoLoop,
			'categoryPostLoop': categoryPostLoop
		})
		controller.run();
	}
}
new App();





