// Variables
const tweetList = document.getElementById('tweet-list');

// Event Listeners
eventListener();

function eventListener(){
    // Form Submission
    document.querySelector('#form').addEventListener('submit', newTweet);

    // Remove tweet from list
    tweetList.addEventListener('click', removeTweet);

    // Document
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}

// Functions

function localStorageOnLoad(){
    let tweets = getTweetFromStorage();
    console.log(tweets);
    tweets.forEach(function(tweet){
        
        // Create Remove Button
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-tweet';
        removeBtn.textContent = 'X';

        // Create Li
        const li = document.createElement('li');
        li.textContent = tweet;
        li.appendChild(removeBtn);

        tweetList.appendChild(li);
    });
}

function removeTweet(e){
    if(e.target.classList.contains('remove-tweet')){
        e.target.parentElement.remove();
    }
    
    removeTweetLocalStorage(e.target.parentElement.textContent);
    
}

function newTweet(e){
    e.preventDefault();
    
    const tweet = document.getElementById('tweet').value;

    // Create Remove Button
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-tweet';
    removeBtn.textContent = 'X';

    // Create Li
    const li = document.createElement('li');
    li.textContent = tweet;
    li.appendChild(removeBtn);

    tweetList.appendChild(li);

    addTweetLocalStorage(tweet);

    alert('Tweet Added');
}

function addTweetLocalStorage(tweet){
    
    let tweets = getTweetFromStorage();
    tweets.push(tweet);
    
    localStorage.setItem('tweets',JSON.stringify(tweets));
}

function getTweetFromStorage(){
    let tweets;
    const tweetLS = localStorage.getItem('tweets');
    if(tweetLS === null){
        tweets = [];
    }else{
        tweets = JSON.parse(tweetLS);
    }
    return tweets;
}

function removeTweetLocalStorage(tweet){

    let tweets = getTweetFromStorage();
    
    const tweetDelete = tweet.substring(0, tweet.length - 1);

    tweets.forEach(function(tweetLS, index){
        if(tweetDelete === tweetLS){
            tweets.splice(index, 1);
        }
    });
    console.log(tweets);
    localStorage.setItem('tweets', JSON.stringify(tweets));
}