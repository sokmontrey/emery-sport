function getPosts(){
    //return a array of string of post detail
    let posts = document.getElementsByTagName("Post");
    let strings = [];
    for(let i=0; i<posts.length; i++){
        let string = posts[i].innerHTML;
        strings.push(string);
    }
    return strings;
}

console.log(getPosts());