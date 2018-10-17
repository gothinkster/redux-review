import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = "http://127.0.0.1:8081";
const responseBody = res => res.body;

const requests = {
    post: (url, body) => superagent.post(`${API_ROOT}${url}`, body).then(responseBody)
};

const SubmitArticle = (article, username) => {
    //initialize favoritesCount for article to zero
    article['favoritesCount'] = 0;
    //define slug
    
    article['slug'] = "";
    //generate timeStamp for article
    article['createdAt'] = new Date().toISOString();
    //append author data
    article['author'] = {
        username
    };
    //sort, convert to lowercase, then remove duplicate tags
    article['tags'] = article['tags'].sort().map(tag => tag.toLowerCase()).filter((tag, index, arr) => {
        return !index || tag !== arr[index -1];
    });

    requests.post("/article/submit", article);    
};

export default SubmitArticle;