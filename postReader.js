
class PostReader{

    constructor(posts){ 
        var _num_of_detail = 5;

        let removed_break = this._removeBreak(posts);
        let splited_post = this._splitPost(removed_break);
        let splited_detail = this._splitDetail(splited_post);

        this.posts = {};
        for(let post of splited_detail){
            if(post.length < _num_of_detail) continue;

            this.posts[post[0]] = {
                type: post[1],
                title: post[2],
                description: post[3],
                createAt: new Date(post[4])
            };
        }
    }

    getAllPost(){
        return this.posts;
    }
    getOnePost(ID) {
        return this.posts[ID];
    }
    getAllDetailOf(detail_type, isWithID=false){
        let list_of_detail = [];
        for(let ID in this.posts){
            isWithID
            ? list_of_detail.push({
                detail: this.posts[ID][detail_type],
                ID: ID
            }) 
            : list_of_detail.push(this.posts[ID][detail_type]);
        }
        return list_of_detail;
    }
    getAllIDSortBy(detail_type="createAt", order="ascending"){
        let all = this.getAllDetailOf(detail_type, true);
        order === "ascending" 
        ? all.sort((a,b)=>a.detail - b.detail)
        : all.sort((a,b)=>b.detail - a.detail);
        return all.map(object => object["ID"]);
    }
    getAllSortBy(detail_type='createAt', order='ascending'){
        let IDs = this.getAllIDSortBy(detail_type, order);
        return IDs.map(id => this.posts[id]);
    }
    getAllWithDetailOf(detail_type="createAt", detail_value=""){
        let all = [];
        for(let ID in this.posts){
            let post = this.posts[ID];

            post[detail_type] === detail_value 
            ? all.push(post)
            : null;
        }
        return all;
    }

    _removeBreak(string){
        return string.replace(/(\r\n|\n|\r)/gm, "");
    }
    _splitPost(string){
        return string.split('$$$');
    }
    _splitDetail(postArray){
        //go through every post and split up thier detail
        //then trimp extra space at the beginning and at the end of the detail
        let details = postArray.map(post => 
            post.split('$').map(detail => detail.trim())
        );
        return details;
    }
}


let postReader = new PostReader(posts);