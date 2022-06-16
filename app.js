class App{
	constructor(){
		const postReader = new PostReader(posts);
		const all_posts = postReader.getAllPost();

		const recentLoop = new Loop();
		recentLoop.each(all_posts, (value, detail_type)=>{
			return {
				date: `${value['type']}-${value['title']}`
			};
		});

		const controller = new MinifControl();
		controller.setLoops({
			'recentLoop': recentLoop
		})
		controller.run();
	}
}
new App();
