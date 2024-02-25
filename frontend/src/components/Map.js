import { useEffect, useState } from "react";

const Map = ( props ) => {

    
    const [url, setUrl] = useState(null)
    const [website, setWebsite] = useState(null)
    let urlsAngry = ['https://www.google.com/maps/embed/v1/search?q=parks%20in%20birmingham&key=AIzaSyDTkAgcaDrydO2drr-qO2SSilM55nNTeQ0', 'https://www.google.com/maps/embed/v1/search?q=gyms%20in%20birmingham&key=AIzaSyDTkAgcaDrydO2drr-qO2SSilM55nNTeQ0', 'https://www.google.com/maps/embed/v1/search?q=museums%20in%20birmingham&key=AIzaSyDTkAgcaDrydO2drr-qO2SSilM55nNTeQ0'];

    let urlsDisgusted = ['https://www.google.com/maps/embed/v1/search?q=places%20to%20eat%20in%20birmingham&key=AIzaSyDTkAgcaDrydO2drr-qO2SSilM55nNTeQ0', 'https://www.google.com/maps/embed/v1/search?q=spas%20in%20birmingham&key=AIzaSyDTkAgcaDrydO2drr-qO2SSilM55nNTeQ0', 'https://www.google.com/maps/embed/v1/search?q=theatres%20in%20birmingham&key=AIzaSyDTkAgcaDrydO2drr-qO2SSilM55nNTeQ0'];
    
    let urlsFearful = ['https://www.google.com/maps/embed/v1/search?q=religious%20centres%20in%20birmingham&key=AIzaSyDTkAgcaDrydO2drr-qO2SSilM55nNTeQ0', 'https://www.google.com/maps/embed/v1/search?q=coffee%20shops%20in%20birmingham&key=AIzaSyDTkAgcaDrydO2drr-qO2SSilM55nNTeQ0', 'https://www.google.com/maps/embed/v1/search?q=animal%20shelters%20in%20birmingham&key=AIzaSyDTkAgcaDrydO2drr-qO2SSilM55nNTeQ0'];
    
    let urlsHappy = ['https://www.google.com/maps/embed/v1/search?q=shopping%20centres%20in%20birmingham&key=AIzaSyDTkAgcaDrydO2drr-qO2SSilM55nNTeQ0', 'https://www.google.com/maps/embed/v1/search?q=fun%20things%20to%20do%20in%20birmingham&key=AIzaSyDTkAgcaDrydO2drr-qO2SSilM55nNTeQ0', 'https://www.google.com/maps/embed/v1/search?q=entertainment%20in%20birmingham&key=AIzaSyDTkAgcaDrydO2drr-qO2SSilM55nNTeQ0'];
    
    let urlsNeutral = ['https://www.google.com/maps/embed/v1/search?q=restaurants%20in%20birmingham&key=AIzaSyDTkAgcaDrydO2drr-qO2SSilM55nNTeQ0', 'https://www.google.com/maps/embed/v1/search?q=cinema%20in%20birmingham&key=AIzaSyDTkAgcaDrydO2drr-qO2SSilM55nNTeQ0', 'https://www.google.com/maps/embed/v1/search?q=theme%20parks%20in%20birmingham&key=AIzaSyDTkAgcaDrydO2drr-qO2SSilM55nNTeQ0'];
    
    let urlsSad = ['https://www.google.com/maps/embed/v1/search?q=parks%20in%20birmingham&key=AIzaSyDTkAgcaDrydO2drr-qO2SSilM55nNTeQ0', 'https://www.google.com/maps/embed/v1/search?q=artistic%20spaces%20in%20birmingham&key=AIzaSyDTkAgcaDrydO2drr-qO2SSilM55nNTeQ0', 'https://www.google.com/maps/embed/v1/search?q=pubs%20in%20birmingham&key=AIzaSyDTkAgcaDrydO2drr-qO2SSilM55nNTeQ0'];

    let urlsSurprised = ['https://www.google.com/maps/embed/v1/search?q=golf%20course%20in%20birmingham&key=AIzaSyDTkAgcaDrydO2drr-qO2SSilM55nNTeQ0', 'https://www.google.com/maps/embed/v1/search?q=hidden%20gems%20in%20birmingham&key=AIzaSyDTkAgcaDrydO2drr-qO2SSilM55nNTeQ0', 'https://www.google.com/maps/embed/v1/search?q=zoo%20in%20birmingham%20england&key=AIzaSyDTkAgcaDrydO2drr-qO2SSilM55nNTeQ0'];
    

    let websitesAngry = ['https://www.psychologytoday.com', 'https://www.mindful.org', 'https://www.mindtools.com'];

    let websitesDisgusted = ['https://www.talkspace.com', 'https://www.happify.com', 'https://www.nationalgeographic.com'];
    
    let websitesFearful = ['https://www.betterhelp.com', 'https://www.anxiety.org', 'https://www.calm.com'];
    
    let websitesHappy = ['https://www.goodnewsnetwork.org', 'https://www.brainpickings.org', 'https://www.positive.news'];

    let websitesNeutral = ['https://www.ted.com/talks', 'http://www.duolingo.com', 'https://www.boredpanda.com'];

    let websitesSad = ['https://www.reddit.com/r/mademesmile', 'https://www.7cups.com', 'https://www.playbuzz.com'];

    let websitesSurprised = ['https://www.bbcearth.com/', 'https://www.atlasobscura.com', 'https://www.dailygood.org'];
    
    const urlDictionary = {0: urlsAngry, 1: urlsDisgusted, 2: urlsFearful, 3: urlsHappy, 4: urlsNeutral, 5: urlsSad, 6: urlsSurprised}
    const websiteDictionary = {0: websitesAngry, 1: websitesDisgusted, 2: websitesFearful, 3: websitesHappy, 4: websitesNeutral, 5: websitesSad, 6: websitesSurprised}


    const findIndexOfHighestValue = (arr) => {
        // if (arr.length === 0) {
        //     return -1; // or handle the case when the array is empty
        // }
        const newArray = arr.map(value => Number(value))
        console.log(newArray)
        const highestValue = Math.max(...newArray);
        return newArray.indexOf(highestValue);
    }

    
    useEffect(() => {
        const emotionIndex = findIndexOfHighestValue(props.array)
        console.log("EMOTION AHHHHHH: " + emotionIndex)
        const randNo1 = Math.floor(Math.random() * 3)
        setUrl(urlDictionary[emotionIndex][randNo1])
        
        const randNo2 = Math.floor(Math.random() * 3)
        setWebsite(websiteDictionary[emotionIndex][randNo2])


   
    }, [])
    
    
    // document.getElementById("text").href = website
    // document.getElementById("text").innerHTML = website

    return (
        <div className="pt-5 mt-5">
            <h3 className="mt-5 pt-5">Here's some places to help your mood!</h3>
            <p className="advice mt-5">Explore somewhere new</p>
            <iframe id="map"
                width="100%"
                height="450"
                style={{ border: '0' }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={url}
                className="mt-5"
                >
            </iframe>


            <a id="text" href={website} target="_blank">{website}</a>
        </div>
    )
}

export default Map