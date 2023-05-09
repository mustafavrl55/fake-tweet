import "./style.scss";

import {
  ReplyIcon,
  RetweetIcon,
  LikeIcon,
  ShareIcon,
  VerifiedIcon,
} from "./icons";

import { useState, createRef, useEffect } from "react";
import { AvatarLoader } from "./loaders";
import { useScreenshot } from 'use-react-screenshot'    

const tweetFormat = (tweet) => {
  tweet = tweet
  .replace(/@([\w]+)/g, '<span>@$1</span>' )
  .replace(/#([\wşçöğü]+)/gi, '<span>@$1</span>' )
  .replace(/(https?:\/\/[\wü\.|/]+)/, '<span>$1</span>' );
  return tweet;
};

const formatNumber = number => {

  if(number <1000) {
    return number;
  }
  number /= 1000;
  number = String(number).split('.');
  return (
    number[0] + (number[1] > 100 ? ',' + number[1].slice(0, 1) + ' B' : ' B' )
  );
}



function App() {
  const tweetRef = createRef(null)
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [isverified, setIsverified] = useState(true);
  const [tweet, setTweet] = useState();
  const [avatar, setAvatar] = useState();
  const [retweets, setRetweets] = useState(2344);
  const [quoteTweetes, setQuoteTweetes] = useState(654);
  const [likes, setLikes] = useState(0);
  const [image, takeScreenshot] = useScreenshot()
  const getImage = () => takeScreenshot(tweetRef.current)

  /*useEffect(() => {
    console.log(image);
   },[image]);*/

  const AvatarHandle = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load' , function() {setAvatar(this.result)} );
    reader.readAsDataURL(file);
   };

  return (
    <>
      <div className="tweet-settings">
        <h3>Tweet Ayarları</h3>
        <ul>
          <li>
            <label>Ad Soyad</label>
            <input
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li>
          <label>Kullanıcı Adı</label>
            <input
              type="text"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </li>
          <li>
          <label>Tweet</label>
            <textarea
              class="textarea"
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
            />
          </li>
          <li>
            <label>Avatar</label>
            <input
              type="file"
              onChange={AvatarHandle}
              className="input"
              
            />
          </li>
          <li>
          <label>Retweet</label>
            <input
              type="number"
              className="input"
              value={retweets}
              onChange={(e) => setRetweets(e.target.value)}
            />
          </li>
          <li>
          <label>Alıntı Tweetler</label>
            <input
              type="number"
              className="input"
              value={quoteTweetes}
              onChange={(e) => setQuoteTweetes(e.target.value)}
            />
          </li>
          <li>
          <label>Beğeni</label>
            <input
              type="number"
              className="input"
              value={likes}
              onChange={(e) => setLikes(e.target.value)}
            />
          </li>
          <button onClick={getImage} >Oluştur</button>
          <div className="download-url">
            {image && (<a href={image} download={tweet}> Tweeti İndir </a>)}
          </div>
        </ul>
      </div>
      <div className="tweet-container">
        <div className="tweet" ref={tweetRef} >
          <div className="tweet-author">
            { (avatar && <img alt="avatar" src={avatar}/>) || <AvatarLoader/>}
            <div>
              <div className="name">
                {name || "Ad Soyad"}
                {isverified && <VerifiedIcon />}
              </div>
              <div className="username">@{username || "kullanıcıadı"}</div>
            </div>
          </div>
          <div className="tweet-content">
            <p
              dangerouslySetInnerHTML={{
                __html:
                  (tweet && tweetFormat(tweet)) ||
                  "Bu alana örnek tweet gelecek",
              }}
            ></p>
          </div>
          <div className="tweet-stats">
            <span>
              <b>{formatNumber(retweets)} </b> Retweet
            </span>
            <span>
              <b>{formatNumber(quoteTweetes)}</b> Alıntı tweetler
            </span>
            <span>
              <b>{formatNumber(likes)} </b> Beğeni
            </span>
          </div>
          <div className="tweet-actions">
            <span>
              <ReplyIcon />
            </span>
            <span>
              <RetweetIcon />
            </span>
            <span>
              <LikeIcon />
            </span>
            <span>
              <ShareIcon />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
