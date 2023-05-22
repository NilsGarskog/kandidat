import { useEffect, useState } from 'react';

const EasterEgg = () => {
  const [easterEggVisible, setEasterEggVisible] = useState(false);

  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let currentCodeIndex = 0;

    const handleKeyDown = (event) => {
      const { key } = event;
      const requiredKey = konamiCode[currentCodeIndex];

      if (key === requiredKey) {
        currentCodeIndex++;

        if (currentCodeIndex === konamiCode.length) {
          setEasterEggVisible(true);
        }
      } else {
        currentCodeIndex = 0;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (easterEggVisible) {
      // Load the YouTube IFrame API script
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // Define the onYouTubeIframeAPIReady function
      window.onYouTubeIframeAPIReady = () => {
        new window.YT.Player('youtubePlayer', {
          height: '360',
          width: '640',
          videoId: 'dQw4w9WgXcQ', // Replace with your YouTube video ID
          playerVars: {
            autoplay: 1,
            modestbranding: 1,
            key: 'AIzaSyAV025EAVO-01rkbidf8isyrG0i03aERCw', // Replace with your YouTube API key
          },
        });
      };
    }
  }, [easterEggVisible]);

  return (
    <div className='flex justify-center mt-4 items-center'>
      {easterEggVisible && (
        <div id="youtubePlayer"></div>
      )}
    </div>
  );
};

export default EasterEgg;

